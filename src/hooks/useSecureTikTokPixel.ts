
import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface TikTokConfig {
  pixelId: string;
}

interface EventData {
  value: number;
  currency: string;
  content_ids?: string[];
  plan_type?: string;
  email?: string;
  name?: string;
}

declare global {
  interface Window {
    ttq: any;
  }
}

export const useSecureTikTokPixel = () => {
  const [config, setConfig] = useState<TikTokConfig | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadTikTokConfig = async () => {
      try {
        if (window.ttq) {
          console.log('TikTok Pixel already loaded.');
          // Even if loaded, we can fetch config to be sure
          const { data, error } = await supabase.functions.invoke('get-tiktok-config');
          if (error) throw error;
          if (data?.pixelId) {
            setConfig({ pixelId: data.pixelId });
            setIsReady(true);
            console.log('TikTok Pixel config loaded and ready.');
          }
        } else {
            console.warn('TikTok ttq object not found. Make sure the tracking script is in index.html');
            setIsReady(false);
        }
      } catch (error) {
        console.error('Error loading TikTok config:', error);
        setIsReady(false);
      }
    };

    loadTikTokConfig();
  }, []);

  const trackEvent = useCallback((eventName: string, parameters?: any) => {
    if (isReady && window.ttq) {
      console.log(`Tracking TikTok Event: ${eventName}`, parameters);
      window.ttq.track(eventName, parameters);
    } else {
        console.warn(`TikTok Pixel not ready, cannot track event: ${eventName}.`, { eventName, parameters });
    }
  }, [isReady]);

  const getClientIP = async (): Promise<string> => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      if (!response.ok) return '';
      const data = await response.json();
      return data.ip || '';
    } catch {
      return '';
    }
  };

  const trackPurchase = useCallback(async (data: EventData) => {
    const contents = (data.content_ids || [data.plan_type || 'unknown']).map(id => ({
        content_id: id,
        content_type: 'product',
        quantity: 1,
        price: data.value
    }));

    // Client-side tracking
    trackEvent('CompletePayment', {
      value: data.value,
      currency: data.currency,
      contents: contents,
    });

    // Server-side tracking via Events API
    try {
      console.log('Tracking TikTok Purchase with Events API:', { ...data, name: 'REDACTED', email: 'REDACTED' });
      const { error } = await supabase.functions.invoke('tiktok-conversion', {
        body: {
            event_name: 'CompletePayment',
            event_time: Math.floor(Date.now() / 1000),
            user_data: {
              client_ip_address: await getClientIP(),
              client_user_agent: navigator.userAgent,
              email: data.email,
            },
            custom_data: {
              value: data.value,
              currency: data.currency,
              content_ids: data.content_ids || [data.plan_type || 'unknown'],
              content_type: 'product'
            }
        }
      });
      
      if (error) {
        throw new Error(`TikTok Events API error: ${error.message}`);
      }
      console.log('TikTok Events API tracking successful');
    } catch (error) {
      console.error('TikTok Events API tracking failed:', error);
    }
  }, [trackEvent]);

  const trackInitiateCheckout = useCallback((data: EventData) => {
     const contents = (data.content_ids || [data.plan_type || 'unknown']).map(id => ({
        content_id: id,
        content_type: 'product',
        quantity: 1,
        price: data.value
    }));
    trackEvent('InitiateCheckout', {
        value: data.value,
        currency: data.currency,
        contents: contents,
    });
  }, [trackEvent]);

  return {
    isPixelReady: isReady,
    trackInitiateCheckout,
    trackPurchase,
  };
};
