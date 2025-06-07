
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PaymentRequest {
  planType: 'trial' | 'monthly' | 'quarterly';
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
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      throw new Error("Missing STRIPE_SECRET_KEY");
    }
    
    // Verify that we're using test mode
    if (!stripeKey.startsWith('sk_test_')) {
      throw new Error("Invalid API key: Must use test mode key (starts with 'sk_test_')");
    }

    // Get payment details from request body
    const { planType, amount, email, firstName, lastName, isDiscounted }: PaymentRequest = await req.json();

    console.log('Processing payment intent for:', { planType, amount, email, isDiscounted });

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const supabaseClient = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false }
    });

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

    // Create payment intent for single payment
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'eur',
      customer: customerId,
      metadata: {
        plan_type: planType,
        is_discounted: isDiscounted.toString(),
        customer_email: email,
        customer_name: `${firstName} ${lastName}`
      },
      description: `Starting fee for ${planType} plan - ${isDiscounted ? 'Discounted' : 'Regular'} pricing`,
    });

    // Store order in database
    await supabaseClient.from("orders").insert({
      stripe_session_id: paymentIntent.id,
      plan_type: planType,
      amount: amount,
      currency: 'eur',
      status: "pending",
      created_at: new Date().toISOString()
    });

    console.log('Payment intent created successfully:', paymentIntent.id);

    return new Response(JSON.stringify({ 
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
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
