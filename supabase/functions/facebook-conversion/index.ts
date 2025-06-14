
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ConversionEvent {
  event_name: string;
  event_time: number;
  user_data: {
    client_ip_address?: string;
    client_user_agent?: string;
  };
  custom_data: {
    value: number;
    currency: string;
    content_ids: string[];
    content_type: string;
  };
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const PIXEL_ID = Deno.env.get("FACEBOOK_PIXEL_ID");
    const ACCESS_TOKEN = Deno.env.get("FACEBOOK_ACCESS_TOKEN");
    const TEST_EVENT_CODE = Deno.env.get("FACEBOOK_TEST_EVENT_CODE");

    if (!PIXEL_ID || !ACCESS_TOKEN) {
      throw new Error("Facebook Pixel ID or Access Token is not configured in environment variables.");
    }

    const eventData: ConversionEvent = await req.json();

    const conversionPayload: any = {
      data: [{
        event_name: eventData.event_name,
        event_time: eventData.event_time,
        user_data: eventData.user_data,
        custom_data: eventData.custom_data
      }],
    };

    if (TEST_EVENT_CODE) {
      conversionPayload.test_event_code = TEST_EVENT_CODE;
    }

    const response = await fetch(`https://graph.facebook.com/v19.0/${PIXEL_ID}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...conversionPayload,
        access_token: ACCESS_TOKEN
      })
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(`Facebook API error: ${JSON.stringify(result)}`);
    }

    return new Response(JSON.stringify({ success: true, result }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Facebook Conversion API error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
