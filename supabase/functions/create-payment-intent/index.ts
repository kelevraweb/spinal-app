
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PaymentRequest {
  planType: 'trial' | 'monthly' | 'quarterly' | 'test';
  amount: number;
  email: string;
  firstName: string;
  lastName: string;
  isDiscounted: boolean;
  quizSessionId?: string;
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const supabaseClient = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false }
    });

    // Check Stripe mode from admin settings
    const { data: adminSetting } = await supabaseClient
      .from('admin_settings')
      .select('setting_value')
      .eq('setting_key', 'stripe_mode')
      .single();

    const isTestMode = adminSetting?.setting_value === 'test';
    
    let stripeKey: string;
    if (isTestMode) {
      stripeKey = Deno.env.get("STRIPE_TEST_SECRET_KEY") || Deno.env.get("STRIPE_SECRET_KEY") || "";
    } else {
      stripeKey = Deno.env.get("STRIPE_SECRET_KEY") || "";
    }
    
    if (!stripeKey) {
      throw new Error("STRIPE_SECRET_KEY is not configured");
    }

    console.log('Using Stripe mode:', isTestMode ? 'TEST' : 'LIVE');

    const { planType, amount, email, firstName, lastName, isDiscounted, quizSessionId }: PaymentRequest = await req.json();

    console.log('Processing payment intent for:', { planType, amount, email, isDiscounted, stripeMode: isTestMode ? 'TEST' : 'LIVE' });

    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-10-16",
    });

    const customers = await stripe.customers.list({ email: email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    } else {
      const newCustomer = await stripe.customers.create({
        email: email,
        name: `${firstName} ${lastName}`,
      });
      customerId = newCustomer.id;
    }

    let finalAmount = amount;
    let isZeroPayment = amount === 0;
    
    if (isZeroPayment && !isTestMode) {
      finalAmount = 50; // 50 cents minimum for live mode
      console.log('Converting €0 payment to €0.50 for live mode (Stripe minimum requirement)');
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: finalAmount,
      currency: 'eur',
      customer: customerId,
      metadata: {
        plan_type: planType,
        is_discounted: isDiscounted.toString(),
        customer_email: email,
        customer_name: `${firstName} ${lastName}`,
        stripe_mode: isTestMode ? 'test' : 'live',
        original_amount: amount.toString(),
        is_zero_payment: isZeroPayment.toString(),
        quiz_session_id: quizSessionId || ''
      },
      description: `${isTestMode ? '[TEST] ' : ''}${isZeroPayment ? '[€0 TRACKING] ' : ''}Starting fee for ${planType} plan - ${isDiscounted ? 'Discounted' : 'Regular'} pricing`,
      ...(isZeroPayment && isTestMode ? {
        confirm: true,
        payment_method: 'pm_card_visa',
        return_url: 'https://example.com'
      } : {})
    });

    // Store order in database with proper user tracking
    await supabaseClient.from("orders").insert({
      stripe_session_id: paymentIntent.id,
      plan_type: planType,
      amount: amount,
      currency: 'eur',
      status: "pending",
      user_email: email,
      quiz_session_id: quizSessionId,
      created_at: new Date().toISOString()
    });

    console.log('Payment intent created successfully:', paymentIntent.id, 'Amount:', finalAmount, 'Original:', amount);

    return new Response(JSON.stringify({ 
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      isZeroPayment: isZeroPayment,
      finalAmount: finalAmount
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Payment intent creation error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
