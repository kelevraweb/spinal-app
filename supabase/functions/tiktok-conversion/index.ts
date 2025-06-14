
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface TikTokEvent {
  event_name: string;
  event_time: number; // Unix timestamp
  user_data: {
    client_ip_address?: string;
    client_user_agent?: string;
    email?: string;
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
    const PIXEL_ID = Deno.env.get("TIKTOK_PIXEL_ID");
    const ACCESS_TOKEN = Deno.env.get("TIKTOK_ACCESS_TOKEN");
    const TEST_EVENT_CODE = Deno.env.get("TIKTOK_TEST_EVENT_CODE");

    if (!PIXEL_ID || !ACCESS_TOKEN) {
      throw new Error("TikTok Pixel ID or Access Token is not configured in environment variables.");
    }

    const eventData: TikTokEvent = await req.json();
    const event_id = crypto.randomUUID();

    const tiktokPayload: any = {
      pixel_code: PIXEL_ID,
      event: eventData.event_name,
      event_id: event_id,
      timestamp: new Date(eventData.event_time * 1000).toISOString(),
      context: {
        ip: eventData.user_data.client_ip_address,
        user_agent: eventData.user_data.client_user_agent,
      },
      properties: {
        value: eventData.custom_data.value,
        currency: eventData.custom_data.currency,
        contents: eventData.custom_data.content_ids.map(id => ({
          content_id: id,
          content_type: eventData.custom_data.content_type,
          quantity: 1,
          price: eventData.custom_data.value
        }))
      }
    };

    if (eventData.user_data.email) {
      tiktokPayload.user = {
        email: eventData.user_data.email
      };
    }
    
    if (TEST_EVENT_CODE) {
      tiktokPayload.test_event_code = TEST_EVENT_CODE;
    }

    const response = await fetch(`https://business-api.tiktok.com/open_api/v1.3/pixel/track/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': ACCESS_TOKEN,
      },
      body: JSON.stringify({
        ...tiktokPayload
      })
    });

    const result = await response.json();
    
    if (result.code !== 0) {
      throw new Error(`TikTok API error: ${JSON.stringify(result)}`);
    }

    return new Response(JSON.stringify({ success: true, result }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("TikTok Conversion API error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
