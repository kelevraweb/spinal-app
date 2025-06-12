
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
    const mapboxKey = Deno.env.get("MAPBOX_API_KEY");
    
    if (!mapboxKey) {
      throw new Error("MapBox API key not configured");
    }

    return new Response(JSON.stringify({ 
      apiKey: mapboxKey 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error getting MapBox key:", error);
    return new Response(JSON.stringify({ error: "Failed to get API key" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
