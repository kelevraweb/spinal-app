
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
    const PIXEL_ID = '1282457903238969';
    const ACCESS_TOKEN = 'EAANlC14nHVkBOZCdxZBpXmVfgIMfjPJ598jhIJOoXOB8ZCKMCWCBDBHR94QhZCCt0U9qc2CdFltWxyWNJdPFCiTnMWp9ZCJnGTMmbr7GqZAhb2Bso0lkQHTPO0wrhx0HZCNk1S1FiZCPQ3A6RCfxMZA0AwUYHySwhaPDwJimprafs8UqZAHtZBOEydxUaeU2jdfxgZDZD';
    const TEST_EVENT_CODE = 'TEST25893';

    const eventData: ConversionEvent = await req.json();

    const conversionData = {
      data: [{
        event_name: eventData.event_name,
        event_time: eventData.event_time,
        user_data: eventData.user_data,
        custom_data: eventData.custom_data
      }],
      test_event_code: TEST_EVENT_CODE
    };

    const response = await fetch(`https://graph.facebook.com/v19.0/${PIXEL_ID}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...conversionData,
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
