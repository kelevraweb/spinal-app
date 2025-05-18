
import React, { useState } from 'react';
import { Rating } from './Rating';
import { useCheckout } from '@/hooks/use-checkout';
import { useToast } from '@/hooks/use-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faCheck, faShield, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

interface CheckoutProps {
  onPurchase: () => void;
  selectedPlan?: 'trial' | 'monthly' | 'quarterly';
}

const Checkout: React.FC<CheckoutProps> = ({ onPurchase, selectedPlan = 'monthly' }) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  const [showCheckoutDialog, setShowCheckoutDialog] = useState(false);
  const [activePlan, setActivePlan] = useState<'trial' | 'monthly' | 'quarterly'>(selectedPlan);
  
  const { initiateCheckout, isLoading } = useCheckout();
  const { toast } = useToast();
  
  const plans = {
    trial: {
      title: 'Prova',
      price: 0.99,
      period: 'settimana',
      duration: '7 giorni',
      billingText: 'Pagamento unico'
    },
    monthly: {
      title: 'Mensile',
      price: 7.99,
      period: 'mese',
      duration: '1 mese',
      billingText: 'Fatturazione mensile'
    },
    quarterly: {
      title: 'Trimestrale',
      price: 19.99,
      period: '3 mesi',
      duration: '3 mesi',
      billingText: 'Fatturazione trimestrale'
    }
  };

  const selectedPlanDetails = plans[activePlan];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Process the payment in-page instead of redirecting to Stripe
    toast({
      title: "Pagamento in elaborazione",
      description: "Stiamo processando il tuo pagamento..."
    });
    
    // Simulate payment processing
    setTimeout(() => {
      setShowCheckoutDialog(false);
      onPurchase();
    }, 1500);
  };

  const openCheckoutDialog = (plan: 'trial' | 'monthly' | 'quarterly') => {
    setActivePlan(plan);
    setShowCheckoutDialog(true);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 bg-white">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">Il tuo piano personalizzato per la salute della schiena è pronto!</h1>
      </div>

      {/* Pricing Table */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {/* Trial Plan */}
        <Card className="border-2 hover:shadow-lg transition-shadow">
          <CardHeader className="bg-gray-50">
            <CardTitle className="text-xl text-center">{plans.trial.title}</CardTitle>
            <div className="text-center">
              <span className="text-3xl font-bold">€{plans.trial.price}</span>
              <span className="text-sm">/{plans.trial.period}</span>
            </div>
            <p className="text-center text-sm text-gray-500">{plans.trial.billingText}</p>
            <p className="text-center text-sm">{plans.trial.duration}</p>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="space-y-2 mb-6">
              <li className="flex items-center"><FontAwesomeIcon icon={faCheck} className="text-green-500 mr-2" />Accesso completo per 7 giorni</li>
              <li className="flex items-center"><FontAwesomeIcon icon={faCheck} className="text-green-500 mr-2" />Esercizi personalizzati</li>
              <li className="flex items-center"><FontAwesomeIcon icon={faCheck} className="text-green-500 mr-2" />Supporto base</li>
            </ul>
            <Button onClick={() => openCheckoutDialog('trial')} className="w-full bg-brand-primary hover:bg-brand-primary/90">Seleziona</Button>
          </CardContent>
        </Card>

        {/* Monthly Plan */}
        <Card className="border-2 border-brand-primary hover:shadow-lg transition-shadow">
          <div className="bg-brand-primary text-white py-1 text-center text-sm font-medium">PIÙ POPOLARE</div>
          <CardHeader className="bg-gray-50">
            <CardTitle className="text-xl text-center">{plans.monthly.title}</CardTitle>
            <div className="text-center">
              <span className="text-3xl font-bold">€{plans.monthly.price}</span>
              <span className="text-sm">/{plans.monthly.period}</span>
            </div>
            <p className="text-center text-sm text-gray-500">{plans.monthly.billingText}</p>
            <p className="text-center text-sm">{plans.monthly.duration}</p>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="space-y-2 mb-6">
              <li className="flex items-center"><FontAwesomeIcon icon={faCheck} className="text-green-500 mr-2" />Accesso completo illimitato</li>
              <li className="flex items-center"><FontAwesomeIcon icon={faCheck} className="text-green-500 mr-2" />Esercizi personalizzati</li>
              <li className="flex items-center"><FontAwesomeIcon icon={faCheck} className="text-green-500 mr-2" />Supporto prioritario</li>
              <li className="flex items-center"><FontAwesomeIcon icon={faCheck} className="text-green-500 mr-2" />Progressi monitorati</li>
            </ul>
            <Button onClick={() => openCheckoutDialog('monthly')} className="w-full bg-brand-primary hover:bg-brand-primary/90">Seleziona</Button>
          </CardContent>
        </Card>

        {/* Quarterly Plan */}
        <Card className="border-2 hover:shadow-lg transition-shadow">
          <CardHeader className="bg-gray-50">
            <CardTitle className="text-xl text-center">{plans.quarterly.title}</CardTitle>
            <div className="text-center">
              <span className="text-3xl font-bold">€{plans.quarterly.price}</span>
              <span className="text-sm">/{plans.quarterly.period}</span>
            </div>
            <p className="text-center text-sm text-gray-500">{plans.quarterly.billingText}</p>
            <p className="text-center text-sm">{plans.quarterly.duration}</p>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="space-y-2 mb-6">
              <li className="flex items-center"><FontAwesomeIcon icon={faCheck} className="text-green-500 mr-2" />Accesso completo illimitato</li>
              <li className="flex items-center"><FontAwesomeIcon icon={faCheck} className="text-green-500 mr-2" />Esercizi personalizzati</li>
              <li className="flex items-center"><FontAwesomeIcon icon={faCheck} className="text-green-500 mr-2" />Supporto prioritario</li>
              <li className="flex items-center"><FontAwesomeIcon icon={faCheck} className="text-green-500 mr-2" />Progressi monitorati</li>
              <li className="flex items-center"><FontAwesomeIcon icon={faCheck} className="text-green-500 mr-2" />Risparmi il 17%</li>
            </ul>
            <Button onClick={() => openCheckoutDialog('quarterly')} className="w-full bg-brand-primary hover:bg-brand-primary/90">Seleziona</Button>
          </CardContent>
        </Card>
      </div>

      <div className="text-center mb-10 text-sm text-gray-600">
        <p>Cliccando su "Seleziona", accetti l'attivazione di un abbonamento con rinnovo automatico.</p>
        <p>Il primo mese ha un costo di €49,99, poi €49,99/mese (IVA inclusa).</p>
        <p>Puoi disdire in qualsiasi momento direttamente dall'app o scrivendo a:</p>
        <p className="font-medium">📧 support@xxx.com</p>
        <p>Consulta l'Informativa sull'abbonamento per tutti i dettagli.</p>
      </div>

      {/* Security Badge */}
      <div className="text-center mb-12">
        <p className="font-medium mb-2">Paga in modo sicuro e protetto</p>
        <div className="flex justify-center items-center gap-4">
          <div className="w-12 h-8 bg-gray-200 rounded"></div>
          <div className="w-12 h-8 bg-gray-200 rounded"></div>
          <div className="w-12 h-8 bg-gray-200 rounded"></div>
          <div className="w-12 h-8 bg-gray-200 rounded"></div>
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

      {/* Plan Selection Repeat */}
      <div className="mb-12">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-6">Il tuo piano personalizzato per la salute della schiena è pronto!</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Trial Plan */}
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="bg-gray-50">
              <CardTitle className="text-xl text-center">{plans.trial.title}</CardTitle>
              <div className="text-center">
                <span className="text-3xl font-bold">€{plans.trial.price}</span>
                <span className="text-sm">/{plans.trial.period}</span>
              </div>
              <p className="text-center text-sm text-gray-500">{plans.trial.billingText}</p>
              <p className="text-center text-sm">{plans.trial.duration}</p>
            </CardHeader>
            <CardContent className="pt-4">
              <Button onClick={() => openCheckoutDialog('trial')} className="w-full bg-brand-primary hover:bg-brand-primary/90">Seleziona</Button>
            </CardContent>
          </Card>

          {/* Monthly Plan */}
          <Card className="border-2 border-brand-primary hover:shadow-lg transition-shadow">
            <div className="bg-brand-primary text-white py-1 text-center text-sm font-medium">PIÙ POPOLARE</div>
            <CardHeader className="bg-gray-50">
              <CardTitle className="text-xl text-center">{plans.monthly.title}</CardTitle>
              <div className="text-center">
                <span className="text-3xl font-bold">€{plans.monthly.price}</span>
                <span className="text-sm">/{plans.monthly.period}</span>
              </div>
              <p className="text-center text-sm text-gray-500">{plans.monthly.billingText}</p>
              <p className="text-center text-sm">{plans.monthly.duration}</p>
            </CardHeader>
            <CardContent className="pt-4">
              <Button onClick={() => openCheckoutDialog('monthly')} className="w-full bg-brand-primary hover:bg-brand-primary/90">Seleziona</Button>
            </CardContent>
          </Card>

          {/* Quarterly Plan */}
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="bg-gray-50">
              <CardTitle className="text-xl text-center">{plans.quarterly.title}</CardTitle>
              <div className="text-center">
                <span className="text-3xl font-bold">€{plans.quarterly.price}</span>
                <span className="text-sm">/{plans.quarterly.period}</span>
              </div>
              <p className="text-center text-sm text-gray-500">{plans.quarterly.billingText}</p>
              <p className="text-center text-sm">{plans.quarterly.duration}</p>
            </CardHeader>
            <CardContent className="pt-4">
              <Button onClick={() => openCheckoutDialog('quarterly')} className="w-full bg-brand-primary hover:bg-brand-primary/90">Seleziona</Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center mb-6 text-sm text-gray-600">
          <p>Cliccando su "Ottieni il mio piano", accetti l'attivazione di un abbonamento con rinnovo automatico.</p>
          <p>Il primo mese ha un costo di €49,99, poi €49,99/mese (IVA inclusa).</p>
          <p>Puoi disdire in qualsiasi momento direttamente dall'app o scrivendo a:</p>
          <p className="font-medium">📧 support@xxx.com</p>
          <p>Consulta l'Informativa sull'abbonamento per tutti i dettagli.</p>
        </div>
        
        <div className="text-center mb-6">
          <p className="font-medium mb-2">Paga in modo sicuro e protetto</p>
          <div className="flex justify-center items-center gap-4">
            <div className="w-12 h-8 bg-gray-200 rounded"></div>
            <div className="w-12 h-8 bg-gray-200 rounded"></div>
            <div className="w-12 h-8 bg-gray-200 rounded"></div>
            <div className="w-12 h-8 bg-gray-200 rounded"></div>
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

      {/* Checkout Dialog */}
      <Dialog open={showCheckoutDialog} onOpenChange={setShowCheckoutDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Finalizza l'acquisto</DialogTitle>
          </DialogHeader>
          <div className="mb-6 bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Riepilogo ordine</h3>
            <div className="flex justify-between">
              <div>
                <p className="font-medium">{selectedPlanDetails.title}</p>
                <p className="text-sm text-gray-500">{selectedPlanDetails.billingText}</p>
                <p className="text-sm text-gray-500">{selectedPlanDetails.duration}</p>
              </div>
              <p className="font-bold">€{selectedPlanDetails.price}</p>
            </div>
          </div>
          
          {/* Payment Method Selection */}
          <div className="flex justify-center mb-6 space-x-4">
            <button
              className={`flex items-center py-2 px-4 rounded-lg ${
                paymentMethod === 'card' ? 'bg-[#71b8bc]/10 border-2 border-[#71b8bc]' : 'bg-gray-100'
              }`}
              onClick={() => setPaymentMethod('card')}
            >
              <FontAwesomeIcon icon={faCreditCard} className="mr-2" />
              Carta di Credito
            </button>
            
            <button
              className={`flex items-center py-2 px-4 rounded-lg ${
                paymentMethod === 'paypal' ? 'bg-[#71b8bc]/10 border-2 border-[#71b8bc]' : 'bg-gray-100'
              }`}
              onClick={() => setPaymentMethod('paypal')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M7 12h10"></path>
                <path d="M7 8h6"></path>
                <path d="M7 16h10"></path>
              </svg>
              PayPal
            </button>
          </div>
          
          {paymentMethod === 'card' ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Numero Carta
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#71b8bc]"
                  value={cardDetails.cardNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome sulla Carta
                </label>
                <input
                  type="text"
                  id="cardName"
                  name="cardName"
                  placeholder="Mario Rossi"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#71b8bc]"
                  value={cardDetails.cardName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="flex space-x-4 mb-4">
                <div className="flex-1">
                  <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Data Scadenza
                  </label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    placeholder="MM/AA"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#71b8bc]"
                    value={cardDetails.expiryDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="flex-1">
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    placeholder="123"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#71b8bc]"
                    value={cardDetails.cvv}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-[#71b8bc] text-white py-3 rounded-md font-medium mt-4 ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#5da0a4]'
                }`}
              >
                {isLoading ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                    ELABORAZIONE...
                  </>
                ) : `PAGA €${selectedPlanDetails.price}`}
              </button>
            </form>
          ) : (
            <div className="text-center py-6">
              <p className="mb-4">Sarai reindirizzato a PayPal per completare il pagamento.</p>
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`w-full bg-[#0070ba] text-white py-3 rounded-md font-medium ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#005ea6]'
                }`}
              >
                {isLoading ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                    ELABORAZIONE...
                  </>
                ) : `PAGA CON PAYPAL €${selectedPlanDetails.price}`}
              </button>
            </div>
          )}
          
          <div className="flex justify-center mt-4 space-x-2">
            <div className="w-8 h-5 bg-gray-200 rounded"></div>
            <div className="w-8 h-5 bg-gray-200 rounded"></div>
            <div className="w-8 h-5 bg-gray-200 rounded"></div>
            <div className="w-8 h-5 bg-gray-200 rounded"></div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Checkout;

