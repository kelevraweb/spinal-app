
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faStar } from '@fortawesome/free-solid-svg-icons';
import { Rating } from '@/components/Rating';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Checkout from '@/components/Checkout';
import BeforeAfterComparison from '@/components/BeforeAfterComparison';

const Pricing: React.FC = () => {
  const navigate = useNavigate();
  const [showCheckoutDialog, setShowCheckoutDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'trial' | 'monthly' | 'quarterly'>('monthly');

  const plans = {
    trial: {
      title: '7 giorni',
      price: 49.99,
      period: 'totale',
      duration: '7 giorni',
      dailyPrice: 7.14,
      billingText: 'Pagamento unico'
    },
    monthly: {
      title: '30 giorni',
      price: 49.99,
      period: 'totale',
      duration: '1 mese',
      dailyPrice: 1.66,
      billingText: 'Fatturazione mensile',
      popular: true
    },
    quarterly: {
      title: '90 giorni',
      price: 99.99,
      period: 'totale',
      duration: '3 mesi',
      dailyPrice: 1.11,
      billingText: 'Fatturazione trimestrale'
    }
  };

  const disclaimers = {
    trial: "Cliccando su 'Ottieni il Mio Piano', accetti una prova di 1 settimana a €49,99, che si convertirà in un abbonamento con rinnovo automatico a €49,99/mese se non annullato (prezzi IVA inclusa). Annulla tramite l'app o via email: support@theliven.com. Consulta la Politica di Abbonamento per i dettagli.",
    monthly: "Cliccando su 'Ottieni il Mio Piano', accetti il rinnovo automatico dell'abbonamento. Il primo mese costa €49,99, poi €49,99/mese (prezzi IVA inclusa). Annulla tramite l'app o via email: support@theliven.com. Consulta la Politica di Abbonamento per i dettagli.",
    quarterly: "Cliccando su 'Ottieni il Mio Piano', accetti il rinnovo automatico dell'abbonamento. I primi tre mesi costano €99,99, poi €99,99 ogni tre mesi (prezzi IVA inclusa). Annulla tramite l'app o via email: support@theliven.com. Consulta la Politica di Abbonamento per i dettagli."
  };

  const handleSelectPlan = () => {
    setShowCheckoutDialog(true);
  };

  const handlePurchase = () => {
    console.log('Elaborazione acquisto...');
    navigate('/thank-you');
  };

  return (
    <div className="max-w-5xl mx-auto p-4 bg-white">
      {/* Before-After Comparison Section */}
      <BeforeAfterComparison />
      
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">Il tuo piano personalizzato per la salute della schiena è pronto!</h1>
      </div>

      {/* New Pricing Section - Vertical Layout */}
      <div className="mb-8 max-w-2xl mx-auto">
        <RadioGroup 
          value={selectedPlan} 
          onValueChange={(value) => setSelectedPlan(value as 'trial' | 'monthly' | 'quarterly')}
          className="space-y-4"
        >
          {/* Trial Plan */}
          <div className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${
            selectedPlan === 'trial' ? 'border-[#71b8bc] bg-[#71b8bc]/5' : 'border-gray-200 hover:border-gray-300'
          }`}>
            <Label htmlFor="trial" className="cursor-pointer flex items-center justify-between w-full">
              <div className="flex items-center">
                <RadioGroupItem value="trial" id="trial" className="mr-4" />
                <div>
                  <h3 className="text-lg font-semibold">{plans.trial.title}</h3>
                  <p className="text-gray-600">€{plans.trial.price} {plans.trial.period}</p>
                </div>
              </div>
              <div className="bg-gray-100 px-4 py-2 rounded-lg">
                <div className="text-xl font-bold text-[#71b8bc]">
                  €{plans.trial.dailyPrice.toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">al giorno</div>
              </div>
            </Label>
          </div>

          {/* Monthly Plan - Most Popular */}
          <div className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${
            selectedPlan === 'monthly' ? 'border-[#71b8bc] bg-[#71b8bc]/5' : 'border-gray-200 hover:border-gray-300'
          }`}>
            {plans.monthly.popular && (
              <div className="absolute -top-3 left-4">
                <span className="bg-[#71b8bc] text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <FontAwesomeIcon icon={faStar} className="mr-1" />
                  PIÙ POPOLARE
                </span>
              </div>
            )}
            <Label htmlFor="monthly" className="cursor-pointer flex items-center justify-between w-full">
              <div className="flex items-center">
                <RadioGroupItem value="monthly" id="monthly" className="mr-4" />
                <div>
                  <h3 className="text-lg font-semibold">{plans.monthly.title}</h3>
                  <p className="text-gray-600">€{plans.monthly.price} {plans.monthly.period}</p>
                </div>
              </div>
              <div className="bg-gray-100 px-4 py-2 rounded-lg">
                <div className="text-xl font-bold text-[#71b8bc]">
                  €{plans.monthly.dailyPrice.toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">al giorno</div>
              </div>
            </Label>
          </div>

          {/* Quarterly Plan */}
          <div className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${
            selectedPlan === 'quarterly' ? 'border-[#71b8bc] bg-[#71b8bc]/5' : 'border-gray-200 hover:border-gray-300'
          }`}>
            <Label htmlFor="quarterly" className="cursor-pointer flex items-center justify-between w-full">
              <div className="flex items-center">
                <RadioGroupItem value="quarterly" id="quarterly" className="mr-4" />
                <div>
                  <h3 className="text-lg font-semibold">{plans.quarterly.title}</h3>
                  <p className="text-gray-600">€{plans.quarterly.price} {plans.quarterly.period}</p>
                </div>
              </div>
              <div className="bg-gray-100 px-4 py-2 rounded-lg">
                <div className="text-xl font-bold text-[#71b8bc]">
                  €{plans.quarterly.dailyPrice.toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">al giorno</div>
              </div>
            </Label>
          </div>
        </RadioGroup>

        {/* Single Checkout Button */}
        <div className="text-center mt-8">
          <Button 
            onClick={handleSelectPlan} 
            className="w-full md:w-auto px-12 py-4 text-lg bg-[#71b8bc] hover:bg-[#5a9599] text-white font-bold"
          >
            OTTIENI IL TUO PIANO
          </Button>
        </div>

        {/* Dynamic Disclaimer */}
        <div className="text-center mt-6 text-sm text-gray-600 max-w-4xl mx-auto">
          <p>{disclaimers[selectedPlan]}</p>
        </div>
      </div>

      {/* Pay Safe & Secure Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-2">
          <FontAwesomeIcon icon={faCheck} className="text-[#28a745] mr-2" />
          <p className="font-medium">Pay Safe & Secure</p>
        </div>
        <div className="flex justify-center items-center">
          <img 
            src="/lovable-uploads/da294585-2e35-4f7d-86d5-abed6dfc94b2.png" 
            alt="Metodi di pagamento accettati: PayPal, Mastercard, Visa, American Express, Discover Network" 
            className="max-w-xs h-auto"
          />
        </div>
      </div>

      {/* Objectives Section */}
      <div className="mb-12">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-6">I NOSTRI OBIETTIVI PER IL TUO BENESSERE FISICO</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg flex items-start">
            <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-3 mt-1" />
            <p>Ti svegli con meno rigidità e più scioltezza nei movimenti</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg flex items-start">
            <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-3 mt-1" />
            <p>Non vivi più giornate segnate dal mal di schiena o da fastidi continui</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg flex items-start">
            <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-3 mt-1" />
            <p>Ti muovi con più fluidità, sicurezza e controllo</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg flex items-start">
            <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-3 mt-1" />
            <p>Migliori la tua postura, anche quando lavori o stai seduto a lungo</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg flex items-start">
            <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-3 mt-1" />
            <p>Recuperi energia fisica grazie a un corpo che si muove meglio</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg flex items-start">
            <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-3 mt-1" />
            <p>Riscopri il piacere di fare gesti semplici senza dolore o sforzo</p>
          </div>
        </div>
      </div>

      {/* Methodology Section */}
      <div className="mb-12 text-center">
        <p className="mb-2">Il nostro programma si basa sulla metodologia</p>
        <p>Come descritto in</p>
        <div className="flex justify-center mt-4 space-x-4">
          <div className="w-16 h-8 bg-gray-200 rounded"></div>
          <div className="w-16 h-8 bg-gray-200 rounded"></div>
          <div className="w-16 h-8 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-center mb-6">Persone come te hanno ottenuto risultati straordinari grazie al nostro piano personalizzato di benessere posturale!</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-brand-primary mb-2">83%</div>
            <p>degli utenti è riuscito a migliorare il proprio benessere dopo sole 6 settimane</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-brand-primary mb-2">77%</div>
            <p>degli utenti hanno iniziato con dolori simili ai tuoi</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-brand-primary mb-2">45%</div>
            <p>degli utenti soffre degli stessi problemi tuoi</p>
          </div>
        </div>
      </div>

      {/* Without Our Plan Section */}
      <div className="mb-12">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-6">Come potrebbe essere la tua vita senza il nostro piano?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-red-50 p-4 rounded-lg flex items-start">
            <FontAwesomeIcon icon={faCheck} className="text-red-500 mr-3 mt-1" />
            <p>Mal di schiena costante che rallenta le tue giornate</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg flex items-start">
            <FontAwesomeIcon icon={faCheck} className="text-red-500 mr-3 mt-1" />
            <p>Dolore o rigidità quando ti alzi dal letto o dalla sedia</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg flex items-start">
            <FontAwesomeIcon icon={faCheck} className="text-red-500 mr-3 mt-1" />
            <p>Tensione alle spalle e collo dopo ore davanti al PC</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg flex items-start">
            <FontAwesomeIcon icon={faCheck} className="text-red-500 mr-3 mt-1" />
            <p>Sensazione di blocco o fatica a fare anche movimenti semplici</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg flex items-start">
            <FontAwesomeIcon icon={faCheck} className="text-red-500 mr-3 mt-1" />
            <p>Rinunci a camminate o attività per paura del dolore</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg flex items-start">
            <FontAwesomeIcon icon={faCheck} className="text-red-500 mr-3 mt-1" />
            <p>Ti abitui al disagio fisico, pensando sia "normale"</p>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mb-12">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-6">In cosa può aiutarti il nostro piano "Schiena Libera"</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 p-4 rounded-lg flex items-start">
            <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-3 mt-1" />
            <p>Meno dolore lombare, cervicale o dorsale già dopo pochi giorni</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg flex items-start">
            <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-3 mt-1" />
            <p>Più mobilità e fluidità nei movimenti quotidiani</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg flex items-start">
            <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-3 mt-1" />
            <p>Postura migliorata senza sforzi estremi o attrezzi</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg flex items-start">
            <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-3 mt-1" />
            <p>Routine semplice da seguire anche con poco tempo</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg flex items-start">
            <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-3 mt-1" />
            <p>Ritorno alla libertà di muoverti senza paura o limitazioni</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg flex items-start">
            <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-3 mt-1" />
            <p>Sensazione di benessere fisico costante e naturale</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-12">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-6">Le persone spesso chiedono:</h2>
        
        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-bold mb-2">E se non riesco a essere costante con gli esercizi?</h3>
            <p>Il nostro piano è studiato per persone impegnate o poco costanti:</p>
            <ul className="mt-2">
              <li className="flex items-start mb-1">
                <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-2 mt-1" /> 
                <span>routine brevi da 5 a 15 minuti</span>
              </li>
              <li className="flex items-start mb-1">
                <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-2 mt-1" /> 
                <span>video guidati passo passo</span>
              </li>
              <li className="flex items-start mb-1">
                <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-2 mt-1" /> 
                <span>reminder e supporto per aiutarti a non mollare</span>
              </li>
            </ul>
            <p className="mt-2">Non serve forza di volontà: serve solo iniziare.</p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-bold mb-2">E se ho già provato stretching o fisioterapia, ma non ha funzionato?</h3>
            <p>Questo non è un "semplice stretching". È un metodo strutturato che unisce:</p>
            <ul className="mt-2">
              <li>esercizi posturali mirati,</li>
              <li>mobilità funzionale,</li>
              <li>rilascio delle tensioni profonde.</li>
            </ul>
            <p className="mt-2">È progressivo, sostenibile e pensato per durare.</p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-bold mb-2">Ho dolore cronico: posso seguire comunque il piano?</h3>
            <p>Sì. Ogni esercizio è pensato per essere eseguito in sicurezza, anche in caso di rigidità o dolori persistenti.</p>
            <p>Ti guideremo nell'adattare i movimenti al tuo livello attuale, senza stress o rischi.</p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-bold mb-2">E se ho poco tempo?</h3>
            <p>Abbiamo creato routine giornaliere che richiedono solo 5–10 minuti al giorno.</p>
            <p>Il piano si adatta a te, non il contrario.</p>
            <p>Meglio poco ma fatto bene, che niente.</p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="mb-12">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-6">Gli utenti adorano il nostro piano "Schiena Libera"</h2>
        <p className="text-center mb-6">Ecco cosa raccontano le persone che lo hanno provato:</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border p-4 rounded-lg">
            <div className="flex text-yellow-400 mb-2">
              <Rating rating={5} />
            </div>
            <h3 className="font-bold mb-1">"Mi sveglio senza il solito blocco lombare"</h3>
            <p className="text-sm text-gray-500 mb-2">Laura M., 45 anni</p>
            <p>Avevo dolori alla zona lombare da mesi, soprattutto al mattino. Dopo solo una settimana, riesco ad alzarmi dal letto senza fatica. Gli esercizi sono semplici, brevi e molto efficaci.</p>
          </div>
          
          <div className="border p-4 rounded-lg">
            <div className="flex text-yellow-400 mb-2">
              <Rating rating={5} />
            </div>
            <h3 className="font-bold mb-1">"Finalmente riesco a stare seduto senza indolenzimenti"</h3>
            <p className="text-sm text-gray-500 mb-2">Marco R., 38 anni</p>
            <p>Lavoro 8 ore al computer e avevo sempre collo e spalle rigidi. Il piano mi ha aiutato a migliorare la postura e a scaricare la tensione. Lo seguo ogni sera prima di cena.</p>
          </div>
          
          <div className="border p-4 rounded-lg">
            <div className="flex text-yellow-400 mb-2">
              <Rating rating={5} />
            </div>
            <h3 className="font-bold mb-1">"Non pensavo bastassero 10 minuti al giorno"</h3>
            <p className="text-sm text-gray-500 mb-2">Silvia T., 51 anni</p>
            <p>Ho provato mille cose, ma questa è l'unica che ho continuato. Niente attrezzi, niente stress. Inizio a sentirmi di nuovo libera nei movimenti.</p>
          </div>
          
          <div className="border p-4 rounded-lg">
            <div className="flex text-yellow-400 mb-2">
              <Rating rating={5} />
            </div>
            <h3 className="font-bold mb-1">"Sto ricominciando a camminare senza dolori"</h3>
            <p className="text-sm text-gray-500 mb-2">Gianni B., 64 anni</p>
            <p>Dopo anni di rigidità e fastidi alla schiena, riesco a camminare a lungo senza fermarmi. Questo piano mi ha dato più risultati di fisioterapie molto più costose.</p>
          </div>
        </div>
      </div>

      {/* Money Back Guarantee */}
      <div className="mb-12 bg-green-50 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-3">Garanzia Soddisfatti o Rimborsati – 30 Giorni</h2>
        <p className="mb-3">Siamo certi che il nostro piano ti aiuterà a ridurre tensioni, dolori e rigidità.</p>
        <p className="mb-3">Per questo, ti offriamo una garanzia di rimborso completa entro 30 giorni.</p>
        <p className="mb-3"><span className="font-medium">👉 Se seguirai il piano come indicato e non noterai alcun miglioramento fisico percepibile (meno dolore, più mobilità, miglior postura), potrai richiedere il rimborso senza spiegazioni complicate.</span></p>
        <p>📄 Consulta la nostra Politica di Rimborso per conoscere tutte le condizioni applicabili.</p>
      </div>

      {/* Payment Dialog with ONLY the payment form */}
      <Dialog open={showCheckoutDialog} onOpenChange={setShowCheckoutDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Finalizza l'acquisto</DialogTitle>
          </DialogHeader>
          <Checkout onPurchase={handlePurchase} selectedPlan={selectedPlan} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Pricing;
