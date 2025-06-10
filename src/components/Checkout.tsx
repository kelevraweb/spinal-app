
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate, useSearchParams } from 'react-router-dom';

// We'll use a hardcoded test key for now - in production this should come from an API call
const stripePromise = loadStripe('pk_test_51234567890abcdef'); // Replace with actual test key

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

interface PaymentData {
  amount: number;
  currency: string;
  paymentMethodId?: string;
  paymentIntentId?: string;
  planType: string;
  email?: string;
  name?: string;
}

const CheckoutForm: React.FC<{
  paymentData: PaymentData;
  onPurchase: (data: PaymentData) => void;
}> = ({ paymentData, onPurchase }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement) as any,
      });

      if (error) {
        setError(error.message || 'Si è verificato un errore durante la creazione del metodo di pagamento.');
        setLoading(false);
        return;
      }

      if (!paymentMethod) {
        setError('Metodo di pagamento non valido.');
        setLoading(false);
        return;
      }

      // Confirm the PaymentIntent on the server
      const { data, error: apiError } = await supabase.functions.invoke('create-payment-intent', {
        body: {
          amount: paymentData.amount,
          currency: paymentData.currency,
          paymentMethodId: paymentMethod.id,
          planType: paymentData.planType,
          email: paymentData.email,
          name: paymentData.name
        },
      });

      if (apiError) {
        setError(apiError.message || 'Si è verificato un errore durante la conferma del pagamento.');
        setLoading(false);
        return;
      }

      if (data?.paymentIntent?.client_secret) {
        const confirmResult = await stripe.confirmCardPayment(data.paymentIntent.client_secret);

        if (confirmResult.error) {
          setError(confirmResult.error.message || 'Si è verificato un errore durante la conferma del pagamento.');
          setLoading(false);
          return;
        }

        if (confirmResult.paymentIntent.status === 'succeeded') {
          await verifyPayment(confirmResult.paymentIntent.id);
        } else {
          setError('Il pagamento non è andato a buon fine.');
          setLoading(false);
        }
      } else {
        setError('Errore nella creazione del PaymentIntent.');
        setLoading(false);
      }
    } catch (err: any) {
      setError(err.message || 'Si è verificato un errore imprevisto.');
      setLoading(false);
    }
  };

  const verifyPayment = async (paymentIntentId: string) => {
    try {
      console.log('Verifying payment with ID:', paymentIntentId);
      
      const { data: verificationData, error: verificationError } = await supabase.functions.invoke('verify-payment', {
        body: { paymentIntentId }
      });

      if (verificationError) {
        console.error('Payment verification failed:', verificationError);
        throw new Error('Verificazione pagamento fallita');
      }

      console.log('Payment verification response:', verificationData);
      
      if (verificationData?.success) {
        // Create order record instead of subscription/purchase
        await supabase
          .from('orders')
          .insert({
            stripe_session_id: paymentIntentId,
            status: 'completed',
            plan_type: paymentData.planType,
            amount: paymentData.amount / 100
          });

        // Update user profile status to active - simplified approach
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await supabase
            .from('user_profiles')
            .update({ subscription_status: 'active' })
            .eq('user_id', user.id);
        }
        
        // Payment successful
        onPurchase({
          ...paymentData,
          paymentIntentId
        });
      } else {
        throw new Error('Pagamento non verificato');
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw error;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <CardElement options={cardElementOptions} />
      <button
        type="submit"
        disabled={!stripe || loading}
        className={`mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {loading ? 'Elaborazione...' : 'Paga ora'}
      </button>
    </form>
  );
};

interface CheckoutProps {
  amount: number;
  currency: string;
  planType: string;
  onSuccess: () => void;
  email?: string;
  name?: string;
}

const Checkout: React.FC<CheckoutProps> = ({ amount, currency, planType, onSuccess, email, name }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  const handlePurchase = (paymentData: PaymentData) => {
    toast({
      title: 'Pagamento avvenuto con successo!',
      description: 'Grazie per il tuo acquisto.',
    });
    onSuccess();
    navigate('/thank-you');
  };

  const paymentData = {
    amount: amount,
    currency: currency,
    planType: planType,
    email: email,
    name: name
  };

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm paymentData={paymentData} onPurchase={handlePurchase} />
    </Elements>
  );
};

export default Checkout;
