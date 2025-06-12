
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const pixelId = Deno.env.get("FACEBOOK_PIXEL_ID");
    const accessToken = Deno.env.get("FACEBOOK_ACCESS_TOKEN");
    
    if (!pixelId || !accessToken) {
      throw new Error("Facebook configuration not complete");
    }

    return new Response(JSON.stringify({ 
      pixelId,
      accessToken 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error getting Facebook config:", error);
    return new Response(JSON.stringify({ error: "Failed to get Facebook configuration" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
