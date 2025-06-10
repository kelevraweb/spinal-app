
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertDescription } from '@/components/ui/alert';

const TestModeWarning: React.FC = () => {
  const [stripeMode, setStripeMode] = useState<string>('live');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStripeMode = async () => {
      try {
        const { data, error } = await supabase
          .from('admin_settings')
          .select('setting_value')
          .eq('setting_key', 'stripe_mode')
          .single();

        if (error) throw error;
        if (data) setStripeMode(data.setting_value);
      } catch (error) {
        console.error('Error fetching Stripe mode:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStripeMode();
  }, []);

  if (loading || stripeMode !== 'test') {
    return null;
  }

  return (
    <Alert className="bg-orange-50 border-orange-200 text-orange-800 mb-4">
      <AlertDescription className="text-center">
        <div className="flex items-center justify-center space-x-2">
          <span className="text-xl">🧪</span>
          <span className="font-bold">
            MODALITÀ TEST ATTIVA - I pagamenti non sono reali
          </span>
        </div>
        <p className="text-xs mt-1 opacity-90">
          Solo per test. Usa carta 4242 4242 4242 4242 per simulare pagamenti.
        </p>
      </AlertDescription>
    </Alert>
  );
};

export default TestModeWarning;
