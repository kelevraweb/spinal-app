
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
    }

    // Define plan details based on planType
    const planDetails = {
      trial: {
        price: 99, // €0.99 in cents
        name: "Prova 7 giorni",
      },
      monthly: {
        price: 799, // €7.99 in cents
        name: "Piano Mensile",
      },
      quarterly: {
        price: 1999, // €19.99 in cents
        name: "Piano Trimestrale",
      },
    };

    const selectedPlan = planDetails[planType];

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : userEmail,
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: selectedPlan.name,
            },
            unit_amount: selectedPlan.price,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/thank-you`,
      cancel_url: `${req.headers.get("origin")}/quiz`,
    });

    // Save order information to Supabase
    if (session.id) {
      await supabaseClient.from("orders").insert({
        user_id: userId,
        stripe_session_id: session.id,
        plan_type: planType,
        amount: selectedPlan.price,
        currency: "eur",
        status: "pending",
      });
    }

    return new Response(JSON.stringify({ url: session.url }), {
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
