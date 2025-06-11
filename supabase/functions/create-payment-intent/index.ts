
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
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client to check admin settings
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
    
    // Get the appropriate Stripe secret key
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
    console.log('Using Stripe key:', stripeKey.substring(0, 12) + '...');

    // Get payment details from request body
    const { planType, amount, email, firstName, lastName, isDiscounted }: PaymentRequest = await req.json();

    console.log('Processing payment intent for:', { planType, amount, email, isDiscounted, stripeMode: isTestMode ? 'TEST' : 'LIVE' });

    // Configure Stripe
    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-10-16",
    });

    // Check if a Stripe customer record exists for this email
    const customers = await stripe.customers.list({ email: email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    } else {
      // Create a new customer if one doesn't exist
      const newCustomer = await stripe.customers.create({
        email: email,
        name: `${firstName} ${lastName}`,
      });
      customerId = newCustomer.id;
    }

    // Handle €0 payments - Stripe requires minimum 1 cent in live mode
    // But in test mode, €0 is allowed
    let finalAmount = amount;
    let isZeroPayment = amount === 0;
    
    if (isZeroPayment && !isTestMode) {
      // In live mode, use minimum amount of 1 cent for tracking
      finalAmount = 1; // 1 cent
      console.log('Converting €0 payment to €0.01 for live mode tracking');
    }

    // Create payment intent for single payment
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
        original_amount: amount.toString(), // Store original amount
        is_zero_payment: isZeroPayment.toString()
      },
      description: `${isTestMode ? '[TEST] ' : ''}${isZeroPayment ? '[€0 TRACKING] ' : ''}Starting fee for ${planType} plan - ${isDiscounted ? 'Discounted' : 'Regular'} pricing`,
      // For €0 payments, we can set automatic payment methods
      ...(isZeroPayment && isTestMode ? {
        confirm: true,
        payment_method: 'pm_card_visa', // Auto-confirm for €0 in test mode
        return_url: 'https://example.com' // Required for auto-confirm
      } : {})
    });

    // Store order in database with original amount
    await supabaseClient.from("orders").insert({
      stripe_session_id: paymentIntent.id,
      plan_type: planType,
      amount: amount, // Store original amount (including 0)
      currency: 'eur',
      status: "pending",
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
