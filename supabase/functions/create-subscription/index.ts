
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SubscriptionRequest {
  planType: 'trial' | 'monthly' | 'quarterly';
  email: string;
  firstName: string;
  lastName: string;
  paymentMethodId: string;
  isDiscounted: boolean;
  setupPaymentIntentId: string;
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

    // Get subscription details from request body
    const { planType, email, firstName, lastName, paymentMethodId, isDiscounted, setupPaymentIntentId }: SubscriptionRequest = await req.json();

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

    // Attach the payment method to the customer
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customerId,
    });

    // Set as default payment method
    await stripe.customers.update(customerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    // Define pricing logic based on discount and plan type
    const getPlanConfig = (planType: string, isDiscounted: boolean) => {
      if (isDiscounted) {
        switch (planType) {
          case 'trial':
            return {
              subscriptionPrice: 4999, // €49.99 monthly after trial
              trialDays: 7,
              name: "PIANO 7 GIORNI SCONTATO",
              interval: "month" as const,
              intervalCount: 1
            };
          case 'monthly':
            return {
              subscriptionPrice: 4999, // €49.99 monthly after trial
              trialDays: 30,
              name: "PIANO 1 MESE SCONTATO",
              interval: "month" as const,
              intervalCount: 1
            };
          case 'quarterly':
            return {
              subscriptionPrice: 9999, // €99.99 quarterly after trial
              trialDays: 90,
              name: "PIANO 3 MESI SCONTATO",
              interval: "month" as const,
              intervalCount: 3
            };
          default:
            throw new Error("Invalid plan type");
        }
      } else {
        switch (planType) {
          case 'trial':
            return {
              subscriptionPrice: 4999, // €49.99 monthly after trial
              trialDays: 7,
              name: "PIANO 7 GIORNI",
              interval: "month" as const,
              intervalCount: 1
            };
          case 'monthly':
            return {
              subscriptionPrice: 4999, // €49.99 monthly after trial
              trialDays: 30,
              name: "PIANO 1 MESE",
              interval: "month" as const,
              intervalCount: 1
            };
          case 'quarterly':
            return {
              subscriptionPrice: 9999, // €99.99 quarterly after trial
              trialDays: 90,
              name: "PIANO 3 MESI",
              interval: "month" as const,
              intervalCount: 3
            };
          default:
            throw new Error("Invalid plan type");
        }
      }
    };

    const planConfig = getPlanConfig(planType, isDiscounted);

    // Create a price for the subscription
    const price = await stripe.prices.create({
      unit_amount: planConfig.subscriptionPrice,
      currency: 'eur',
      recurring: {
        interval: planConfig.interval,
        interval_count: planConfig.intervalCount,
      },
      product_data: {
        name: planConfig.name,
        description: `Abbonamento ${planConfig.name}`
      },
    });

    // Create the subscription with trial period
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: price.id }],
      trial_period_days: planConfig.trialDays,
      default_payment_method: paymentMethodId,
      metadata: {
        plan_type: planType,
        is_discounted: isDiscounted.toString(),
        setup_payment_intent: setupPaymentIntentId,
      },
    });

    // Update the order in Supabase with subscription info
    await supabaseClient.from("orders").update({
      stripe_session_id: subscription.id,
      status: "active",
      updated_at: new Date().toISOString()
    }).eq('stripe_session_id', setupPaymentIntentId);

    console.log('Subscription created successfully:', subscription.id);

    return new Response(JSON.stringify({ 
      subscriptionId: subscription.id,
      status: subscription.status,
      trialEnd: subscription.trial_end ? new Date(subscription.trial_end * 1000).toISOString() : null
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Subscription creation error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
