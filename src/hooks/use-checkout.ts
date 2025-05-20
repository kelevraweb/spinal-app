
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

type PlanType = 'trial' | 'monthly' | 'quarterly';

interface CheckoutData {
  clientSecret: string;
  publishableKey: string;
}

export function useCheckout() {
  const [isLoading, setIsLoading] = useState(false);
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);
  const { toast } = useToast();

  const initiateCheckout = async (planType: PlanType) => {
    setIsLoading(true);
    
    try {
      // Call the Supabase edge function to create a Stripe payment intent
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { planType },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.clientSecret && data?.publishableKey) {
        // Store the checkout data for use in the Stripe Elements
        setCheckoutData({
          clientSecret: data.clientSecret,
          publishableKey: data.publishableKey
        });
        return true;
      } else {
        throw new Error('No client secret or publishable key returned');
      }
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
    isLoading,
    checkoutData
  };
}
