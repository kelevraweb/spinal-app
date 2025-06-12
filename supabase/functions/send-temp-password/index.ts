
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

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
    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check if user has any orders with this email
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('*')
      .eq('status', 'completed')
      .or(`user_email.eq.${email}`)
      .limit(1);

    if (ordersError) throw ordersError;

    // Also check in quiz_responses for user_email
    const { data: quizResponses, error: quizError } = await supabase
      .from('quiz_responses')
      .select('*')
      .eq('user_email', email)
      .limit(1);

    if (quizError) throw quizError;

    if ((!orders || orders.length === 0) && (!quizResponses || quizResponses.length === 0)) {
      throw new Error("No subscription found for this email");
    }

    // Generate a random 6-digit password
    const tempPassword = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Hash the password (simple hash for temporary use)
    const encoder = new TextEncoder();
    const data = encoder.encode(tempPassword);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const passwordHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // Store in temp_passwords table with 15 minutes expiration
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 15);

    // Clean up old passwords for this email first
    await supabase
      .from('temp_passwords')
      .delete()
      .eq('email', email);

    // Insert new temp password
    const { error: insertError } = await supabase
      .from('temp_passwords')
      .insert({
        email,
        password_hash: passwordHash,
        expires_at: expiresAt.toISOString(),
      });

    if (insertError) throw insertError;

    // Send email with password if Resend is configured
    if (resendApiKey) {
      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: 'SpinalApp <noreply@yourdomain.com>',
          to: [email],
          subject: 'Password temporanea per gestione piano - SpinalApp',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #71b8bc;">Password temporanea - SpinalApp</h2>
              <p>Ciao,</p>
              <p>Hai richiesto l'accesso alla gestione del tuo piano. Ecco la tua password temporanea:</p>
              <div style="background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 2px; margin: 20px 0;">
                ${tempPassword}
              </div>
              <p><strong>Importante:</strong></p>
              <ul>
                <li>Questa password scade tra 15 minuti</li>
                <li>Utilizzala per accedere alla gestione del tuo piano</li>
                <li>Non condividere questa password con nessuno</li>
              </ul>
              <p>Se non hai richiesto tu questa password, puoi ignorare questa email.</p>
              <br>
              <p>Cordiali saluti,<br>Il team SpinalApp</p>
            </div>
          `,
        }),
      });

      if (!emailResponse.ok) {
        console.error('Failed to send email:', await emailResponse.text());
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
