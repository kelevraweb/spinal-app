
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Hash the provided password
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const passwordHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // Check temp password
    const { data: tempPassword, error: tempError } = await supabase
      .from('temp_passwords')
      .select('*')
      .eq('email', email)
      .eq('password_hash', passwordHash)
      .eq('used', false)
      .gt('expires_at', new Date().toISOString())
      .single();

    if (tempError || !tempPassword) {
      throw new Error("Invalid or expired password");
    }

    // Mark password as used
    await supabase
      .from('temp_passwords')
      .update({ used: true })
      .eq('id', tempPassword.id);

    // Get subscription data from orders
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('*')
      .eq('user_email', email)
      .order('created_at', { ascending: false })
      .limit(1);

    if (ordersError) throw ordersError;

    let subscriptionData = null;
    if (orders && orders.length > 0) {
      subscriptionData = orders[0];
    } else {
      // Check in quiz_responses for user data
      const { data: quizData, error: quizError } = await supabase
        .from('quiz_responses')
        .select('*')
        .eq('user_email', email)
        .limit(1);

      if (quizError) throw quizError;

      if (quizData && quizData.length > 0) {
        subscriptionData = {
          plan_type: 'trial',
          status: 'completed',
          amount: 0,
          created_at: quizData[0].created_at,
          user_email: email,
          user_name: quizData[0].user_name
        };
      }
    }

    return new Response(JSON.stringify({ 
      success: true, 
      subscription: subscriptionData 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
