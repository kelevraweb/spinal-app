import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Checkout from '@/components/Checkout';
import { useFacebookPixel } from '@/hooks/useFacebookPixel';
import PurchaseNotifications from '@/components/PurchaseNotifications';

const PricingDiscounted = () => {
  const location = useLocation();
  const { trackPurchase } = useFacebookPixel();
  const [selectedPlan, setSelectedPlan] = useState<'trial' | 'monthly' | 'quarterly'>('quarterly');
  const [showCheckout, setShowCheckout] = useState(false);
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');

  useEffect(() => {
    // Get user data from URL parameters
    const params = new URLSearchParams(location.search);
    const name = params.get('name') || '';
    const email = params.get('email') || '';
    
    setUserName(name);
    setUserEmail(email);
  }, [location]);

  const handlePlanSelect = (plan: 'trial' | 'monthly' | 'quarterly') => {
    setSelectedPlan(plan);
    setShowCheckout(true);
  };

  const handlePurchase = (purchaseData: { planType: string; amount: number }) => {
    // Track Facebook Pixel Purchase event
    trackPurchase({
      value: purchaseData.amount,
      currency: 'EUR',
      plan_type: purchaseData.planType
    });
  };

  if (showCheckout) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#71b8bc] to-[#5da0a4] flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Completa il tuo acquisto</h2>
            <p className="text-gray-600">Stai per attivare il piano selezionato</p>
          </div>
          
          <Checkout 
            selectedPlan={selectedPlan}
            onPurchase={handlePurchase}
            userEmail={userEmail}
            userName={userName}
          />
          
          <button
            onClick={() => setShowCheckout(false)}
            className="mt-4 text-gray-500 hover:text-gray-700 text-sm underline w-full text-center"
          >
            ← Torna alla selezione del piano
          </button>
        </div>
        
        <PurchaseNotifications isActive={true} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#71b8bc] to-[#5da0a4]">
      <Helmet>
        <title>Offerta Speciale - Lovable</title>
        <meta name="description" content="Offerta speciale a tempo limitato per i piani di abbonamento Lovable. Risparmia fino al 65%." />
        <meta property="og:title" content="Offerta Speciale - Lovable" />
        <meta property="og:description" content="Offerta speciale a tempo limitato per i piani di abbonamento Lovable. Risparmia fino al 65%." />
        <meta property="og:image" content="URL_IMMAGINE_DI_ANTEPRIMA" />
        <meta property="og:url" content="https://www.lovable.it/pricing-discounted" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      
      <PurchaseNotifications isActive={true} />
      
      <header className="bg-white/10 py-6">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between">
            <Link to="/" className="text-white text-lg font-bold">
              Lovable
            </Link>
            <div className="space-x-6">
              <Link to="/terms-of-use" className="text-white hover:text-white/80">
                Termini di Utilizzo
              </Link>
              <Link to="/privacy-policy" className="text-white hover:text-white/80">
                Privacy Policy
              </Link>
              <Link to="/cookie-policy" className="text-white hover:text-white/80">
                Cookie Policy
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Offerta Speciale Limitata
          </h1>
          <p className="text-xl text-white/90 mb-2">
            Risparmia fino al 65% sui nostri piani premium
          </p>
          {userName && (
            <p className="text-lg text-white/80">
              Ciao {userName}! Ecco la tua offerta personalizzata
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Trial Plan */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 text-center">
              <span className="font-bold text-lg">PIANO 7 GIORNI</span>
            </div>
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-green-600 mb-2">€10.50</div>
                <div className="text-gray-500 line-through text-lg">€49.99</div>
                <div className="text-[#71b8bc] font-semibold">€1.50 al giorno</div>
                <div className="text-sm text-gray-600 mt-2">
                  Prova di 7 giorni + Abbonamento mensile (inizia dopo 7 giorni)
                </div>
              </div>
              <button
                onClick={() => handlePlanSelect('trial')}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-3 rounded-lg font-bold hover:from-yellow-500 hover:to-orange-600 transition-all duration-300"
              >
                INIZIA SUBITO
              </button>
            </div>
          </div>

          {/* Monthly Plan */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 text-center">
              <span className="font-bold text-lg">PIANO 1 MESE</span>
            </div>
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-green-600 mb-2">€19.99</div>
                <div className="text-gray-500 line-through text-lg">€49.99</div>
                <div className="text-[#71b8bc] font-semibold">€0.66 al giorno</div>
                <div className="text-sm text-gray-600 mt-2">Fatturazione mensile</div>
              </div>
              <button
                onClick={() => handlePlanSelect('monthly')}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-bold hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
              >
                SCEGLI QUESTO PIANO
              </button>
            </div>
          </div>

          {/* Quarterly Plan - Most Popular */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 border-4 border-green-400">
            <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-4 text-center relative">
              <span className="font-bold text-lg">PIANO 3 MESI</span>
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                PIÙ POPOLARE
              </div>
            </div>
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-green-600 mb-2">€34.99</div>
                <div className="text-gray-500 line-through text-lg">€99.99</div>
                <div className="text-[#71b8bc] font-semibold">€0.38 al giorno</div>
                <div className="text-sm text-gray-600 mt-2">Fatturazione trimestrale</div>
              </div>
              <button
                onClick={() => handlePlanSelect('quarterly')}
                className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white py-3 rounded-lg font-bold hover:from-green-600 hover:to-teal-700 transition-all duration-300"
              >
                MIGLIOR OFFERTA
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 text-white/80 text-sm">
          <p>🔒 Pagamento sicuro con crittografia SSL</p>
          <p>✅ Garanzia di rimborso 30 giorni</p>
        </div>
      </div>
    </div>
  );
};

export default PricingDiscounted;
