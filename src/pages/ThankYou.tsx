
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useFacebookPixel } from '@/hooks/useFacebookPixel';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const ThankYou: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { trackPurchase } = useFacebookPixel();
  const navigate = useNavigate();

  // Get purchase data from URL params
  const planType = searchParams.get('plan') || 'quarterly';
  const amount = parseFloat(searchParams.get('amount') || '34.99');
  const userName = searchParams.get('name') || '';
  const paymentData = { amount, plan: planType };

  useEffect(() => {
    // Ensure page starts from top immediately
    window.scrollTo(0, 0);
    
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
    <div className="min-h-screen bg-gradient-to-br from-background to-muted py-8 px-4">
      <div className="max-w-2xl w-full bg-card rounded-lg shadow-lg p-8 text-center mx-auto">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            ✅ Grazie per il tuo ordine!
          </h1>
          <p className="text-xl text-muted-foreground">
            🎉 La tua iscrizione è stata completata con successo.
          </p>
        </div>

        {paymentData && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-800 font-semibold">
              Pagamento confermato: €{paymentData.amount} per il piano {paymentData.plan}
            </p>
          </div>
        )}

        <div className="space-y-6 text-left">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              🚀 Cosa succede ora?
            </h2>
          </div>

          <div className="space-y-4">
            <div className="border-l-4 border-[#71b8bc] pl-4">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                1️⃣ Controlla la tua email
              </h3>
              <p className="text-muted-foreground mb-2">
                Tra pochi minuti riceverai una mail con:
              </p>
              <ul className="text-muted-foreground ml-4">
                <li>• Il link per creare la tua password personale.</li>
                <li>• Il link diretto per accedere al tuo piano di allenamento.</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-2 italic">
                (Se non trovi la mail, controlla anche nello spam o nella cartella promozioni.)
              </p>
            </div>

            <div className="border-l-4 border-[#71b8bc] pl-4">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                2️⃣ Accedi facilmente quando vuoi
              </h3>
              <p className="text-muted-foreground mb-2">
                Dopo aver impostato la password, potrai accedere al tuo piano di allenamento tutte le volte che vuoi semplicemente andando su: <strong>www.spinalapp.net</strong>
              </p>
              <p className="text-muted-foreground mb-2">
                👉 Ti consigliamo di salvare il sito tra i preferiti.
              </p>
              <p className="text-muted-foreground">
                Una volta sul sito, clicca su "Area Riservata" (in alto a destra) e inserisci le tue credenziali.
              </p>
            </div>

            <div className="border-l-4 border-[#71b8bc] pl-4">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                3️⃣ Hai bisogno di supporto?
              </h3>
              <p className="text-muted-foreground mb-2">
                📩 Scrivici in qualsiasi momento a: <strong>support@spinalapp.net</strong>
              </p>
              <p className="text-muted-foreground mb-2">
                🔍 Inoltre, all'interno del tuo piano di allenamento trovi la sezione FAQ dove puoi:
              </p>
              <ul className="text-muted-foreground ml-4">
                <li>• Gestire il tuo abbonamento</li>
                <li>• Risolvere eventuali dubbi</li>
                <li>• Trovare risposte rapide alle domande più comuni</li>
              </ul>
            </div>
          </div>

          <div className="bg-[#71b8bc] text-white p-6 rounded-lg text-center">
            <h3 className="text-xl font-bold mb-2">
              👋 Benvenuto/a in Spinal!
            </h3>
            <p className="text-lg">
              Siamo pronti a rimettere in moto la tua schiena.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <Button 
            onClick={() => navigate('/')}
            className="w-full md:w-auto"
          >
            Torna alla Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
