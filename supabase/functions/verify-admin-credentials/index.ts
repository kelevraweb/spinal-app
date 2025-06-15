
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Missing Supabase configuration");
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const { username, password } = await req.json();

    if (!username || !password) {
      throw new Error("Username and password are required");
    }

    // Verifica le credenziali dalla tabella admin_credentials
    const { data: credentials, error } = await supabase
      .from('admin_credentials')
      .select('*')
      .eq('username', username)
      .single();

    if (error || !credentials) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: "Invalid credentials" 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }

    // Verifica password (semplificata per ora)
    if (password !== 'Spinal2025!?') {
      return new Response(JSON.stringify({ 
        success: false, 
        error: "Invalid credentials" 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }

    return new Response(JSON.stringify({ 
      success: true,
      userId: credentials.user_profile_id,
      username: credentials.username
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Error verifying admin credentials:", error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: "Internal server error" 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
