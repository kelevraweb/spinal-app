import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useFacebookPixel } from '@/hooks/useFacebookPixel';
import Checkout from '@/components/Checkout';
import { CheckCircle } from 'lucide-react';
import CountdownOffer from '@/components/CountdownOffer';
import { TrustMapAnimation } from '@/components/TrustMapAnimation';
import { WorldCommunity } from '@/components/WorldCommunity';
import { UniversityLogos } from '@/components/UniversityLogos';
import { BeforeAfterComparison } from '@/components/BeforeAfterComparison';
import { Footer } from '@/components/Footer';
import { SinusoidalGraph } from '@/components/SinusoidalGraph';

const PricingDiscounted: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedPlan, setSelectedPlan] = useState<'trial' | 'monthly' | 'quarterly'>('quarterly');
  const [showCheckout, setShowCheckout] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { trackAddToCart, trackInitiateCheckout } = useFacebookPixel();

  const firstName = searchParams.get('firstName') || '';
  const lastName = searchParams.get('lastName') || '';
  const email = searchParams.get('email') || '';

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const pricing = {
    trial: { 
      originalPrice: 79.00, 
      currentPrice: 19.99, 
      duration: "7 giorni", 
      description: "Offerta speciale limitata",
      features: [
        "Piano personalizzato per 7 giorni",
        "Esercizi specifici per la tua condizione",
        "Video tutorial HD",
        "Supporto via email"
      ]
    },
    monthly: { 
      originalPrice: 89.00, 
      currentPrice: 29.99, 
      duration: "1 mese", 
      description: "Super sconto mensile",
      features: [
        "Piano personalizzato per 30 giorni",
        "Tutti gli esercizi della libreria",
        "Video tutorial HD",
        "Supporto prioritario",
        "Tracciamento progressi"
      ]
    },
    quarterly: { 
      originalPrice: 199.00, 
      currentPrice: 49.99, 
      duration: "3 mesi", 
      description: "Sconto incredibile - Piano trimestrale",
      popular: true,
      features: [
        "Piano personalizzato per 90 giorni",
        "Accesso completo alla libreria",
        "Video tutorial HD",
        "Supporto prioritario 24/7",
        "Tracciamento progressi avanzato",
        "Consultazioni con esperti",
        "Garanzia soddisfatti o rimborsati"
      ]
    }
  };

  const handlePlanSelect = (plan: 'trial' | 'monthly' | 'quarterly') => {
    setSelectedPlan(plan);
    
    const planData = pricing[plan];
    
    trackAddToCart({
      value: planData.currentPrice,
      currency: 'EUR',
      content_ids: [plan],
      plan_type: plan
    });
  };

  const handleGetStarted = () => {
    const planData = pricing[selectedPlan];
    
    trackInitiateCheckout({
      value: planData.currentPrice,
      currency: 'EUR',
      content_ids: [selectedPlan],
      plan_type: selectedPlan
    });
    
    setShowCheckout(true);
  };

  const handleCheckoutSuccess = () => {
    const planData = pricing[selectedPlan];
    const params = new URLSearchParams({
      plan: selectedPlan,
      amount: planData.currentPrice.toString(),
      name: `${firstName} ${lastName}`.trim(),
      email: email
    });
    
    navigate(`/thank-you?${params.toString()}`);
  };

  if (showCheckout) {
    const planData = pricing[selectedPlan];
    return (
      <div className="min-h-screen bg-[#fbfaf8] p-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Completa il tuo acquisto</h1>
          <Checkout
            amount={Math.round(planData.currentPrice * 100)}
            currency="eur"
            planType={selectedPlan}
            onSuccess={handleCheckoutSuccess}
            email={email}
            name={`${firstName} ${lastName}`.trim()}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbfaf8]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#ff1aa9] to-[#ff6b9d] text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-yellow-400 text-black px-4 py-2 rounded-full inline-block mb-4 font-bold">
            🔥 OFFERTA LAMPO - FINO AL 75% DI SCONTO
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {firstName ? `${firstName}, Non Perdere Questa Occasione!` : 'Offerta Speciale Limitata!'}
          </h1>
          <p className="text-xl mb-6">
            Il tuo Piano Personalizzato ora a un prezzo incredibile
          </p>
          
          <CountdownOffer 
            discountPercentage={75}
            originalPrice={199}
            currentPrice={49.99}
          />
        </div>
      </div>

      {/* Rest of the component follows the same pattern as Pricing */}
      <div className="container mx-auto px-4 py-12">
        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {Object.entries(pricing).map(([key, plan]) => (
            <div
              key={key}
              className={`relative bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                selectedPlan === key 
                  ? 'ring-4 ring-[#ff1aa9] transform scale-105' 
                  : 'hover:shadow-xl hover:scale-102'
              } ${plan.popular ? 'border-4 border-[#ff1aa9]' : ''}`}
              onClick={() => handlePlanSelect(key as 'trial' | 'monthly' | 'quarterly')}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-[#ff1aa9] text-white text-center py-2 font-bold">
                  SUPER SCONTO
                </div>
              )}
              
              <div className={`p-6 ${plan.popular ? 'pt-12' : ''}`}>
                <h3 className="text-2xl font-bold mb-2 text-gray-800">
                  Piano {plan.duration}
                </h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                
                <div className="mb-6">
                  <div className="flex items-center justify-center mb-2">
                    <span className="text-3xl font-bold text-[#ff1aa9]">
                      €{plan.currentPrice}
                    </span>
                    <span className="text-lg text-gray-500 line-through ml-2">
                      €{plan.originalPrice}
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-semibold">
                      Risparmia €{(plan.originalPrice - plan.currentPrice).toFixed(2)}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#ff1aa9] mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {selectedPlan === key && (
                  <div className="mt-4 p-3 bg-[#fef2f2] rounded-lg">
                    <p className="text-sm text-[#dc2626] font-medium text-center">
                      ✓ Piano selezionato
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mb-16">
          <button
            onClick={handleGetStarted}
            className="bg-gradient-to-r from-[#ff1aa9] to-[#ff6b9d] text-white px-12 py-4 rounded-full text-xl font-bold hover:from-[#e6009a] hover:to-[#e6588a] transition-all duration-300 transform hover:scale-105 shadow-lg animate-pulse"
          >
            Approfitta Ora - €{pricing[selectedPlan].currentPrice}
          </button>
          <p className="text-gray-600 mt-4">
            ⏰ Offerta valida solo per oggi!
          </p>
        </div>

        {/* Additional Content Sections */}
        <SinusoidalGraph />
        <TrustMapAnimation />
        <WorldCommunity />
        <UniversityLogos />
        <BeforeAfterComparison />
      </div>

      <Footer />
    </div>
  );
};

export default PricingDiscounted;
