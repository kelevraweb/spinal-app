
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CheckoutRequest {
  planType: 'trial' | 'monthly' | 'quarterly';
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

    // Get plan type from request body
    const { planType }: CheckoutRequest = await req.json();

    // Get authorization header
    const authHeader = req.headers.get("Authorization");
    let userId = null;
    let userEmail = "guest@example.com"; // Default for guest checkout

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const supabaseClient = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false }
    });

    // Verify if the user is authenticated
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      const { data } = await supabaseClient.auth.getUser(token);
      if (data?.user) {
        userId = data.user.id;
        userEmail = data.user.email || userEmail;
      }
    }

    // Configure Stripe
    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-10-16",
    });

    // Check if a Stripe customer record exists for this email
    const customers = await stripe.customers.list({ email: userEmail, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    } else {
      // Create a new customer if one doesn't exist
      const newCustomer = await stripe.customers.create({
        email: userEmail,
      });
      customerId = newCustomer.id;
    }

    // Define plan details based on planType with new pricing
    const planDetails = {
      trial: {
        price: 4999, // €49.99 in cents
        name: "Piano 7 giorni",
      },
      monthly: {
        price: 4999, // €49.99 in cents
        name: "Piano 30 giorni",
      },
      quarterly: {
        price: 9999, // €99.99 in cents
        name: "Piano 90 giorni",
      },
    };

    const selectedPlan = planDetails[planType];

    // Create a PaymentIntent for client-side payment collection
    const paymentIntent = await stripe.paymentIntents.create({
      amount: selectedPlan.price,
      currency: "eur",
      customer: customerId,
      description: `Pagamento per ${selectedPlan.name}`,
      metadata: {
        plan_type: planType,
      },
      // Enable the Payment Element
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Save order information to Supabase
    if (paymentIntent.id) {
      await supabaseClient.from("orders").insert({
        user_id: userId,
        stripe_session_id: paymentIntent.id,
        plan_type: planType,
        amount: selectedPlan.price,
        currency: "eur",
        status: "pending",
      });
    }

    // Return the client secret to the client
    return new Response(JSON.stringify({ 
      clientSecret: paymentIntent.client_secret,
      publishableKey: Deno.env.get("STRIPE_PUBLISHABLE_KEY")
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
