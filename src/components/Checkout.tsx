
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faLock, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useFacebookPixel } from '@/hooks/useFacebookPixel';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getUserDataFromQuiz, markQuizCompleted } from './QuizDataManager';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

interface CheckoutProps {
  onPurchase: (purchaseData: { planType: string; amount: number }) => void;
  selectedPlan?: 'trial' | 'monthly' | 'quarterly' | 'test';
}

// Store stripe promise
let stripePromise: Promise<any> | null = null;

const getStripePromise = async () => {
  if (!stripePromise) {
    try {
      // Get Stripe configuration from our edge function
      const { data, error } = await supabase.functions.invoke('get-stripe-config');
      
      if (error) {
        console.error('Error getting Stripe config:', error);
        throw new Error('Failed to get Stripe configuration');
      }

      if (!data?.publishableKey) {
        throw new Error('No publishable key received');
      }

      console.log('Initializing Stripe with mode:', data.mode);
      stripePromise = loadStripe(data.publishableKey);
    } catch (error) {
      console.error('Error initializing Stripe:', error);
      throw error;
    }
  }
  return stripePromise;
};

// Unified Payment Form (all plans go through Stripe now)
const StripeCheckoutForm: React.FC<CheckoutProps> = ({ onPurchase, selectedPlan = 'quarterly' }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const { trackInitiateCheckout } = useFacebookPixel();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  const [isLoading, setIsLoading] = useState(false);
  const [stripeMode, setStripeMode] = useState('live');
  const [userInfo, setUserInfo] = useState<{
    name: string;
    email: string;
    gender: string;
    sessionId: string | null;
  }>({
    name: '',
    email: '',
    gender: 'Femmina',
    sessionId: null
  });

  // Load user data and settings on component mount
  useEffect(() => {
    const loadUserData = async () => {
      try {
        // Get name and email from URL parameters with ABSOLUTE PRIORITY
        const urlName = searchParams.get('name') || '';
        const urlEmail = searchParams.get('email') || '';
        const urlGender = searchParams.get('gender') || 'male';
        
        // Get quiz data from database/localStorage
        const quizData = await getUserDataFromQuiz();
        
        // URL parameters have absolute priority, then localStorage, then quiz data
        const finalUserInfo = {
          name: urlName || quizData.name || localStorage.getItem('userName') || '',
          email: urlEmail || localStorage.getItem('userEmail') || quizData.email || '',
          gender: quizData.gender || (urlGender === 'female' ? 'Femmina' : 'Maschio'),
          sessionId: quizData.sessionId
        };
        
        console.log('Loaded user data:', finalUserInfo);
        setUserInfo(finalUserInfo);
        
      } catch (error) {
        console.error('Error loading user data:', error);
        // Fallback to URL params if everything fails
        const urlName = searchParams.get('name') || '';
        const urlEmail = searchParams.get('email') || '';
        const urlGender = searchParams.get('gender') || 'male';
        
        setUserInfo({
          name: urlName,
          email: urlEmail,
          gender: urlGender === 'female' ? 'Femmina' : 'Maschio',
          sessionId: null
        });
      }
    };

    const loadSettings = async () => {
      try {
        // Load Stripe mode
        const { data: stripeData } = await supabase
          .from('admin_settings')
          .select('setting_value')
          .eq('setting_key', 'stripe_mode')
          .single();
        
        if (stripeData) setStripeMode(stripeData.setting_value);
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    };

    loadUserData();
    loadSettings();
  }, [searchParams]);

  // Determine if we're on the discounted page
  const isDiscountedPage = location.pathname === '/pricing-discounted';

  // Define pricing based on the page - including TEST plan
  const plans = isDiscountedPage ? {
    trial: {
      title: 'PIANO 7 GIORNI',
      price: 10.50,
      originalPrice: 49.99,
      dailyPrice: 1.50,
      description: 'Pagamento singolo',
    },
    monthly: {
      title: 'PIANO 1 MESE',
      price: 19.99,
      originalPrice: 49.99,
      dailyPrice: 0.66,
      description: 'Pagamento singolo',
    },
    quarterly: {
      title: 'PIANO 3 MESI',
      price: 34.99,
      originalPrice: 99.99,
      dailyPrice: 0.38,
      description: 'Pagamento singolo',
    },
    test: {
      title: 'PIANO TEST',
      price: stripeMode === 'test' ? 0 : 0.50,
      originalPrice: null,
      dailyPrice: 0,
      description: stripeMode === 'test' ? 'Piano di test gratuito' : 'Piano di test - €0.50 (minimo Stripe)',
    }
  } : {
    trial: {
      title: 'PIANO 7 GIORNI',
      price: 49.99,
      originalPrice: null,
      dailyPrice: 7.14,
      description: 'Pagamento singolo',
    },
    monthly: {
      title: 'PIANO 1 MESE',
      price: 49.99,
      originalPrice: null,
      dailyPrice: 1.67,
      description: 'Pagamento singolo',
    },
    quarterly: {
      title: 'PIANO 3 MESI',
      price: 99.99,
      originalPrice: null,
      dailyPrice: 1.11,
      description: 'Pagamento singolo',
    },
    test: {
      title: 'PIANO TEST',
      price: stripeMode === 'test' ? 0 : 0.50,
      originalPrice: null,
      dailyPrice: 0,
      description: stripeMode === 'test' ? 'Piano di test gratuito' : 'Piano di test - €0.50 (minimo Stripe)',
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
      return;
    }

    // Get user data for payment - URL has absolute priority
    const paymentName = userInfo.name || searchParams.get('name') || localStorage.getItem('userName') || 'Guest User';
    const paymentEmail = userInfo.email || searchParams.get('email') || localStorage.getItem('userEmail') || 'guest@example.com';

    console.log('Processing payment with:', { 
      paymentName, 
      paymentEmail,
      userInfo,
      stripeMode,
      selectedPlan,
      amount: selectedPlanDetails.price
    });

    setIsLoading(true);

    try {
      // Create payment intent (including €0 for test plan)
      const { data: paymentData, error: paymentError } = await supabase.functions.invoke('create-payment-intent', {
        body: { 
          planType: selectedPlan,
          amount: Math.round(selectedPlanDetails.price * 100), // Convert to cents (0 for test plan)
          email: paymentEmail,
          firstName: paymentName.split(' ')[0] || paymentName,
          lastName: paymentName.split(' ').slice(1).join(' ') || '',
          isDiscounted: isDiscountedPage
        },
      });

      console.log('Payment intent response:', { paymentData, paymentError });

      if (paymentError) {
        throw new Error(paymentError.message);
      }

      if (!paymentData?.clientSecret) {
        throw new Error('No client secret returned');
      }

      // For €0 payments (test plan), Stripe will auto-succeed
      // But we still go through the flow for tracking
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error('Card element not found');
      }

      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(paymentData.clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: paymentName,
            email: paymentEmail,
          },
        },
      });

      if (confirmError) {
        throw new Error(confirmError.message);
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Mark quiz as completed and link purchase to session
        await markQuizCompleted();
        
        // Update order with quiz session ID
        if (userInfo.sessionId) {
          await supabase
            .from('orders')
            .update({ quiz_session_id: userInfo.sessionId })
            .eq('stripe_session_id', paymentData.paymentIntentId);
        }
        
        // Payment successful
        onPurchase({
          planType: selectedPlan,
          amount: selectedPlanDetails.price
        });
        
        toast({
          title: "Pagamento completato!",
          description: selectedPlan === 'test' 
            ? "Piano TEST attivato con successo e tracciato in Stripe." 
            : "Il tuo pagamento è stato elaborato con successo.",
        });
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
      {/* Test Mode Banner - show when in test mode */}
      {stripeMode === 'test' && (
        <div className="mb-4 bg-yellow-50 border-yellow-200 text-yellow-800 border p-3 rounded-lg text-center">
          <div className="flex items-center justify-center space-x-2">
            <span className="font-bold text-sm">
              🧪 MODALITÀ TEST - Usa carta 4242 4242 4242 4242
            </span>
          </div>
          <p className="text-xs mt-1">CVV: qualsiasi 3 cifre, Data: qualsiasi data futura</p>
        </div>
      )}

      {/* Test Product Banner - show for test plan */}
      {selectedPlan === 'test' && (
        <div className="mb-4 bg-blue-50 border-blue-200 text-blue-800 border p-3 rounded-lg text-center">
          <div className="flex items-center justify-center space-x-2">
            <span className="font-bold text-sm">
              🧪 PIANO TEST - {stripeMode === 'test' ? 'Gratuito' : '€0.50 (minimo Stripe)'}
            </span>
          </div>
          <p className="text-xs mt-1">
            {stripeMode === 'test' 
              ? 'Questo piano costa €0 ma passa attraverso il sistema di pagamento per il tracking'
              : 'In modalità live Stripe richiede un minimo di €0.50 - ma è comunque un piano di test'
            }
          </p>
        </div>
      )}

      {/* Scarcity Banner - only show on discounted page for paid plans */}
      {isDiscountedPage && selectedPlan !== 'test' && (
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
            <p className={`font-bold text-xl ${selectedPlan === 'test' ? 'text-blue-600' : 'text-green-600'}`}>
              €{selectedPlanDetails.price.toFixed(2)}
            </p>
            {selectedPlanDetails.originalPrice && (
              <p className="text-sm text-gray-500 line-through">€{selectedPlanDetails.originalPrice}</p>
            )}
          </div>
        </div>
      </div>

      {/* Limited Spots Warning - only show on discounted page for paid plans */}
      {isDiscountedPage && selectedPlan !== 'test' && (
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
        {/* Card Element */}
        <div className="bg-white p-4 rounded-lg border border-gray-300">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {selectedPlan === 'test' ? 'Dettagli carta (per tracking - nessun addebito)' : 'Dettagli carta di credito'}
          </label>
          <div className="p-3 border border-gray-200 rounded-md">
            <CardElement options={cardElementOptions} />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !stripe}
          className={`w-full py-3 rounded-md font-medium ${
            isLoading || !stripe
              ? 'bg-gray-400 cursor-not-allowed' 
              : selectedPlan === 'test'
              ? 'bg-blue-500 hover:bg-blue-600'
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
              <FontAwesomeIcon icon={selectedPlan === 'test' ? faCheckCircle : faLock} className="mr-2" />
              {selectedPlan === 'test' ? 'ATTIVA PIANO TEST' : `PAGA €${selectedPlanDetails.price.toFixed(2)}`}
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
  const [stripePromiseState, setStripePromiseState] = useState<Promise<any> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Now ALL plans go through Stripe, including test
    const loadStripe = async () => {
      try {
        const promise = await getStripePromise();
        setStripePromiseState(promise);
      } catch (error) {
        console.error('Failed to load Stripe:', error);
        setError('Errore nel caricamento del sistema di pagamento. Riprova più tardi.');
      }
    };
    loadStripe();
  }, []);

  if (error) {
    return (
      <div className="text-center p-4">
        <p className="text-red-600">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Riprova
        </button>
      </div>
    );
  }

  if (!stripePromiseState) {
    return <div className="text-center p-4">Caricamento sistema di pagamento...</div>;
  }

  return (
    <Elements stripe={stripePromiseState}>
      <StripeCheckoutForm {...props} />
    </Elements>
  );
};

export default Checkout;
