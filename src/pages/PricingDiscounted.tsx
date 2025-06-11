
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Checkout from '@/components/Checkout';
import CountdownOffer from '@/components/CountdownOffer';
import PurchaseNotifications from '@/components/PurchaseNotifications';
import BeforeAfterComparison from '@/components/BeforeAfterComparison';
import { Rating } from '@/components/Rating';
import Footer from '@/components/Footer';

const PricingDiscounted: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<'trial' | 'monthly' | 'quarterly' | 'test'>('quarterly');

  // Get user data from URL
  const userName = searchParams.get('name') || '';
  const userEmail = searchParams.get('email') || '';
  const userGender = searchParams.get('gender') || 'female';
  
  console.log('PricingDiscounted loaded with params:', { userName, userEmail, userGender });

  useEffect(() => {
    // Log the gender parameter usage
    console.log('User gender for pricing:', userGender);
  }, [userGender]);

  const handlePurchase = (purchaseData: { planType: string; amount: number }) => {
    console.log('Purchase completed:', purchaseData);
    // Navigate to thank you page with all user data
    const params = new URLSearchParams();
    if (userName) params.append('name', userName);
    if (userEmail) params.append('email', userEmail);
    params.append('gender', userGender);
    params.append('plan', purchaseData.planType);
    params.append('amount', purchaseData.amount.toString());
    
    navigate(`/thank-you?${params.toString()}`);
  };

  const handleOfferExpired = () => {
    console.log('Countdown offer expired');
    // You can add logic here if needed when the offer expires
  };

  // Gender-specific content
  const genderSpecificContent = {
    female: {
      title: "Offerta Esclusiva per Te!",
      subtitle: "Piano personalizzato per il benessere femminile",
      description: "Scopri il metodo che ha già aiutato migliaia di donne a ritrovare il loro equilibrio.",
    },
    male: {
      title: "Offerta Esclusiva per Te!",
      subtitle: "Piano personalizzato per il benessere maschile", 
      description: "Scopri il metodo che ha già aiutato migliaia di uomini a ritrovare il loro equilibrio.",
    }
  };

  const content = genderSpecificContent[userGender as 'female' | 'male'] || genderSpecificContent.female;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fbfaf8] to-white">
      {/* Header with user greeting */}
      <div className="bg-gradient-to-r from-[#71b8bc] to-[#88c2aa] text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          {userName && (
            <p className="text-lg mb-2">Ciao {userName}!</p>
          )}
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {content.title}
          </h1>
          <p className="text-xl mb-2">{content.subtitle}</p>
          <p className="text-lg opacity-90">{content.description}</p>
        </div>
      </div>

      {/* Countdown Offer */}
      <CountdownOffer onExpired={handleOfferExpired} />

      {/* Purchase Notifications */}
      <PurchaseNotifications />

      {/* Pricing Plans */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column: Plan Selection */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center mb-6">
              Scegli il Tuo Piano
            </h2>
            
            {/* Plan Cards */}
            <div className="space-y-4">
              {/* 7 Days Plan */}
              <div 
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  selectedPlan === 'trial' 
                    ? 'border-[#71b8bc] bg-[#71b8bc]/5' 
                    : 'border-gray-200 hover:border-[#71b8bc]/50'
                }`}
                onClick={() => setSelectedPlan('trial')}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">PIANO 7 GIORNI</h3>
                    <p className="text-sm text-gray-600">Pagamento singolo</p>
                    <p className="text-[#71b8bc] font-bold">€1.50 al giorno</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">€10.50</div>
                    <div className="text-sm text-gray-500 line-through">€49.99</div>
                  </div>
                </div>
              </div>

              {/* 1 Month Plan */}
              <div 
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  selectedPlan === 'monthly' 
                    ? 'border-[#71b8bc] bg-[#71b8bc]/5' 
                    : 'border-gray-200 hover:border-[#71b8bc]/50'
                }`}
                onClick={() => setSelectedPlan('monthly')}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">PIANO 1 MESE</h3>
                    <p className="text-sm text-gray-600">Pagamento singolo</p>
                    <p className="text-[#71b8bc] font-bold">€0.66 al giorno</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">€19.99</div>
                    <div className="text-sm text-gray-500 line-through">€49.99</div>
                  </div>
                </div>
              </div>

              {/* 3 Months Plan - RECOMMENDED */}
              <div 
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all relative ${
                  selectedPlan === 'quarterly' 
                    ? 'border-[#71b8bc] bg-[#71b8bc]/5' 
                    : 'border-gray-200 hover:border-[#71b8bc]/50'
                }`}
                onClick={() => setSelectedPlan('quarterly')}
              >
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    CONSIGLIATO
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">PIANO 3 MESI</h3>
                    <p className="text-sm text-gray-600">Pagamento singolo</p>
                    <p className="text-[#71b8bc] font-bold">€0.38 al giorno</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">€34.99</div>
                    <div className="text-sm text-gray-500 line-through">€99.99</div>
                  </div>
                </div>
              </div>

              {/* Test Plan */}
              <div 
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  selectedPlan === 'test' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => setSelectedPlan('test')}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg text-blue-600">PIANO TEST</h3>
                    <p className="text-sm text-gray-600">Solo per test - tracciato in Stripe</p>
                    <p className="text-blue-600 font-bold">Piano di prova</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">€0.50</div>
                    <div className="text-sm text-gray-500">Minimo Stripe</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Checkout */}
          <div className="lg:sticky lg:top-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <Checkout 
                onPurchase={handlePurchase} 
                selectedPlan={selectedPlan}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Before/After Comparison */}
      <BeforeAfterComparison />

      {/* Rating */}
      <Rating rating={5} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PricingDiscounted;
