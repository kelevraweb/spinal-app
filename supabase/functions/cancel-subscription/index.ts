
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
    const { email } = await req.json();

    if (!email) {
      throw new Error("Email is required");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get order for this email
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('*')
      .eq('user_email', email)
      .eq('status', 'completed')
      .order('created_at', { ascending: false })
      .limit(1);

    if (ordersError) throw ordersError;

    if (!orders || orders.length === 0) {
      throw new Error("No active subscription found");
    }

    const order = orders[0];

    // Update order status to canceled in database
    const { error: updateError } = await supabase
      .from('orders')
      .update({ status: 'canceled' })
      .eq('id', order.id);

    if (updateError) throw updateError;

    // If Stripe is configured, also cancel in Stripe
    if (stripeSecretKey && order.stripe_session_id) {
      try {
        const stripe = new Stripe(stripeSecretKey, {
          apiVersion: "2023-10-16",
        });

        // Find customer by email
        const customers = await stripe.customers.list({ 
          email: email,
          limit: 1 
        });

        if (customers.data.length > 0) {
          const customer = customers.data[0];
          
          // List active subscriptions for this customer
          const subscriptions = await stripe.subscriptions.list({
            customer: customer.id,
            status: 'active',
            limit: 10
          });

          // Cancel all active subscriptions
          for (const subscription of subscriptions.data) {
            await stripe.subscriptions.cancel(subscription.id);
          }
        }
      } catch (stripeError) {
        console.error('Stripe cancellation error:', stripeError);
        // Continue even if Stripe fails, since we've canceled in our DB
      }
    }

    // Send cancellation confirmation email if Resend is configured
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (resendApiKey) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: 'SpinalApp <noreply@yourdomain.com>',
            to: [email],
            subject: 'Sottoscrizione cancellata - SpinalApp',
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #71b8bc;">Sottoscrizione Cancellata</h2>
                <p>Ciao,</p>
                <p>La tua sottoscrizione SpinalApp è stata cancellata con successo.</p>
                <p><strong>Dettagli:</strong></p>
                <ul>
                  <li>Piano: ${order.plan_type}</li>
                  <li>Data cancellazione: ${new Date().toLocaleDateString('it-IT')}</li>
                </ul>
                <p>Grazie per aver utilizzato SpinalApp. Se cambi idea, saremo sempre qui per aiutarti nel tuo percorso di benessere.</p>
                <br>
                <p>Cordiali saluti,<br>Il team SpinalApp</p>
              </div>
            `,
          }),
        });
      } catch (emailError) {
        console.error('Email sending error:', emailError);
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
