
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create Supabase client with service role key to read admin settings
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Get Stripe mode from admin settings
    const { data, error } = await supabase
      .from('admin_settings')
      .select('setting_value')
      .eq('setting_key', 'stripe_mode')
      .single();

    if (error) {
      console.error('Error fetching Stripe mode:', error);
      throw new Error('Failed to get Stripe configuration');
    }

    const isTestMode = data?.setting_value === 'test';
    
    // Get the appropriate publishable key
    const publishableKey = isTestMode 
      ? Deno.env.get("STRIPE_TEST_PUBLISHABLE_KEY")
      : Deno.env.get("STRIPE_PUBLISHABLE_KEY");

    if (!publishableKey) {
      throw new Error(`Missing ${isTestMode ? 'test' : 'live'} publishable key`);
    }

    console.log(`Returning ${isTestMode ? 'test' : 'live'} publishable key`);

    return new Response(
      JSON.stringify({ 
        publishableKey,
        mode: data?.setting_value || 'live'
      }), 
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error in get-stripe-config:', error);
    return new Response(
      JSON.stringify({ error: error.message }), 
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
