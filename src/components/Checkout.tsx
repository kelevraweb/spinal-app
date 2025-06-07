
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faCreditCard, faLock, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useFacebookPixel } from '@/hooks/useFacebookPixel';
import { useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51QYxIyP7NaJu1Y9x0U7OKzGelg0v0Rox7G52ErvzMBcFn4KcUHNJfJQDhGcjGYlqEMDjbRR3WRKRQhRANwT9Y0qv00Zh5JJ8qp');

interface CheckoutProps {
  onPurchase: (purchaseData: { planType: string; amount: number }) => void;
  selectedPlan?: 'trial' | 'monthly' | 'quarterly';
}

const CheckoutForm: React.FC<CheckoutProps> = ({ onPurchase, selectedPlan = 'quarterly' }) => {
  const { toast } = useToast();
  const { trackInitiateCheckout } = useFacebookPixel();
  const location = useLocation();
  const stripe = useStripe();
  const elements = useElements();
  
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // Determine if we're on the discounted page
  const isDiscountedPage = location.pathname === '/pricing-discounted';

  // Define pricing based on the page
  const plans = isDiscountedPage ? {
    trial: {
      title: 'PIANO 7 GIORNI',
      price: 10.50,
      originalPrice: 49.99,
      dailyPrice: 1.50,
      description: 'Prova di 7 giorni + Abbonamento mensile (inizia dopo 7 giorni)',
      subscriptionPrice: 49.99,
      trialDays: 7
    },
    monthly: {
      title: 'PIANO 1 MESE',
      price: 19.99,
      originalPrice: 49.99,
      dailyPrice: 0.66,
      description: 'Fatturazione mensile',
      subscriptionPrice: 49.99,
      trialDays: 30
    },
    quarterly: {
      title: 'PIANO 3 MESI',
      price: 34.99,
      originalPrice: 99.99,
      dailyPrice: 0.38,
      description: 'Fatturazione trimestrale',
      subscriptionPrice: 99.99,
      trialDays: 90
    }
  } : {
    trial: {
      title: 'PIANO 7 GIORNI',
      price: 49.99,
      originalPrice: null,
      dailyPrice: 7.14,
      description: 'Prova di 7 giorni + Abbonamento mensile (inizia dopo 7 giorni)',
      subscriptionPrice: 49.99,
      trialDays: 7
    },
    monthly: {
      title: 'PIANO 1 MESE',
      price: 49.99,
      originalPrice: null,
      dailyPrice: 1.67,
      description: 'Fatturazione mensile',
      subscriptionPrice: 49.99,
      trialDays: 30
    },
    quarterly: {
      title: 'PIANO 3 MESI',
      price: 99.99,
      originalPrice: null,
      dailyPrice: 1.11,
      description: 'Fatturazione trimestrale',
      subscriptionPrice: 99.99,
      trialDays: 90
    }
  };

  const selectedPlanDetails = plans[selectedPlan];

  useEffect(() => {
    // Track InitiateCheckout when component mounts
    trackInitiateCheckout({
      value: selectedPlanDetails.price,
      currency: 'EUR',
      plan_type: selectedPlan,
      content_ids: [selectedPlan]
    });
  }, [selectedPlan]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      toast({
        title: "Errore",
        description: "Stripe non è stato caricato correttamente. Riprova.",
        variant: "destructive"
      });
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      toast({
        title: "Errore",
        description: "Elemento carta non trovato.",
        variant: "destructive"
      });
      return;
    }

    if (!email || !firstName || !lastName) {
      toast({
        title: "Errore",
        description: "Compila tutti i campi obbligatori.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // First, create a payment intent for the immediate payment (setup fee)
      const { data: paymentData, error: paymentError } = await supabase.functions.invoke('create-payment-intent', {
        body: { 
          planType: selectedPlan,
          amount: Math.round(selectedPlanDetails.price * 100), // Convert to cents
          email,
          firstName,
          lastName,
          isDiscounted: isDiscountedPage
        },
      });

      if (paymentError) {
        throw new Error(paymentError.message);
      }

      if (!paymentData?.clientSecret) {
        throw new Error('No payment intent client secret returned');
      }

      // Confirm the payment
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
        paymentData.clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: `${firstName} ${lastName}`,
              email: email,
            },
          },
        }
      );

      if (confirmError) {
        throw new Error(confirmError.message);
      }

      if (paymentIntent?.status === 'succeeded') {
        // Now create the subscription with trial period
        const { data: subscriptionData, error: subscriptionError } = await supabase.functions.invoke('create-subscription', {
          body: { 
            planType: selectedPlan,
            email,
            firstName,
            lastName,
            paymentMethodId: paymentIntent.payment_method,
            isDiscounted: isDiscountedPage,
            setupPaymentIntentId: paymentIntent.id
          },
        });

        if (subscriptionError) {
          console.error('Subscription creation error:', subscriptionError);
          // Payment succeeded but subscription failed - still show success but warn user
          toast({
            title: "Pagamento completato",
            description: "Il pagamento è stato elaborato. Ti contatteremo presto per attivare il tuo abbonamento.",
            variant: "default"
          });
        } else {
          toast({
            title: "Successo!",
            description: "Pagamento completato e abbonamento attivato con successo!",
            variant: "default"
          });
        }

        // Call onPurchase for tracking purposes
        onPurchase({
          planType: selectedPlan,
          amount: selectedPlanDetails.price
        });

        // Clear form
        setEmail('');
        setFirstName('');
        setLastName('');
        cardElement.clear();
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Errore",
        description: error instanceof Error ? error.message : "Si è verificato un errore durante il pagamento. Riprova più tardi.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
    },
  };

  return (
    <div>
      {/* Test Mode Banner */}
      <div className="mb-4 bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 rounded-lg text-center">
        <div className="flex items-center justify-center space-x-2">
          <span className="font-bold text-sm">
            🧪 MODALITÀ TEST - Nessun addebito reale
          </span>
        </div>
        <p className="text-xs mt-1">Usa 4242 4242 4242 4242 per testare i pagamenti</p>
      </div>

      {/* Scarcity Banner - only show on discounted page */}
      {isDiscountedPage && (
        <div className="mb-4 bg-gradient-to-r from-red-500 to-orange-500 text-white p-3 rounded-lg text-center">
          <div className="flex items-center justify-center space-x-2">
            <span className="font-bold text-sm">
              Offerta limitata - Approfitta subito dello sconto!
            </span>
          </div>
          <p className="text-xs mt-1 opacity-90">Completa l'acquisto ora per non perdere l'occasione!</p>
        </div>
      )}

      {/* Order Summary */}
      <div className="mb-6 bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Riepilogo ordine</h3>
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">{selectedPlanDetails.title}</p>
            <p className="text-sm text-gray-500">{selectedPlanDetails.description}</p>
            <p className="text-lg font-bold text-[#71b8bc]">€{selectedPlanDetails.dailyPrice.toFixed(2)} al giorno</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-xl text-green-600">€{selectedPlanDetails.price.toFixed(2)}</p>
            {selectedPlanDetails.originalPrice && (
              <p className="text-sm text-gray-500 line-through">€{selectedPlanDetails.originalPrice}</p>
            )}
          </div>
        </div>
      </div>

      {/* Limited Spots Warning - only show on discounted page */}
      {isDiscountedPage && (
        <div className="mb-4 bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faCheckCircle} className="text-yellow-600 mr-2" />
            <p className="text-sm text-yellow-800">
              <span className="font-semibold">Solo 23 posti rimasti</span> a questo prezzo scontato
            </p>
          </div>
        </div>
      )}

      {/* Payment Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Informazioni personali</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                Nome *
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#71b8bc]"
                required
              />
            </div>
            
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Cognome *
              </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#71b8bc]"
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#71b8bc]"
              required
            />
          </div>
        </div>

        {/* Payment Information */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Informazioni di pagamento</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dettagli carta *
            </label>
            <div className="p-3 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-[#71b8bc]">
              <CardElement options={cardElementOptions} />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !stripe}
          className={`w-full py-3 rounded-md font-medium ${
            isLoading || !stripe
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-[#71b8bc] hover:bg-[#5da0a4]'
          } text-white`}
        >
          {isLoading ? (
            <>
              <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
              ELABORAZIONE...
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faLock} className="mr-2" />
              PAGA €{selectedPlanDetails.price.toFixed(2)}
            </>
          )}
        </button>
      </form>
      
      <div className="flex justify-center mt-4">
        <img 
          src="/lovable-uploads/da294585-2e35-4f7d-86d5-abed6dfc94b2.png" 
          alt="Metodi di pagamento accettati: PayPal, Mastercard, Visa, American Express, Discover Network" 
          className="h-6 w-auto"
        />
      </div>

      <div className="text-center mt-4 text-xs text-gray-500">
        <FontAwesomeIcon icon={faLock} className="mr-1" />
        I tuoi dati sono protetti con crittografia SSL
      </div>
    </div>
  );
};

const Checkout: React.FC<CheckoutProps> = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm {...props} />
    </Elements>
  );
};

export default Checkout;
