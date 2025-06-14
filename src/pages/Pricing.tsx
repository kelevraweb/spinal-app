import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faStar, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { Rating } from '@/components/Rating';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Checkout from '@/components/Checkout';
import BeforeAfterComparison from '@/components/BeforeAfterComparison';
import PurchaseNotifications from '@/components/PurchaseNotifications';
import { useSecureFacebookPixel } from '@/hooks/useSecureFacebookPixel';
import { supabase } from '@/integrations/supabase/client';

const Pricing: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showCheckoutDialog, setShowCheckoutDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'trial' | 'monthly' | 'quarterly' | 'test'>('monthly');
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [showTestProduct, setShowTestProduct] = useState(false);
  const { trackAddToCart } = useSecureFacebookPixel();

  // Get user name and gender from URL params
  const userName = searchParams.get('name') || '';
  const userGender = searchParams.get('gender') || 'male';

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch test product setting
  useEffect(() => {
    const fetchTestProductSetting = async () => {
      try {
        const { data, error } = await supabase
          .from('admin_settings')
          .select('setting_value')
          .eq('setting_key', 'show_test_product')
          .single();

        if (!error && data) {
          setShowTestProduct(data.setting_value === 'true');
        }
      } catch (error) {
        console.error('Error fetching test product setting:', error);
      }
    };

    fetchTestProductSetting();
  }, []);

  // Standard pricing (non-discounted)
  const plans = {
    trial: {
      title: 'PIANO 7 GIORNI',
      price: 49.99,
      dailyPrice: 7.14,
      popular: false,
      description: 'Prova di 7 giorni + Abbonamento mensile (inizia dopo 7 giorni)'
    },
    monthly: {
      title: 'PIANO 1 MESE',
      price: 49.99,
      dailyPrice: 1.67,
      popular: true,
      description: 'Fatturazione mensile'
    },
    quarterly: {
      title: 'PIANO 3 MESI',
      price: 99.99,
      dailyPrice: 1.11,
      popular: false,
      description: 'Fatturazione trimestrale'
    },
    ...(showTestProduct && {
      test: {
        title: 'PIANO TEST',
        price: 0.00,
        dailyPrice: 0.00,
        popular: false,
        description: 'Solo per test - Nessun pagamento richiesto',
        isTest: true
      }
    })
  };

  const formatDailyPrice = (price: number) => {
    const euros = Math.floor(price);
    const cents = Math.round((price - euros) * 100);
    return (
      <span>
        <span className="text-lg font-bold">{euros}</span>
        <span className="text-xs">,{cents.toString().padStart(2, '0')}</span>
      </span>
    );
  };

  const handleSelectPlan = () => {
    const selectedPlanDetails = plans[selectedPlan];
    
    // Track AddToCart event
    trackAddToCart({
      value: selectedPlanDetails.price,
      currency: 'EUR',
      plan_type: selectedPlan,
      content_ids: [selectedPlan]
    });

    setShowCheckoutDialog(true);
  };

  const handlePurchase = (purchaseData: { planType: string; amount: number }) => {
    console.log('Elaborazione acquisto completata:', purchaseData);
    
    // Navigate to thank you page with purchase data
    const params = new URLSearchParams({
      plan: purchaseData.planType,
      amount: purchaseData.amount.toString(),
      name: userName
    });
    
    navigate(`/thank-you?${params.toString()}`);
  };

  const disclaimers = {
    trial: "Cliccando su \"Ottieni il mio piano\", accetti il rinnovo automatico dell'abbonamento. La prima settimana costa 49,99€, poi 49,99 €/mese (prezzi IVA inclusa). Puoi annullare inviando una mail a: support@spinalapp.net. Consulta la Politica di Abbonamento per maggiori dettagli.",
    monthly: "Cliccando su \"Ottieni il mio piano\", accetti il rinnovo automatico dell'abbonamento a 49,99 €/mese (prezzi IVA inclusa). Puoi annullare inviando una mail a: support@spinalapp.net. Consulta la Politica di Abbonamento per maggiori dettagli.",
    quarterly: "Cliccando su \"Ottieni il mio piano\", accetti il rinnovo automatico dell'abbonamento a 99,99 € ogni trimestre (prezzi IVA inclusa). Puoi annullare inviando una mail a: support@spinalapp.net. Consulta la Politica di Abbonamento per maggiori dettagli.",
    test: "Questo è un piano di test gratuito. Non verrà addebitato alcun costo. Utilizzato solo per scopi di testing."
  };

  const faqItems = [
    {
      id: 'consistency',
      question: 'E se non riesco a essere costante con gli esercizi?',
      answer: <div>
            <p>Il nostro piano è studiato per persone impegnate o poco costanti:</p>
            <ul className="mt-2 space-y-1">
              <li className="flex items-start">
                <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-2 mt-1 text-sm" />
                <span>routine brevi da 5 a 15 minuti</span>
              </li>
              <li className="flex items-start">
                <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-2 mt-1 text-sm" />
                <span>video guidati passo passo</span>
              </li>
              <li className="flex items-start">
                <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-2 mt-1 text-sm" />
                <span>reminder e supporto per aiutarti a non mollare</span>
              </li>
            </ul>
            <p className="mt-2">Non serve forza di volontà: serve solo iniziare.</p>
          </div>
    }, {
      id: 'previous-attempts',
      question: 'E se ho già provato stretching o fisioterapia, ma non ha funzionato?',
      answer: <div>
            <p>Questo non è un "semplice stretching". È un metodo strutturato che unisce:</p>
            <ul className="mt-2 space-y-1">
              <li>• esercizi posturali mirati</li>
              <li>• mobilità funzionale</li>
              <li>• rilascio delle tensioni profonde</li>
            </ul>
            <p className="mt-2">È progressivo, sostenibile e pensato per durare.</p>
          </div>
    }, {
      id: 'chronic-pain',
      question: 'Ho dolore cronico: posso seguire comunque il piano?',
      answer: <div>
            <p>Sì. Ogni esercizio è pensato per essere eseguito in sicurezza, anche in caso di rigidità o dolori persistenti.</p>
            <p className="mt-2">Ti guideremo nell'adattare i movimenti al tuo livello attuale, senza stress o rischi.</p>
          </div>
    }, {
      id: 'time-constraints',
      question: 'E se ho poco tempo?',
      answer: <div>
            <p>Abbiamo creato routine giornaliere che richiedono solo 5–10 minuti al giorno.</p>
            <p className="mt-2">Il piano si adatta a te, non il contrario.</p>
            <p className="mt-1">Meglio poco ma fatto bene, che niente.</p>
          </div>
    }
  ];

  const PricingSection = ({
    compact = false
  }) => (
    <div className={`${compact ? 'mb-6' : 'mb-8'} max-w-[580px] mx-auto px-2`} data-pricing-section>
      {!compact && <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            {userName ? `Ciao ${userName}, il` : 'Il'} tuo piano personalizzato per la salute della schiena è pronto!
          </h1>
          <p className="text-gray-600 text-lg">
            Scegli il piano più adatto alle tue esigenze
          </p>
        </div>}
      
      <div className="space-y-3">
        {Object.entries(plans).map(([key, plan]) => <div key={key} className="relative">
            {plan.popular && <div className="absolute -top-2 left-4 z-10">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-md text-xs font-medium flex items-center shadow-lg">
                  <FontAwesomeIcon icon={faStar} className="mr-1 text-xs" />
                  PIÙ POPOLARE
                </div>
              </div>}
            
            {'isTest' in plan && plan.isTest && (
              <div className="absolute -top-2 -right-2 z-10">
                <Badge variant="secondary" className="bg-blue-500 text-white px-2 py-1 text-xs font-bold shadow-lg">
                  🧪 TEST
                </Badge>
              </div>
            )}
            
            <div onClick={() => setSelectedPlan(key as 'trial' | 'monthly' | 'quarterly' | 'test')} className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${selectedPlan === key ? 'border-green-500 bg-white shadow-lg' : 'border-gray-200 hover:border-gray-300 bg-white'} ${'isTest' in plan && plan.isTest ? 'border-blue-200 bg-blue-50' : ''}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center flex-1">
                  <div className="mr-3">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedPlan === key ? 'border-green-500 bg-green-500' : 'border-gray-300'}`}>
                      {selectedPlan === key && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-base font-bold text-gray-900 mb-1">{plan.title}</h3>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className={`text-lg font-bold ${'isTest' in plan && plan.isTest ? 'text-blue-600' : 'text-green-600'}`}>
                        €{plan.price.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{plan.description}</p>
                  </div>
                </div>

                <div className={`${'isTest' in plan && plan.isTest ? 'bg-blue-100' : 'bg-gray-100'} rounded-lg px-3 py-2 text-center`}>
                  <div className="text-gray-900 text-xl font-bold">
                    €{formatDailyPrice(plan.dailyPrice)}
                  </div>
                  <div className="text-xs text-gray-600">al giorno</div>
                </div>
              </div>
            </div>
          </div>)}
      </div>

      <div className="text-center mt-6">
        <Button onClick={handleSelectPlan} className={`w-full ${selectedPlan === 'test' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'} text-white font-bold py-3 px-6 rounded-lg text-base shadow-lg transition-all duration-300 transform hover:scale-105`}>
          {selectedPlan === 'test' ? 'OTTIENI PIANO TEST GRATUITO' : 'OTTIENI IL MIO PIANO'}
        </Button>
      </div>

      <div className="text-center mt-4 text-xs text-gray-600 bg-gray-50 p-3 rounded-lg">
        <p>{disclaimers[selectedPlan]}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white bg-[#fbfaf8]">
      <PurchaseNotifications />
      
      <div className="max-w-[580px] mx-auto px-2 pt-8">
        {/* Before-After Comparison Section */}
        <BeforeAfterComparison />
        <PricingSection />

        <div className="text-center mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg max-w-md mx-auto">
            <div className="flex items-center justify-center mb-4">
              <FontAwesomeIcon icon={faShieldAlt} className="text-green-500 mr-3 text-2xl" />
              <p className="font-bold text-lg">Pagamento Sicuro e Protetto</p>
            </div>
            <img src="/lovable-uploads/da294585-2e35-4f7d-86d5-abed6dfc94b2.png" alt="Metodi di pagamento accettati" className="max-w-xs h-auto mx-auto" loading="eager" fetchPriority="high" />
          </div>
        </div>

        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-[#71b8bc] to-[#88c2aa] bg-clip-text text-transparent">
              I NOSTRI OBIETTIVI PER IL TUO BENESSERE FISICO
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#71b8bc] to-[#88c2aa] mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {["Ti svegli con meno rigidità e più scioltezza nei movimenti", "Non vivi più giornate segnate dal mal di schiena o da fastidi continui", "Ti muovi con più fluidità, sicurezza e controllo", "Migliori la tua postura, anche quando lavori o stai seduto a lungo", "Recuperi energia fisica grazie a un corpo che si muove meglio", "Riscopri il piacere di fare gesti semplici senza dolore o sforzo"].map((objective, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-[#71b8bc] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-gradient-to-r from-[#71b8bc] to-[#88c2aa] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <FontAwesomeIcon icon={faCheck} className="text-white text-xs" />
                  </div>
                  <p className="text-gray-700 text-sm font-medium">{objective}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <div className="bg-gradient-to-r from-[#71b8bc] to-[#88c2aa] rounded-3xl p-6 md:p-8 text-white text-center">
            <h2 className="text-xl md:text-2xl font-bold mb-6">
              Persone come te hanno ottenuto risultati straordinari!
            </h2>
            
            <div className="grid grid-cols-1 gap-6">
              {[{
                percentage: "83%",
                text: "degli utenti è riuscito a migliorare il proprio benessere dopo sole 6 settimane"
              }, {
                percentage: "77%",
                text: "degli utenti hanno iniziato con dolori simili ai tuoi"
              }, {
                percentage: "45%",
                text: "degli utenti soffre degli stessi problemi tuoi"
              }].map((stat, index) => (
                <div key={index} className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                  <div className="text-3xl md:text-4xl font-bold mb-3">{stat.percentage}</div>
                  <p className="text-white/90 text-sm">{stat.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-6">
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-3xl p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold text-center mb-6 text-red-800">
              Senza il nostro piano
            </h2>
            <div className="space-y-3">
              {["Mal di schiena costante che rallenta le tue giornate", "Dolore o rigidità quando ti alzi dal letto o dalla sedia", "Tensione alle spalle e collo dopo ore davanti al PC", "Sensazione di blocco o fatica a fare anche movimenti semplici", "Rinunci a camminate o attività per paura del dolore", "Ti abitui al disagio fisico, pensando sia \"normale\""].map((item, index) => (
                <div key={index} className="bg-white rounded-lg p-3 flex items-start shadow-sm">
                  <FontAwesomeIcon icon={faCheck} className="text-red-500 mr-3 mt-1 text-sm" />
                  <p className="text-gray-700 text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold text-center mb-6 text-green-800">
              Con il nostro piano "Schiena Libera"
            </h2>
            <div className="space-y-3">
              {["Meno dolore lombare, cervicale o dorsale già dopo pochi giorni", "Più mobilità e fluidità nei movimenti quotidiani", "Postura migliorata senza sforzi estremi o attrezzi", "Routine semplice da seguire anche con poco tempo", "Ritorno alla libertà di muoverti senza paura o limitazioni", "Sensazione di benessere fisico costante e naturale"].map((item, index) => (
                <div key={index} className="bg-white rounded-lg p-3 flex items-start shadow-sm">
                  <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-3 mt-1 text-sm" />
                  <p className="text-gray-700 text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-12">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-4 md:p-6 border-2 border-green-200">
            <div className="text-center mb-4">
              <div className="inline-block bg-green-500 text-white p-3 rounded-full mb-3">
                <FontAwesomeIcon icon={faShieldAlt} className="text-xl" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold mb-3 text-green-800">
                Garanzia Soddisfatti o Rimborsati – 30 Giorni
              </h2>
            </div>
            <div className="max-w-4xl mx-auto space-y-3 text-gray-700">
              <p className="text-base">Siamo certi che il nostro piano ti aiuterà a ridurre tensioni, dolori e rigidità.</p>
              <p className="text-base">Per questo, ti offriamo una garanzia di rimborso completa entro 30 giorni.</p>
              <div className="bg-white rounded-xl p-4 border-l-4 border-green-500">
                <p className="font-medium text-base">
                  👉 Se seguirai il piano come indicato e non noterai alcun miglioramento fisico percepibile (meno dolore, più mobilità, miglior postura), potrai richiedere il rimborso senza spiegazioni complicate.
                </p>
              </div>
              <p className="text-center text-sm">📄 Consulta la nostra Politica di Rimborso per conoscere tutte le condizioni applicabili.</p>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-[#71b8bc] to-[#88c2aa] bg-clip-text text-transparent">
            Le persone spesso chiedono:
          </h2>
          
          <div className="max-w-[580px] mx-auto space-y-3">
            {faqItems.map(faq => (
              <Collapsible key={faq.id} open={openFAQ === faq.id} onOpenChange={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}>
                <CollapsibleTrigger className="w-full">
                  <div className="bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-all duration-300 cursor-pointer">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-left text-base">{faq.question}</h3>
                      <ChevronDown className={`w-4 h-4 text-[#71b8bc] transition-transform duration-300 ${openFAQ === faq.id ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="bg-gray-50 rounded-xl p-4 mt-2 border-l-4 border-[#71b8bc]">
                    {faq.answer}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-[#71b8bc] to-[#88c2aa] bg-clip-text text-transparent">
            Gli utenti adorano il nostro piano "Schiena Libera"
          </h2>
          
          <div className="grid grid-cols-1 gap-6">
            {[{
              name: "Laura M., 45 anni",
              title: "Mi sveglio senza il solito blocco lombare",
              text: "Avevo dolori alla zona lombare da mesi, soprattutto al mattino. Dopo solo una settimana, riesco ad alzarmi dal letto senza fatica. Gli esercizi sono semplici, brevi e molto efficaci."
            }, {
              name: "Marco R., 38 anni",
              title: "Finalmente riesco a stare seduto senza indolenzimenti",
              text: "Lavoro 8 ore al computer e avevo sempre collo e spalle rigidi. Il piano mi ha aiutato a migliorare la postura e a scaricare la tensione. Lo seguo ogni sera prima di cena."
            }, {
              name: "Silvia T., 51 anni",
              title: "Non pensavo bastassero 10 minuti al giorno",
              text: "Ho provato mille cose, ma questa è l'unica che ho continuato. Niente attrezzi, niente stress. Inizio a sentirmi di nuovo libera nei movimenti."
            }, {
              name: "Gianni B., 64 anni",
              title: "Sto ricominciando a camminare senza dolori",
              text: "Dopo anni di rigidità e fastidi alla schiena, riesco a camminare a lungo senza fermarmi. Questo piano mi ha dato più risultati di fisioterapie molto più costose."
            }].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-xl p-4 md:p-6 border-l-4 border-[#71b8bc] hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex text-yellow-400 mb-3">
                  <Rating rating={5} />
                </div>
                <h3 className="font-bold mb-2 text-base text-gray-800">"{testimonial.title}"</h3>
                <p className="text-sm text-[#71b8bc] mb-3 font-medium">{testimonial.name}</p>
                <p className="text-gray-700 leading-relaxed text-sm">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>

        <Dialog open={showCheckoutDialog} onOpenChange={setShowCheckoutDialog}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Finalizza l'acquisto</DialogTitle>
            </DialogHeader>
            <Checkout onPurchase={handlePurchase} selectedPlan={selectedPlan} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Pricing;
