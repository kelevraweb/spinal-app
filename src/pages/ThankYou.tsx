
import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useFacebookPixel } from '@/hooks/useFacebookPixel';

const ThankYou: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { trackPurchase } = useFacebookPixel();

  // Get purchase data from URL params
  const planType = searchParams.get('plan') || 'quarterly';
  const amount = parseFloat(searchParams.get('amount') || '34.99');
  const userName = searchParams.get('name') || '';

  useEffect(() => {
    // Track Purchase event when component mounts
    trackPurchase({
      value: amount,
      currency: 'EUR',
      plan_type: planType,
      content_ids: [planType]
    });
  }, [amount, planType, trackPurchase]);

  const getPlanDisplayName = (plan: string) => {
    switch (plan) {
      case 'trial':
        return 'Piano 7 Giorni';
      case 'monthly':
        return 'Piano 1 Mese';
      case 'quarterly':
        return 'Piano 3 Mesi';
      default:
        return 'Piano Personalizzato';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6 text-center animate-fade-in">
        <div className="w-16 h-16 bg-[#19f1fe] rounded-full mx-auto flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {userName ? `Grazie ${userName}!` : 'Grazie per il tuo acquisto!'}
        </h1>
        
        <p className="text-gray-600 mb-6">
          Il tuo Piano Personalizzato per il Benessere della Schiena è ora in preparazione. 
          Riceverai a breve un'email con il tuo piano e i dettagli di accesso.
        </p>
        
        <div className="bg-[#e5fcff] p-4 rounded-lg mb-6">
          <p className="font-medium text-gray-800 mb-2">Cosa succede ora?</p>
          <ul className="text-left text-sm space-y-2">
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#19f1fe] mr-2 mt-1 flex-shrink-0">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span>Riceverai un'email con il tuo piano personalizzato entro i prossimi 15 minuti.</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#19f1fe] mr-2 mt-1 flex-shrink-0">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span>Il nostro team di esperti analizzerà le tue risposte e fornirà consigli aggiuntivi.</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#19f1fe] mr-2 mt-1 flex-shrink-0">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span>Avrai accesso alla nostra app mobile per monitorare i tuoi progressi.</span>
            </li>
          </ul>
        </div>

        {/* Purchase confirmation */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 mr-2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <p className="font-medium text-green-800">Pagamento confermato</p>
          </div>
          <p className="text-sm text-green-700">
            {getPlanDisplayName(planType)} • Importo: €{amount.toFixed(2)}
          </p>
        </div>
        
        <Link to="/" className="block w-full bg-[#ff1aa9] hover:bg-[#e6009a] text-white font-medium py-3 px-4 rounded-full transition-all shadow-md">
          Torna alla Home
        </Link>

        <div className="mt-6 text-xs text-gray-500">
          <p>Hai domande? Contattaci a support@spinalapp.net</p>
          <p className="mt-1">Il tuo acquisto è protetto dalla nostra garanzia di rimborso di 30 giorni.</p>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
