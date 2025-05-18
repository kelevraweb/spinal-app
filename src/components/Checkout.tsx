import React, { useState, useEffect } from 'react';
import { Rating } from './Rating';
import { useCheckout } from '@/hooks/use-checkout';
import { useToast } from '@/hooks/use-toast';

interface CheckoutProps {
  onPurchase: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ onPurchase }) => {
  const [selectedPlan, setSelectedPlan] = useState<'trial' | 'monthly' | 'quarterly'>('monthly');
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const { initiateCheckout, isLoading } = useCheckout();
  const { toast } = useToast();
  
  const plans = {
    trial: {
      title: 'Prova',
      price: 0.99,
      period: 'settimana',
      duration: '7 giorni',
      billingText: 'Pagamento unico',
      mostPopular: false,
      features: [
        'Piano personalizzato base',
        'Accesso ai contenuti introduttivi',
        'Analisi del profilo emotivo',
      ]
    },
    monthly: {
      title: 'Mensile',
      price: 7.99,
      period: 'mese',
      duration: '1 mese',
      billingText: 'Fatturazione mensile',
      savings: null,
      mostPopular: true,
      features: [
        'Piano personalizzato completo',
        'Accesso illimitato a tutti i contenuti',
        'Esercizi guidati per ogni situazione',
        'Analisi settimanale dei progressi',
      ]
    },
    quarterly: {
      title: 'Trimestrale',
      price: 19.99,
      period: '3 mesi',
      billingText: 'Fatturazione trimestrale',
      savings: '16%',
      total: 19.99,
      features: [
        'Piano personalizzato premium',
        'Accesso illimitato a tutti i contenuti',
        'Esercizi guidati per ogni situazione',
        'Analisi settimanale dei progressi',
        'Supporto via chat con i nostri esperti',
        'Garanzia soddisfatti o rimborsati'
      ]
    }
  };

  const testimonials = [
    {
      name: "Sara T.",
      text: "Dopo solo 3 settimane di percorso, mi sento molto più consapevole dei miei schemi relazionali.",
      rating: 5
    },
    {
      name: "Marco L.",
      text: "Ho imparato a mettere confini sani senza sentirmi in colpa. La mia relazione è migliorata tantissimo.",
      rating: 5
    },
    {
      name: "Giulia M.",
      text: "Finalmente ho smesso di cercare l'approvazione degli altri e ho iniziato a dare valore a me stessa.",
      rating: 4
    }
  ];

  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(testimonialInterval);
  }, [testimonials.length]);

  const benefits = [
    'Più energia quotidiana',
    'Meno ansia e preoccupazioni',
    'Focus mentale chiaro',
    'Relazioni più sane e costruttive',
    'Migliore autostima',
    'Resilienza emotiva'
  ];

  const handlePurchase = async () => {
    const success = await initiateCheckout(selectedPlan);
    if (success) {
      toast({
        title: "Checkout iniziato",
        description: "Ti abbiamo reindirizzato al nostro sistema di pagamento sicuro."
      });
      // We still call onPurchase to maintain compatibility with existing code
      // The actual redirect happens in the useCheckout hook
      onPurchase();
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-10 px-4 animate-fade-in pt-16">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
        Il tuo piano personalizzato è pronto!
      </h2>
      
      <div className="flex justify-center space-x-4 my-6">
        <div className="flex items-center">
          <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 text-green-600 rounded-full mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <span>Accesso Istantaneo</span>
        </div>
        
        <div className="flex items-center">
          <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 text-green-600 rounded-full mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <span>Nessuna Carta di Credito</span>
        </div>
      </div>
      
      {/* Benefits Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 my-8">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
            <div className="flex-shrink-0 h-10 w-10 mr-3 bg-brand-primary bg-opacity-10 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-primary">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <span className="font-medium">{benefit}</span>
          </div>
        ))}
      </div>
      
      {/* Testimonial Carousel */}
      <div className="my-12 overflow-hidden relative">
        <h3 className="text-xl font-bold text-center mb-6">Le persone amano i nostri piani</h3>
        <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="w-full flex-shrink-0 px-4">
              <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
                <Rating rating={testimonial.rating} />
                <p className="my-4 italic text-gray-700">"{testimonial.text}"</p>
                <p className="text-right font-semibold">— {testimonial.name}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4 space-x-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTestimonial(idx)}
              className={`w-2 h-2 rounded-full ${activeTestimonial === idx ? 'bg-brand-primary' : 'bg-gray-300'}`}
              aria-label={`Vai alla testimonianza ${idx + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* Plan Selection */}
      <h3 className="text-xl font-bold text-center mb-6">Scegli il tuo piano</h3>
      <div className="flex flex-col md:flex-row gap-4 my-8">
        {/* Trial Plan */}
        <div 
          className={`flex-1 border-2 rounded-xl p-6 transition-all cursor-pointer
            ${selectedPlan === 'trial' 
              ? 'border-brand-primary bg-brand-light shadow-lg transform -translate-y-1' 
              : 'border-gray-200 hover:border-gray-300'
            }`}
          onClick={() => setSelectedPlan('trial')}
        >
          <div className="text-lg font-semibold mb-2">{plans.trial.title}</div>
          
          <div className="flex items-baseline">
            <span className="text-3xl font-bold">€{plans.trial.price}</span>
            <span className="text-gray-500 ml-1">/{plans.trial.period}</span>
          </div>
          
          <p className="text-sm text-gray-500 mt-1">{plans.trial.billingText}</p>
          <p className="text-sm text-gray-700 font-medium mt-2">{plans.trial.duration}</p>
          
          <div className="mt-4 space-y-2">
            {plans.trial.features.map((feature, i) => (
              <div key={i} className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-1 mr-2 text-green-500">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
          
          <button 
            className={`w-full mt-4 py-2 rounded-full text-sm font-medium
              ${selectedPlan === 'trial' 
                ? 'bg-brand-primary text-white' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            onClick={() => setSelectedPlan('trial')}
          >
            Seleziona
          </button>
        </div>
        
        {/* Monthly Plan */}
        <div 
          className={`flex-1 border-2 rounded-xl p-6 transition-all cursor-pointer
            ${selectedPlan === 'monthly' 
              ? 'border-brand-primary bg-brand-light shadow-lg transform -translate-y-1' 
              : 'border-gray-200 hover:border-gray-300'
            }`}
          onClick={() => setSelectedPlan('monthly')}
        >
          {plans.monthly.mostPopular && (
            <div className="bg-brand-primary text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-2">
              PIÙ POPOLARE
            </div>
          )}
          
          <div className="text-lg font-semibold mb-2">{plans.monthly.title}</div>
          
          <div className="flex items-baseline">
            <span className="text-3xl font-bold">€{plans.monthly.price}</span>
            <span className="text-gray-500 ml-1">/{plans.monthly.period}</span>
          </div>
          
          <p className="text-sm text-gray-500 mt-1">{plans.monthly.billingText}</p>
          <p className="text-sm text-gray-700 font-medium mt-2">{plans.monthly.duration}</p>
          
          <div className="mt-4 space-y-2">
            {plans.monthly.features.map((feature, i) => (
              <div key={i} className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-1 mr-2 text-green-500">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
          
          <button 
            className={`w-full mt-4 py-2 rounded-full text-sm font-medium
              ${selectedPlan === 'monthly' 
                ? 'bg-brand-primary text-white' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            onClick={() => setSelectedPlan('monthly')}
          >
            Seleziona
          </button>
        </div>
        
        {/* Quarterly Plan */}
        <div 
          className={`flex-1 border-2 rounded-xl p-6 transition-all cursor-pointer
            ${selectedPlan === 'quarterly' 
              ? 'border-brand-primary bg-brand-light shadow-lg transform -translate-y-1' 
              : 'border-gray-200 hover:border-gray-300'
            }`}
          onClick={() => setSelectedPlan('quarterly')}
        >
          {plans.quarterly.savings && (
            <div className="bg-orange-400 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-2">
              RISPARMI {plans.quarterly.savings}
            </div>
          )}
          
          <div className="text-lg font-semibold mb-2">{plans.quarterly.title}</div>
          
          <div className="flex items-baseline">
            <span className="text-3xl font-bold">€{plans.quarterly.price}</span>
            <span className="text-gray-500 ml-1">/{plans.quarterly.period}</span>
          </div>
          
          <p className="text-sm text-gray-500 mt-1">{plans.quarterly.billingText}</p>
          <p className="text-sm text-gray-700 font-medium mt-2">{plans.quarterly.features.length} funzionalità complete</p>
          
          <div className="mt-4 space-y-2">
            {plans.quarterly.features.map((feature, i) => (
              <div key={i} className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-1 mr-2 text-green-500">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
          
          <button 
            className={`w-full mt-4 py-2 rounded-full text-sm font-medium
              ${selectedPlan === 'quarterly' 
                ? 'bg-brand-primary text-white' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            onClick={() => setSelectedPlan('quarterly')}
          >
            Seleziona
          </button>
        </div>
      </div>
      
      {/* Purchase Button */}
      <div className="mt-8 text-center">
        <button
          onClick={handlePurchase}
          disabled={isLoading}
          className={`btn-primary py-4 w-full max-w-lg text-lg ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'ELABORAZIONE...' : 'OTTIENI IL TUO PIANO'}
        </button>
        
        <div className="mt-2 text-xs text-gray-500 max-w-lg mx-auto">
          <p>Riceverai accesso immediato al tuo piano personalizzato dopo il pagamento</p>
          <p>Garanzia di rimborso di 7 giorni se non sei soddisfatto del tuo piano</p>
        </div>
      </div>
      
      {/* Payment Methods */}
      <div className="flex justify-center mt-4 space-x-2">
        <div className="w-8 h-5 bg-gray-200 rounded"></div>
        <div className="w-8 h-5 bg-gray-200 rounded"></div>
        <div className="w-8 h-5 bg-gray-200 rounded"></div>
        <div className="w-8 h-5 bg-gray-200 rounded"></div>
      </div>
      
      {/* Program outline */}
      <div className="mt-16">
        <h3 className="text-xl font-bold text-center mb-8">Come il programma ti aiuta a migliorare...</h3>
        
        <div className="space-y-6 max-w-2xl mx-auto">
          {[
            {
              title: "Settimana 1: Interrompi il ciclo di pensieri negativi",
              content: "Impara a identificare schemi dannosi nel tuo modo di pensare e come interromperli prima che si intensifichino."
            },
            {
              title: "Settimana 2: Recupera chiarezza mentale",
              content: "Usa le nostre tecniche comprovate per schiarire la nebbia mentale e ritrovare il focus su ciò che conta davvero."
            },
            {
              title: "Settimana 3: Esercita meccanismi di coping migliori",
              content: "Sostituisci strategie di coping distruttive con alternative più sane progettate specificamente per la tua personalità."
            },
            {
              title: "Settimana 4: Costruisci una resilienza duratura",
              content: "Sviluppa una resilienza emotiva a lungo termine per affrontare meglio le sfide future nelle tue relazioni."
            }
          ].map((programma, i) => (
            <div key={i} className="border-b border-gray-200 pb-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 mr-3 mt-1 text-center bg-gray-100 rounded-full text-sm font-medium">
                  {i+1}
                </div>
                <div>
                  <h4 className="font-medium">{programma.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{programma.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Statistics */}
      <div className="mt-16">
        <h3 className="text-xl font-bold text-center mb-2">Persone come te hanno ottenuto grandi risultati con il nostro piano</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-brand-primary">83%</div>
            <p className="text-sm mt-1">degli utenti sono riusciti a fermare convinzioni dannose e svilupparne di più positive</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-brand-primary">77%</div>
            <p className="text-sm mt-1">degli utenti hanno riportato un miglioramento della qualità del sonno seguendo il nostro piano</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-brand-primary">90%</div>
            <p className="text-sm mt-1">degli utenti si sentono più se stessi in meno di 2 mesi</p>
          </div>
        </div>
      </div>
      
      {/* Final CTA */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-6">Il tuo piano personalizzato è pronto!</h2>
        
        <button
          onClick={handlePurchase}
          disabled={isLoading}
          className={`btn-primary py-4 px-8 text-lg ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'ELABORAZIONE...' : 'OTTIENI IL TUO PIANO ORA'}
        </button>
      </div>
      
      {/* Money Back Guarantee */}
      <div className="mt-16 border-2 border-green-100 rounded-xl p-6 max-w-2xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center">
          <div className="mr-4 flex-shrink-0 mx-auto md:mx-0">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4 md:mb-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="8 12 12 16 16 12"></polyline>
                <line x1="12" y1="8" x2="12" y2="16"></line>
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2 text-center md:text-left">Garanzia di rimborso di 30 giorni</h3>
            <p className="text-gray-600">
              Crediamo così tanto nel nostro programma che se non noti miglioramenti nei primi 30 giorni, ti rimborseremo completamente. Senza domande. Il tuo percorso verso una migliore salute emotiva dovrebbe essere senza rischi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
