
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
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  
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
      onPurchase();
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto my-10 px-4 animate-fade-in pt-16">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
        Il tuo piano personalizzato è pronto!
      </h2>
      
      <div className="flex justify-center space-x-4 my-6">
        <div className="flex items-center">
          <span className="inline-flex items-center justify-center w-6 h-6 bg-[#88c2aa]/30 text-[#71b8bc] rounded-full mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <span>Accesso Istantaneo</span>
        </div>
        
        <div className="flex items-center">
          <span className="inline-flex items-center justify-center w-6 h-6 bg-[#88c2aa]/30 text-[#71b8bc] rounded-full mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <span>Pagamento Sicuro</span>
        </div>
      </div>
      
      {/* Benefits Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 my-8">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
            <div className="flex-shrink-0 h-10 w-10 mr-3 bg-[#71b8bc] bg-opacity-10 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#71b8bc]">
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
              className={`w-2 h-2 rounded-full ${activeTestimonial === idx ? 'bg-[#71b8bc]' : 'bg-gray-300'}`}
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
              ? 'border-[#71b8bc] bg-[#71b8bc]/10 shadow-lg transform -translate-y-1' 
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
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-1 mr-2 text-[#88c2aa]">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
          
          <button 
            className={`w-full mt-4 py-2 rounded-full text-sm font-medium
              ${selectedPlan === 'trial' 
                ? 'bg-[#71b8bc] text-white' 
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
              ? 'border-[#71b8bc] bg-[#71b8bc]/10 shadow-lg transform -translate-y-1' 
              : 'border-gray-200 hover:border-gray-300'
            }`}
          onClick={() => setSelectedPlan('monthly')}
        >
          {plans.monthly.mostPopular && (
            <div className="bg-[#71b8bc] text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-2">
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
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-1 mr-2 text-[#88c2aa]">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
          
          <button 
            className={`w-full mt-4 py-2 rounded-full text-sm font-medium
              ${selectedPlan === 'monthly' 
                ? 'bg-[#71b8bc] text-white' 
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
              ? 'border-[#71b8bc] bg-[#71b8bc]/10 shadow-lg transform -translate-y-1' 
              : 'border-gray-200 hover:border-gray-300'
            }`}
          onClick={() => setSelectedPlan('quarterly')}
        >
          {plans.quarterly.savings && (
            <div className="bg-[#88c2aa] text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-2">
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
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-1 mr-2 text-[#88c2aa]">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
          
          <button 
            className={`w-full mt-4 py-2 rounded-full text-sm font-medium
              ${selectedPlan === 'quarterly' 
                ? 'bg-[#71b8bc] text-white' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            onClick={() => setSelectedPlan('quarterly')}
          >
            Seleziona
          </button>
        </div>
      </div>
      
      {/* Payment Form */}
      <div className="mt-8 max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-100">
        <h3 className="text-xl font-bold mb-4">Dettagli di pagamento</h3>
        
        {/* Payment Method Selection */}
        <div className="flex justify-center mb-6 space-x-4">
          <button
            className={`flex items-center py-2 px-4 rounded-lg ${
              paymentMethod === 'card' ? 'bg-[#71b8bc]/10 border-2 border-[#71b8bc]' : 'bg-gray-100'
            }`}
            onClick={() => setPaymentMethod('card')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
              <line x1="1" y1="10" x2="23" y2="10"></line>
            </svg>
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
              {isLoading ? 'ELABORAZIONE...' : `PAGA €${plans[selectedPlan].price}`}
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
              {isLoading ? 'ELABORAZIONE...' : `PAGA CON PAYPAL €${plans[selectedPlan].price}`}
            </button>
          </div>
        )}
        
        <div className="flex justify-center mt-4 space-x-2">
          <div className="w-8 h-5 bg-gray-200 rounded"></div>
          <div className="w-8 h-5 bg-gray-200 rounded"></div>
          <div className="w-8 h-5 bg-gray-200 rounded"></div>
          <div className="w-8 h-5 bg-gray-200 rounded"></div>
        </div>
      </div>
      
      {/* Money Back Guarantee */}
      <div className="mt-16 border-2 border-[#88c2aa]/30 rounded-xl p-6 max-w-2xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center">
          <div className="mr-4 flex-shrink-0 mx-auto md:mx-0">
            <div className="w-16 h-16 bg-[#88c2aa]/20 rounded-full flex items-center justify-center mb-4 md:mb-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#71b8bc]">
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
