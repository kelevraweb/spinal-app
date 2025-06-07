
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faCreditCard, faLock, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useFacebookPixel } from '@/hooks/useFacebookPixel';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getUserDataFromQuiz } from './QuizDataManager';

interface CheckoutProps {
  onPurchase: (purchaseData: { planType: string; amount: number }) => void;
  selectedPlan?: 'trial' | 'monthly' | 'quarterly';
}

const Checkout: React.FC<CheckoutProps> = ({ onPurchase, selectedPlan = 'quarterly' }) => {
  const { toast } = useToast();
  const { trackInitiateCheckout } = useFacebookPixel();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  const [isLoading, setIsLoading] = useState(false);
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

  // Load user data on component mount
  useEffect(() => {
    const loadUserData = async () => {
      try {
        // Get name from URL parameter
        const urlName = searchParams.get('name') || '';
        const urlGender = searchParams.get('gender') || 'male';
        
        // Get quiz data from database/localStorage
        const quizData = await getUserDataFromQuiz();
        
        // Prioritize saved email from localStorage
        const savedEmail = localStorage.getItem('userEmail');
        let email = savedEmail || quizData.email || '';
        
        const finalUserInfo = {
          name: urlName || quizData.name || '',
          email: email,
          gender: quizData.gender || (urlGender === 'female' ? 'Femmina' : 'Maschio'),
          sessionId: quizData.sessionId
        };
        
        console.log('Loaded user data:', finalUserInfo);
        setUserInfo(finalUserInfo);
        
      } catch (error) {
        console.error('Error loading user data:', error);
        // Fallback to URL params if everything fails
        const urlName = searchParams.get('name') || '';
        const urlGender = searchParams.get('gender') || 'male';
        
        setUserInfo({
          name: urlName,
          email: '',
          gender: urlGender === 'female' ? 'Femmina' : 'Maschio',
          sessionId: null
        });
      }
    };

    loadUserData();
  }, [searchParams]);

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
    
    if (!userInfo.name || !userInfo.email) {
      toast({
        title: "Errore",
        description: "Dati utente non disponibili. Riprova dal quiz.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      console.log('Starting checkout process with data:', {
        planType: selectedPlan,
        amount: selectedPlanDetails.price,
        email: userInfo.email,
        name: userInfo.name,
        isDiscounted: isDiscountedPage
      });

      // Use the direct Stripe checkout function
      const { data: checkoutData, error: checkoutError } = await supabase.functions.invoke('create-checkout', {
        body: { 
          planType: selectedPlan,
          isDiscounted: isDiscountedPage
        },
      });

      console.log('Checkout response:', { checkoutData, checkoutError });

      if (checkoutError) {
        throw new Error(checkoutError.message);
      }

      if (!checkoutData?.url) {
        throw new Error('No checkout URL returned');
      }

      // Redirect to Stripe Checkout
      window.location.href = checkoutData.url;

    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Errore",
        description: error instanceof Error ? error.message : "Si è verificato un errore durante il checkout. Riprova più tardi.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Test Mode Banner */}
      <div className="mb-4 bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 rounded-lg text-center">
        <div className="flex items-center justify-center space-x-2">
          <span className="font-bold text-sm">
            🧪 MODALITÀ TEST - Usa carta 4242 4242 4242 4242
          </span>
        </div>
        <p className="text-xs mt-1">CVV: qualsiasi 3 cifre, Data: qualsiasi data futura</p>
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

      {/* User Information Display (Read-only) */}
      {userInfo.name && (
        <div className="mb-6 bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-lg mb-2">Informazioni cliente</h3>
          <div className="space-y-1 text-sm">
            <p><span className="font-medium">Nome:</span> {userInfo.name}</p>
            <p><span className="font-medium">Email:</span> {userInfo.email}</p>
            <p><span className="font-medium">Genere:</span> {userInfo.gender}</p>
            {userInfo.sessionId && (
              <p className="text-xs text-gray-500">ID Sessione: {userInfo.sessionId}</p>
            )}
          </div>
        </div>
      )}

      {/* Payment Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <button
          type="submit"
          disabled={isLoading || !userInfo.name || !userInfo.email}
          className={`w-full py-3 rounded-md font-medium ${
            isLoading || !userInfo.name || !userInfo.email
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

export default Checkout;
