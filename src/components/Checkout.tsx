import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faCreditCard, faLock, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useFacebookPixel } from '@/hooks/useFacebookPixel';
import { useLocation } from 'react-router-dom';

const stripePromise = loadStripe('pk_live_51N8NRUKUx3KhOjH7cVFBPdhv1IsJj7ZWGIGSY55yNmfduHSzLxF9lDGOFJcYGRFT6U7KZJjKpwZhcuiOrTCuE5vA003l9XZgM5');

interface CheckoutProps {
  onPurchase: (purchaseData: { planType: string; amount: number }) => void;
  selectedPlan?: 'trial' | 'monthly' | 'quarterly';
}

const CheckoutForm: React.FC<CheckoutProps> = ({ onPurchase, selectedPlan = 'quarterly' }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const { trackInitiateCheckout } = useFacebookPixel();
  const location = useLocation();
  
  const [isLoading, setIsLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState<string>('');

  // Determine if we're on the discounted page
  const isDiscountedPage = location.pathname === '/pricing-discounted';

  // Define pricing based on the page
  const plans = isDiscountedPage ? {
    trial: {
      title: 'PIANO 7 GIORNI',
      price: 10.50,
      originalPrice: 49.99,
      dailyPrice: 1.50,
      description: 'Prova di 7 giorni + Abbonamento mensile (inizia dopo 7 giorni)'
    },
    monthly: {
      title: 'PIANO 1 MESE',
      price: 19.99,
      originalPrice: 49.99,
      dailyPrice: 0.66,
      description: 'Fatturazione mensile'
    },
    quarterly: {
      title: 'PIANO 3 MESI',
      price: 34.99,
      originalPrice: 99.99,
      dailyPrice: 0.38,
      description: 'Fatturazione trimestrale'
    }
  } : {
    trial: {
      title: 'PIANO 7 GIORNI',
      price: 49.99,
      originalPrice: null,
      dailyPrice: 7.14,
      description: 'Prova di 7 giorni + Abbonamento mensile (inizia dopo 7 giorni)'
    },
    monthly: {
      title: 'PIANO 1 MESE',
      price: 49.99,
      originalPrice: null,
      dailyPrice: 1.67,
      description: 'Fatturazione mensile'
    },
    quarterly: {
      title: 'PIANO 3 MESI',
      price: 99.99,
      originalPrice: null,
      dailyPrice: 1.11,
      description: 'Fatturazione trimestrale'
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

    // Create PaymentIntent
    createPaymentIntent();
  }, [selectedPlan]);

  const createPaymentIntent = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('create-payment-intent', {
        body: { 
          planType: selectedPlan,
          amount: Math.round(selectedPlanDetails.price * 100) // Convert to cents
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.clientSecret) {
        setClientSecret(data.clientSecret);
      } else {
        throw new Error('No client secret returned');
      }
    } catch (error) {
      console.error('Payment intent creation error:', error);
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante la preparazione del pagamento.",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    setIsLoading(true);

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      }
    });

    if (error) {
      console.error('Payment error:', error);
      toast({
        title: "Errore di pagamento",
        description: error.message || "Si è verificato un errore durante il pagamento.",
        variant: "destructive"
      });
    } else if (paymentIntent.status === 'succeeded') {
      toast({
        title: "Pagamento completato!",
        description: "Il tuo pagamento è stato elaborato con successo."
      });
      
      // Call onPurchase with the purchase data
      onPurchase({
        planType: selectedPlan,
        amount: selectedPlanDetails.price
      });
    }

    setIsLoading(false);
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
      invalid: {
        color: '#9e2146',
      },
    },
  };

  return (
    <div>
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
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FontAwesomeIcon icon={faCreditCard} className="mr-2" />
            Dettagli carta di credito
          </label>
          <div className="border border-gray-300 rounded-md p-3 bg-white">
            <CardElement options={cardElementOptions} />
          </div>
        </div>

        <button
          type="submit"
          disabled={!stripe || isLoading || !clientSecret}
          className={`w-full py-3 rounded-md font-medium ${
            (!stripe || isLoading || !clientSecret) 
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
