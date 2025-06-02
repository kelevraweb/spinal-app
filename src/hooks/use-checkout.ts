import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

// This hook is now deprecated in favor of embedded Stripe Elements
// Keeping for backward compatibility if needed

type PlanType = 'trial' | 'monthly' | 'quarterly';

export function useCheckout() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const initiateCheckout = async (planType: PlanType) => {
    setIsLoading(true);
    
    try {
      // This function is now replaced by embedded checkout
      // Redirecting to pricing page for now
      toast({
        title: "Informazione",
        description: "Il checkout è ora integrato nella pagina di pagamento.",
      });
      return false;
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante il checkout. Riprova più tardi.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    initiateCheckout,
    isLoading
  };
}
