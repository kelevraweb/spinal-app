
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CheckoutRequest {
  planType: 'trial' | 'monthly' | 'quarterly';
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
      console.warn("Warning: Not using a test mode API key. For testing use a key that starts with 'sk_test_'");
    }

    // Get plan type and discount info from request body
    const { planType, isDiscounted }: CheckoutRequest = await req.json();

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

    // Define pricing logic based on discount and plan type
    const getPlanConfig = (planType: string, isDiscounted: boolean) => {
      if (isDiscounted) {
        switch (planType) {
          case 'trial':
            return {
              setupFee: 1050, // €10.50 in cents
              subscriptionPrice: 4999, // €49.99 monthly after trial
              trialDays: 7,
              name: "PIANO 7 GIORNI SCONTATO",
              description: "€10.50 subito + abbonamento mensile €49.99 dopo 7 giorni"
            };
          case 'monthly':
            return {
              setupFee: 1999, // €19.99 in cents
              subscriptionPrice: 4999, // €49.99 monthly after trial
              trialDays: 30,
              name: "PIANO 1 MESE SCONTATO",
              description: "€19.99 subito + abbonamento mensile €49.99 dopo 30 giorni"
            };
          case 'quarterly':
            return {
              setupFee: 3499, // €34.99 in cents
              subscriptionPrice: 9999, // €99.99 quarterly after trial
              trialDays: 90,
              name: "PIANO 3 MESI SCONTATO",
              description: "€34.99 subito + abbonamento trimestrale €99.99 dopo 90 giorni",
              intervalCount: 3
            };
          default:
            throw new Error("Invalid plan type");
        }
      } else {
        switch (planType) {
          case 'trial':
            return {
              setupFee: 4999, // €49.99 in cents
              subscriptionPrice: 4999, // €49.99 monthly after trial
              trialDays: 7,
              name: "PIANO 7 GIORNI",
              description: "€49.99 subito + abbonamento mensile €49.99 dopo 7 giorni"
            };
          case 'monthly':
            return {
              setupFee: 4999, // €49.99 in cents
              subscriptionPrice: 4999, // €49.99 monthly after trial
              trialDays: 30,
              name: "PIANO 1 MESE",
              description: "€49.99 subito + abbonamento mensile €49.99 dopo 30 giorni"
            };
          case 'quarterly':
            return {
              setupFee: 9999, // €99.99 in cents
              subscriptionPrice: 9999, // €99.99 quarterly after trial
              trialDays: 90,
              name: "PIANO 3 MESI",
              description: "€99.99 subito + abbonamento trimestrale €99.99 dopo 90 giorni",
              intervalCount: 3
            };
          default:
            throw new Error("Invalid plan type");
        }
      }
    };

    const planConfig = getPlanConfig(planType, isDiscounted);

    // Create checkout session with setup fee + subscription
    const sessionConfig: any = {
      customer: customerId,
      mode: "subscription",
      success_url: `${req.headers.get("origin")}/thank-you`,
      cancel_url: `${req.headers.get("origin")}/pricing${isDiscounted ? '-discounted' : ''}`,
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: { 
              name: planConfig.name,
              description: planConfig.description
            },
            unit_amount: planConfig.subscriptionPrice,
            recurring: {
              interval: planConfig.intervalCount ? "month" : (planType === 'quarterly' ? "month" : "month"),
              interval_count: planConfig.intervalCount || 1,
            },
          },
          quantity: 1,
        }
      ],
      subscription_data: {
        trial_period_days: planConfig.trialDays,
        metadata: {
          plan_type: planType,
          is_discounted: isDiscounted.toString(),
          setup_fee_paid: planConfig.setupFee.toString(),
        }
      },
      // Add setup fee as immediate payment
      invoice_creation: {
        enabled: true,
        invoice_data: {
          description: `Setup fee for ${planConfig.name}`,
          metadata: {
            plan_type: planType,
            is_setup_fee: "true"
          }
        }
      },
      payment_intent_data: {
        setup_future_usage: "off_session",
        metadata: {
          setup_fee: planConfig.setupFee.toString(),
          plan_type: planType
        }
      }
    };

    // For setup fee, we need to add it as a separate line item
    sessionConfig.line_items.unshift({
      price_data: {
        currency: "eur",
        product_data: { 
          name: `Setup Fee - ${planConfig.name}`,
          description: "Pagamento immediato"
        },
        unit_amount: planConfig.setupFee,
      },
      quantity: 1,
    });

    // Create the checkout session
    const session = await stripe.checkout.sessions.create(sessionConfig);

    // Save order information to Supabase
    if (session.id) {
      await supabaseClient.from("orders").insert({
        user_id: userId,
        stripe_session_id: session.id,
        plan_type: planType,
        amount: planConfig.setupFee,
        currency: "eur",
        status: "pending",
      });
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
