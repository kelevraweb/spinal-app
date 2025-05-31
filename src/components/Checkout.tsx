
import React, { useState, useEffect } from 'react';
import { useCheckout } from '@/hooks/use-checkout';
import { useToast } from '@/hooks/use-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

interface CheckoutProps {
  onPurchase: () => void;
  selectedPlan?: 'trial' | 'monthly' | 'quarterly';
}

// Stripe Checkout Form component
const CheckoutForm = ({ 
  selectedPlan = 'monthly',
  selectedPlanDetails,
  onPurchase 
}: { 
  selectedPlan: 'trial' | 'monthly' | 'quarterly';
  selectedPlanDetails: any;
  onPurchase: () => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    // Use Stripe.js to confirm the payment
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + '/thank-you',
      },
      redirect: 'if_required'
    });

    if (error) {
      toast({
        title: "Errore",
        description: error.message || "Si è verificato un errore durante il pagamento.",
        variant: "destructive"
      });
      setIsProcessing(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      toast({
        title: "Pagamento completato",
        description: "Il tuo pagamento è stato elaborato con successo!"
      });
      onPurchase();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6 bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Riepilogo ordine</h3>
        <div className="flex justify-between">
          <div>
            <p className="font-medium">{selectedPlanDetails.title}</p>
            <p className="text-sm text-gray-500">{selectedPlanDetails.billingText}</p>
            <p className="text-sm text-gray-500">{selectedPlanDetails.duration}</p>
            <p className="text-lg font-bold text-brand-primary">€{selectedPlanDetails.dailyPrice.toFixed(2)} al giorno</p>
          </div>
          <p className="font-bold text-xl">€{selectedPlanDetails.price}</p>
        </div>
      </div>
      
      <div className="mb-4">
        <PaymentElement />
      </div>
      
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className={`w-full bg-[#71b8bc] text-white py-3 rounded-md font-medium mt-4 ${
          !stripe || isProcessing ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#5da0a4]'
        }`}
      >
        {isProcessing ? (
          <>
            <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
            ELABORAZIONE...
          </>
        ) : `PAGA €${selectedPlanDetails.price}`}
      </button>
    </form>
  );
};

// Main Checkout component
const Checkout: React.FC<CheckoutProps> = ({ onPurchase, selectedPlan = 'monthly' }) => {
  const { initiateCheckout, isLoading, checkoutData } = useCheckout();
  const [stripePromise, setStripePromise] = useState<Promise<any> | null>(null);
  const { toast } = useToast();
  
  const plans = {
    trial: {
      title: '7 giorni',
      price: 49.99,
      period: 'totale',
      duration: '7 giorni',
      dailyPrice: 7.14,
      billingText: 'Pagamento unico'
    },
    monthly: {
      title: '30 giorni',
      price: 49.99,
      period: 'totale',
      duration: '1 mese',
      dailyPrice: 1.66,
      billingText: 'Fatturazione mensile'
    },
    quarterly: {
      title: '90 giorni',
      price: 99.99,
      period: 'totale',
      duration: '3 mesi',
      dailyPrice: 1.11,
      billingText: 'Fatturazione trimestrale'
    }
  };

  const selectedPlanDetails = plans[selectedPlan];

  // Initialize checkout on component mount
  useEffect(() => {
    const startCheckout = async () => {
      toast({
        title: "Inizializzazione",
        description: "Stiamo preparando il form di pagamento..."
      });
      
      await initiateCheckout(selectedPlan);
    };
    
    startCheckout();
  }, [selectedPlan]);

  // Initialize Stripe when we get the publishable key
  useEffect(() => {
    if (checkoutData?.publishableKey) {
      setStripePromise(loadStripe(checkoutData.publishableKey));
    }
  }, [checkoutData]);

  if (isLoading || !checkoutData || !stripePromise) {
    return (
      <div className="text-center py-8">
        <FontAwesomeIcon icon={faSpinner} spin className="text-2xl text-[#71b8bc] mb-3" />
        <p>Caricamento del form di pagamento...</p>
      </div>
    );
  }

  return (
    <>
      <Elements 
        stripe={stripePromise} 
        options={{ 
          clientSecret: checkoutData.clientSecret,
          appearance: {
            theme: 'stripe',
            variables: {
              colorPrimary: '#71b8bc',
            }
          }
        }}
      >
        <CheckoutForm 
          selectedPlan={selectedPlan}
          selectedPlanDetails={selectedPlanDetails}
          onPurchase={onPurchase}
        />
      </Elements>
      
      <div className="flex justify-center mt-4">
        <img 
          src="/lovable-uploads/da294585-2e35-4f7d-86d5-abed6dfc94b2.png" 
          alt="Metodi di pagamento accettati: PayPal, Mastercard, Visa, American Express, Discover Network" 
          className="h-6 w-auto"
        />
      </div>
    </>
  );
};

export default Checkout;
