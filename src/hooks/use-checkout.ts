
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

type PlanType = 'trial' | 'monthly' | 'quarterly';

// Plan pricing mapping - updated to match the discounted prices
const PLAN_AMOUNTS = {
  trial: 10.50,
  monthly: 19.99,
  quarterly: 34.99
};

export function useCheckout() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const initiateCheckout = async (planType: PlanType) => {
    setIsLoading(true);
    
    try {
      const amount = PLAN_AMOUNTS[planType];
      
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planType,
          amount: Math.round(amount * 100) // Convert to cents
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const data = await response.json();
      return data.clientSecret;
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante il checkout. Riprova più tardi.",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    initiateCheckout,
    isLoading
  };
}
