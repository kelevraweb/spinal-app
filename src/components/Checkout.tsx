
import React, { useState } from 'react';
import { useCheckout } from '@/hooks/use-checkout';
import { useToast } from '@/hooks/use-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faCreditCard } from '@fortawesome/free-solid-svg-icons';

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

  const selectedPlanDetails = plans[selectedPlan];

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
    <>
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
    </>
  );
};

export default Checkout;
