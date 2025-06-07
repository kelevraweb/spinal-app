
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CheckoutRequest {
  planType: 'trial' | 'monthly' | 'quarterly';
  userEmail?: string;
  userName?: string;
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
      console.warn("Warning: Not using a test mode API key. For testing use a key that starts with 'sk_test_'");
    }

    // Get plan type and user data from request body
    const { planType, userEmail, userName }: CheckoutRequest = await req.json();

    // Use quiz email or fallback to guest email
    const customerEmail = userEmail || "guest@example.com";

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
    const customers = await stripe.customers.list({ email: customerEmail, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      console.log("Found existing customer:", customerId);
    } else {
      // Create a new customer if one doesn't exist
      const newCustomer = await stripe.customers.create({
        email: customerEmail,
        name: userName,
        metadata: {
          source: 'quiz_flow',
          quiz_name: userName || 'Unknown',
        }
      });
      customerId = newCustomer.id;
      console.log("Created new customer:", customerId);
    }

    // Define plan details with correct discounted prices
    const planDetails = {
      trial: {
        price: 1050, // €10.50 in cents
        name: "7-DAY PLAN",
        mode: "subscription" as const,
        recurring: {
          interval: "month" as const,
        },
        trial_period_days: 7,
      },
      monthly: {
        price: 1999, // €19.99 in cents
        name: "1-MONTH PLAN",
        mode: "subscription" as const,
        recurring: {
          interval: "month" as const,
        },
      },
      quarterly: {
        price: 3499, // €34.99 in cents
        name: "3-MONTH PLAN",
        mode: "subscription" as const,
        recurring: {
          interval: "month" as const,
          interval_count: 3,
        },
      },
    };

    const selectedPlan = planDetails[planType];

    let sessionConfig: any = {
      customer: customerId,
      mode: selectedPlan.mode,
      success_url: `${req.headers.get("origin")}/thank-you?plan=${planType}&amount=${(selectedPlan.price / 100).toFixed(2)}&name=${encodeURIComponent(userName || '')}`,
      cancel_url: `${req.headers.get("origin")}/pricing-discounted?name=${encodeURIComponent(userName || '')}&email=${encodeURIComponent(userEmail || '')}`,
      metadata: {
        plan_type: planType,
        user_name: userName || 'Unknown',
        user_email: customerEmail,
        source: 'quiz_flow'
      }
    };

    // Configure line items and subscription data based on plan type
    sessionConfig.line_items = [
      {
        price_data: {
          currency: "eur",
          product_data: { 
            name: selectedPlan.name,
            description: planType === 'trial' ? 
              "7 giorni di prova + abbonamento mensile" :
              planType === 'monthly' ? 
                "Abbonamento mensile" : 
                "Abbonamento trimestrale"
          },
          unit_amount: selectedPlan.price,
          recurring: selectedPlan.recurring,
        },
        quantity: 1,
      }
    ];

    sessionConfig.subscription_data = {
      metadata: {
        plan_type: planType,
        user_name: userName || 'Unknown',
        user_email: customerEmail,
        source: 'quiz_flow'
      }
    };

    // Add trial period for trial plan
    if (planType === 'trial') {
      sessionConfig.subscription_data.trial_period_days = selectedPlan.trial_period_days;
    }

    console.log("Creating checkout session with config:", JSON.stringify(sessionConfig, null, 2));

    // Create the checkout session
    const session = await stripe.checkout.sessions.create(sessionConfig);

    console.log("Created checkout session:", session.id);

    // Save order information to Supabase
    if (session.id) {
      await supabaseClient.from("orders").insert({
        user_id: null, // Guest checkout
        stripe_session_id: session.id,
        plan_type: planType,
        amount: selectedPlan.price,
        currency: "eur",
        status: "pending",
        customer_email: customerEmail,
        customer_name: userName
      });
      console.log("Saved order to database");
    }

    // Return the session URL to redirect user to Stripe Checkout
    return new Response(JSON.stringify({ 
      url: session.url,
      sessionId: session.id
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
