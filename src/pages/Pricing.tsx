
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faStar, faShieldAlt, faRocket, faCrown, faGift } from '@fortawesome/free-solid-svg-icons';
import { Rating } from '@/components/Rating';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import Checkout from '@/components/Checkout';
import BeforeAfterComparison from '@/components/BeforeAfterComparison';

const Pricing: React.FC = () => {
  const navigate = useNavigate();
  const [showCheckoutDialog, setShowCheckoutDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'trial' | 'monthly' | 'quarterly'>('monthly');
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  const plans = {
    trial: {
      title: '7 giorni',
      price: 49.99,
      period: 'totale',
      duration: '7 giorni',
      dailyPrice: 7.14,
      billingText: 'Pagamento unico',
      icon: faGift,
      badge: 'PROVA'
    },
    monthly: {
      title: '30 giorni',
      price: 49.99,
      period: 'totale',
      duration: '1 mese',
      dailyPrice: 1.66,
      billingText: 'Fatturazione mensile',
      popular: true,
      icon: faRocket,
      badge: 'PIÙ POPOLARE'
    },
    quarterly: {
      title: '90 giorni',
      price: 99.99,
      period: 'totale',
      duration: '3 mesi',
      dailyPrice: 1.11,
      billingText: 'Fatturazione trimestrale',
      icon: faCrown,
      badge: 'MIGLIOR VALORE'
    }
  };

  const disclaimers = {
    trial: "Cliccando su 'Ottieni il Mio Piano', accetti una prova di 1 settimana a €49,99, che si convertirà in un abbonamento con rinnovo automatico a €49,99/mese se non annullato (prezzi IVA inclusa). Annulla tramite l'app o via email: support@theliven.com. Consulta la Politica di Abbonamento per i dettagli.",
    monthly: "Cliccando su 'Ottieni il Mio Piano', accetti il rinnovo automatico dell'abbonamento. Il primo mese costa €49,99, poi €49,99/mese (prezzi IVA inclusa). Annulla tramite l'app o via email: support@theliven.com. Consulta la Politica di Abbonamento per i dettagli.",
    quarterly: "Cliccando su 'Ottieni il Mio Piano', accetti il rinnovo automatico dell'abbonamento. I primi tre mesi costano €99,99, poi €99,99 ogni tre mesi (prezzi IVA inclusa). Annulla tramite l'app o via email: support@theliven.com. Consulta la Politica di Abbonamento per i dettagli."
  };

  const faqItems = [
    {
      id: 'consistency',
      question: 'E se non riesco a essere costante con gli esercizi?',
      answer: (
        <div>
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
      )
    },
    {
      id: 'previous-attempts',
      question: 'E se ho già provato stretching o fisioterapia, ma non ha funzionato?',
      answer: (
        <div>
          <p>Questo non è un "semplice stretching". È un metodo strutturato che unisce:</p>
          <ul className="mt-2 space-y-1">
            <li>• esercizi posturali mirati</li>
            <li>• mobilità funzionale</li>
            <li>• rilascio delle tensioni profonde</li>
          </ul>
          <p className="mt-2">È progressivo, sostenibile e pensato per durare.</p>
        </div>
      )
    },
    {
      id: 'chronic-pain',
      question: 'Ho dolore cronico: posso seguire comunque il piano?',
      answer: (
        <div>
          <p>Sì. Ogni esercizio è pensato per essere eseguito in sicurezza, anche in caso di rigidità o dolori persistenti.</p>
          <p className="mt-2">Ti guideremo nell'adattare i movimenti al tuo livello attuale, senza stress o rischi.</p>
        </div>
      )
    },
    {
      id: 'time-constraints',
      question: 'E se ho poco tempo?',
      answer: (
        <div>
          <p>Abbiamo creato routine giornaliere che richiedono solo 5–10 minuti al giorno.</p>
          <p className="mt-2">Il piano si adatta a te, non il contrario.</p>
          <p className="mt-1">Meglio poco ma fatto bene, che niente.</p>
        </div>
      )
    }
  ];

  const handleSelectPlan = () => {
    setShowCheckoutDialog(true);
  };

  const handlePurchase = () => {
    console.log('Elaborazione acquisto...');
    navigate('/thank-you');
  };

  const PricingSection = ({ compact = false }) => (
    <div className={`${compact ? 'mb-8' : 'mb-12'} max-w-4xl mx-auto`}>
      {!compact && (
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-[#71b8bc] to-[#88c2aa] text-white px-6 py-2 rounded-full text-sm font-medium mb-4">
            ✨ Piano Personalizzato Pronto
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Il tuo piano personalizzato per la salute della schiena è pronto!
          </h1>
        </div>
      )}
      
      <RadioGroup 
        value={selectedPlan} 
        onValueChange={(value) => setSelectedPlan(value as 'trial' | 'monthly' | 'quarterly')}
        className="space-y-4"
      >
        {Object.entries(plans).map(([key, plan]) => (
          <div 
            key={key}
            className={`relative border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
              selectedPlan === key 
                ? 'border-[#71b8bc] bg-gradient-to-br from-[#71b8bc]/10 to-[#88c2aa]/5 shadow-xl' 
                : 'border-gray-200 hover:border-gray-300 hover:shadow-lg bg-white'
            }`}
          >
            {plan.popular && !compact && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-[#71b8bc] to-[#88c2aa] text-white px-6 py-2 rounded-full text-sm font-bold flex items-center shadow-lg">
                  <FontAwesomeIcon icon={faStar} className="mr-2" />
                  {plan.badge}
                </div>
              </div>
            )}
            
            <Label htmlFor={key} className="cursor-pointer flex items-center justify-between w-full">
              <div className="flex items-center">
                <RadioGroupItem value={key} id={key} className="mr-4" />
                <div className="flex items-center mr-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                    selectedPlan === key ? 'bg-[#71b8bc] text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <FontAwesomeIcon icon={plan.icon} className="text-lg" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{plan.title}</h3>
                    <p className="text-gray-600">{plan.billingText}</p>
                    {plan.popular && compact && (
                      <span className="inline-block bg-[#71b8bc] text-white px-2 py-1 rounded text-xs font-medium mt-1">
                        {plan.badge}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-[#71b8bc] mb-1">
                  €{plan.price}
                </div>
                <div className="text-sm text-gray-500 mb-2">{plan.period}</div>
                <div className="bg-gradient-to-r from-[#71b8bc] to-[#88c2aa] text-white px-3 py-1 rounded-full text-sm font-medium">
                  €{plan.dailyPrice.toFixed(2)}/giorno
                </div>
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>

      <div className="text-center mt-8">
        <Button 
          onClick={handleSelectPlan} 
          className="bg-gradient-to-r from-[#71b8bc] to-[#88c2aa] hover:from-[#5a9599] hover:to-[#7bb198] text-white font-bold py-4 px-12 rounded-full text-lg shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          <FontAwesomeIcon icon={faRocket} className="mr-2" />
          OTTIENI IL TUO PIANO
        </Button>
      </div>

      <div className="text-center mt-6 text-sm text-gray-600 max-w-4xl mx-auto bg-gray-50 p-4 rounded-lg">
        <p>{disclaimers[selectedPlan]}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto p-4">
        {/* Before-After Comparison Section */}
        <BeforeAfterComparison />
        
        {/* Main Pricing Section */}
        <PricingSection />

        {/* Pay Safe & Secure Section */}
        <div className="text-center mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md mx-auto">
            <div className="flex items-center justify-center mb-4">
              <FontAwesomeIcon icon={faShieldAlt} className="text-green-500 mr-3 text-2xl" />
              <p className="font-bold text-lg">Pagamento Sicuro e Protetto</p>
            </div>
            <img 
              src="/lovable-uploads/da294585-2e35-4f7d-86d5-abed6dfc94b2.png" 
              alt="Metodi di pagamento accettati" 
              className="max-w-xs h-auto mx-auto"
            />
          </div>
        </div>

        {/* Objectives Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#71b8bc] to-[#88c2aa] bg-clip-text text-transparent">
              I NOSTRI OBIETTIVI PER IL TUO BENESSERE FISICO
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#71b8bc] to-[#88c2aa] mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Ti svegli con meno rigidità e più scioltezza nei movimenti",
              "Non vivi più giornate segnate dal mal di schiena o da fastidi continui",
              "Ti muovi con più fluidità, sicurezza e controllo",
              "Migliori la tua postura, anche quando lavori o stai seduto a lungo",
              "Recuperi energia fisica grazie a un corpo che si muove meglio",
              "Riscopri il piacere di fare gesti semplici senza dolore o sforzo"
            ].map((objective, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#71b8bc] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#71b8bc] to-[#88c2aa] rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <FontAwesomeIcon icon={faCheck} className="text-white text-sm" />
                  </div>
                  <p className="text-gray-700 font-medium">{objective}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics Section */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-[#71b8bc] to-[#88c2aa] rounded-3xl p-12 text-white text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              Persone come te hanno ottenuto risultati straordinari!
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { percentage: "83%", text: "degli utenti è riuscito a migliorare il proprio benessere dopo sole 6 settimane" },
                { percentage: "77%", text: "degli utenti hanno iniziato con dolori simili ai tuoi" },
                { percentage: "45%", text: "degli utenti soffre degli stessi problemi tuoi" }
              ].map((stat, index) => (
                <div key={index} className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="text-5xl font-bold mb-4">{stat.percentage}</div>
                  <p className="text-white/90">{stat.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Without Our Plan vs With Our Plan Sections */}
        <div className="mb-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Without Our Plan */}
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-center mb-8 text-red-800">
              Senza il nostro piano
            </h2>
            <div className="space-y-4">
              {[
                "Mal di schiena costante che rallenta le tue giornate",
                "Dolore o rigidità quando ti alzi dal letto o dalla sedia",
                "Tensione alle spalle e collo dopo ore davanti al PC",
                "Sensazione di blocco o fatica a fare anche movimenti semplici",
                "Rinunci a camminate o attività per paura del dolore",
                "Ti abitui al disagio fisico, pensando sia \"normale\""
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-lg p-4 flex items-start shadow-sm">
                  <FontAwesomeIcon icon={faCheck} className="text-red-500 mr-3 mt-1" />
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* With Our Plan */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-center mb-8 text-green-800">
              Con il nostro piano "Schiena Libera"
            </h2>
            <div className="space-y-4">
              {[
                "Meno dolore lombare, cervicale o dorsale già dopo pochi giorni",
                "Più mobilità e fluidità nei movimenti quotidiani",
                "Postura migliorata senza sforzi estremi o attrezzi",
                "Routine semplice da seguire anche con poco tempo",
                "Ritorno alla libertà di muoverti senza paura o limitazioni",
                "Sensazione di benessere fisico costante e naturale"
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-lg p-4 flex items-start shadow-sm">
                  <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-3 mt-1" />
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Second Pricing Section (Compact) */}
        <div className="mb-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
              Non aspettare oltre - inizia oggi stesso!
            </h2>
            <p className="text-gray-600 text-lg">Scegli il piano più adatto a te</p>
          </div>
          <PricingSection compact={true} />
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-[#71b8bc] to-[#88c2aa] bg-clip-text text-transparent">
            Le persone spesso chiedono:
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-4">
            {faqItems.map((faq) => (
              <Collapsible key={faq.id} open={openFAQ === faq.id} onOpenChange={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}>
                <CollapsibleTrigger className="w-full">
                  <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 cursor-pointer">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-left text-lg">{faq.question}</h3>
                      <ChevronDown className={`w-5 h-5 text-[#71b8bc] transition-transform duration-300 ${openFAQ === faq.id ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="bg-gray-50 rounded-xl p-6 mt-2 border-l-4 border-[#71b8bc]">
                    {faq.answer}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-[#71b8bc] to-[#88c2aa] bg-clip-text text-transparent">
            Gli utenti adorano il nostro piano "Schiena Libera"
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "Laura M., 45 anni",
                title: "Mi sveglio senza il solito blocco lombare",
                text: "Avevo dolori alla zona lombare da mesi, soprattutto al mattino. Dopo solo una settimana, riesco ad alzarmi dal letto senza fatica. Gli esercizi sono semplici, brevi e molto efficaci."
              },
              {
                name: "Marco R., 38 anni",
                title: "Finalmente riesco a stare seduto senza indolenzimenti",
                text: "Lavoro 8 ore al computer e avevo sempre collo e spalle rigidi. Il piano mi ha aiutato a migliorare la postura e a scaricare la tensione. Lo seguo ogni sera prima di cena."
              },
              {
                name: "Silvia T., 51 anni",
                title: "Non pensavo bastassero 10 minuti al giorno",
                text: "Ho provato mille cose, ma questa è l'unica che ho continuato. Niente attrezzi, niente stress. Inizio a sentirmi di nuovo libera nei movimenti."
              },
              {
                name: "Gianni B., 64 anni",
                title: "Sto ricominciando a camminare senza dolori",
                text: "Dopo anni di rigidità e fastidi alla schiena, riesco a camminare a lungo senza fermarmi. Questo piano mi ha dato più risultati di fisioterapie molto più costose."
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-xl p-8 border-l-4 border-[#71b8bc] hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex text-yellow-400 mb-4">
                  <Rating rating={5} />
                </div>
                <h3 className="font-bold mb-3 text-lg text-gray-800">"{testimonial.title}"</h3>
                <p className="text-sm text-[#71b8bc] mb-4 font-medium">{testimonial.name}</p>
                <p className="text-gray-700 leading-relaxed">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Money Back Guarantee */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 border-2 border-green-200">
            <div className="text-center mb-6">
              <div className="inline-block bg-green-500 text-white p-4 rounded-full mb-4">
                <FontAwesomeIcon icon={faShieldAlt} className="text-2xl" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-green-800">
                Garanzia Soddisfatti o Rimborsati – 30 Giorni
              </h2>
            </div>
            <div className="max-w-4xl mx-auto space-y-4 text-gray-700">
              <p className="text-lg">Siamo certi che il nostro piano ti aiuterà a ridurre tensioni, dolori e rigidità.</p>
              <p className="text-lg">Per questo, ti offriamo una garanzia di rimborso completa entro 30 giorni.</p>
              <div className="bg-white rounded-xl p-6 border-l-4 border-green-500">
                <p className="font-medium text-lg">
                  👉 Se seguirai il piano come indicato e non noterai alcun miglioramento fisico percepibile (meno dolore, più mobilità, miglior postura), potrai richiedere il rimborso senza spiegazioni complicate.
                </p>
              </div>
              <p className="text-center">📄 Consulta la nostra Politica di Rimborso per conoscere tutte le condizioni applicabili.</p>
            </div>
          </div>
        </div>

        {/* Payment Dialog */}
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
