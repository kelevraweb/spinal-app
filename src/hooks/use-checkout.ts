
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

type PlanType = 'trial' | 'monthly' | 'quarterly';

export function useCheckout() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const initiateCheckout = async (planType: PlanType) => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { planType },
      });
      
      if (error) throw new Error(error.message);
      if (!data?.url) throw new Error('No checkout URL returned');
      
      // Open Stripe checkout in a new tab
      window.open(data.url, '_blank');
      return true;
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
