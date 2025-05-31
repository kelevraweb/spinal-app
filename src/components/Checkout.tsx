
import React, { useState, useEffect } from 'react';
import { useCheckout } from '@/hooks/use-checkout';
import { useToast } from '@/hooks/use-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faCreditCard } from '@fortawesome/free-solid-svg-icons';

interface CheckoutProps {
  onPurchase: () => void;
  selectedPlan?: 'trial' | 'monthly' | 'quarterly';
}

const Checkout: React.FC<CheckoutProps> = ({ onPurchase, selectedPlan = 'quarterly' }) => {
  const { initiateCheckout, isLoading } = useCheckout();
  const { toast } = useToast();
  
  const plans = {
    trial: {
      title: '7-DAY PLAN',
      price: 49.99,
      dailyPrice: 7.14,
      description: 'Setup fee + Monthly subscription (starts after 7 days)'
    },
    monthly: {
      title: '1-MONTH PLAN',
      price: 49.99,
      dailyPrice: 1.66,
      description: 'Monthly billing'
    },
    quarterly: {
      title: '3-MONTH PLAN',
      price: 99.99,
      dailyPrice: 1.11,
      description: 'Quarterly billing'
    }
  };

  const selectedPlanDetails = plans[selectedPlan];

  const handleCheckout = async () => {
    toast({
      title: "Reindirizzamento",
      description: "Ti stiamo reindirizzando a Stripe per completare il pagamento..."
    });
    
    const success = await initiateCheckout(selectedPlan);
    if (success) {
      onPurchase();
    }
  };

  return (
    <div>
      <div className="mb-6 bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Riepilogo ordine</h3>
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">{selectedPlanDetails.title}</p>
            <p className="text-sm text-gray-500">{selectedPlanDetails.description}</p>
            <p className="text-lg font-bold text-[#71b8bc]">€{selectedPlanDetails.dailyPrice.toFixed(2)} al giorno</p>
          </div>
          <p className="font-bold text-xl">€{selectedPlanDetails.price}</p>
        </div>
      </div>
      
      <button
        onClick={handleCheckout}
        disabled={isLoading}
        className={`w-full bg-[#71b8bc] text-white py-3 rounded-md font-medium ${
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
      
      <div className="flex justify-center mt-4">
        <img 
          src="/lovable-uploads/da294585-2e35-4f7d-86d5-abed6dfc94b2.png" 
          alt="Metodi di pagamento accettati: PayPal, Mastercard, Visa, American Express, Discover Network" 
          className="h-6 w-auto"
        />
      </div>
    </div>
  );
};

export default Checkout;
