
import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface FacebookConfig {
  pixelId: string;
}

interface PurchaseData {
  value: number;
  currency: string;
  content_ids?: string[];
  content_type?: string;
  plan_type?: string;
  email?: string;
  name?: string;
}

interface InitiateCheckoutData {
  value: number;
  currency: string;
  content_ids?: string[];
  plan_type?: string;
}

interface AddToCartData {
  value: number;
  currency: string;
  content_ids?: string[];
  plan_type?: string;
}

declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}

export const useSecureFacebookPixel = () => {
  const [config, setConfig] = useState<FacebookConfig | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadFacebookConfig = async () => {
      try {
        console.log('Loading Facebook config...');
        const { data, error } = await supabase.functions.invoke('get-facebook-config');
        
        if (error) {
          console.error('Error loading Facebook config:', error);
          setIsReady(false);
          return;
        }

        if (data?.pixelId) {
          console.log('Facebook Pixel ID loaded:', data.pixelId);
          setConfig({ pixelId: data.pixelId });
          
          if (!window.fbq) {
            (function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
              if (f.fbq) return;
              n = f.fbq = function(...args: any[]) {
                n.callMethod ? n.callMethod.apply(n, args) : n.queue.push(args);
              };
              if (!f._fbq) f._fbq = n;
              n.push = n;
              n.loaded = !0;
              n.version = '2.0';
              n.queue = [];
              t = b.createElement(e);
              t.async = !0;
              t.src = v;
              s = b.getElementsByTagName(e)[0];
              s.parentNode!.insertBefore(t, s);
            })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
            
            window.fbq('init', data.pixelId);
            window.fbq('track', 'PageView');
            console.log('FB Pixel Initialized and PageView tracked.');
          } else {
             window.fbq('init', data.pixelId);
             console.log('FB Pixel re-initialized.');
          }
          setIsReady(true);
        } else {
            console.error('Facebook Pixel ID not found in config.');
            setIsReady(false);
        }
      } catch (error) {
        console.error('Error in loadFacebookConfig:', error);
        setIsReady(false);
      }
    };

    loadFacebookConfig();
  }, []);

  const trackEvent = useCallback((eventName: string, parameters?: any) => {
    if (isReady && window.fbq) {
      console.log(`Tracking FB Event: ${eventName}`, parameters);
      window.fbq('track', eventName, parameters);
    } else {
        console.warn(`FB Pixel not ready, cannot track event: ${eventName}.`, { eventName, parameters });
    }
  }, [isReady]);

  const trackAddToCart = useCallback((data: AddToCartData) => {
    trackEvent('AddToCart', {
      value: data.value,
      currency: data.currency,
      content_ids: data.content_ids || [data.plan_type || 'unknown'],
      content_type: 'product'
    });
  }, [trackEvent]);

  const trackInitiateCheckout = useCallback((data: InitiateCheckoutData) => {
    trackEvent('InitiateCheckout', {
      value: data.value,
      currency: data.currency,
      content_ids: data.content_ids || [data.plan_type || 'unknown'],
      content_type: 'product'
    });
  }, [trackEvent]);
  
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

  const trackPurchase = useCallback(async (data: PurchaseData) => {
    // Client-side tracking
    trackEvent('Purchase', {
      value: data.value,
      currency: data.currency,
      content_ids: data.content_ids || [data.plan_type || 'unknown'],
      content_type: 'product'
    });

    // Server-side tracking via Conversions API
    try {
      console.log('Tracking Purchase with Conversions API:', { ...data, name: 'REDACTED', email: 'REDACTED' });
      const { error } = await supabase.functions.invoke('facebook-conversion', {
        body: {
            event_name: 'Purchase',
            event_time: Math.floor(Date.now() / 1000),
            user_data: {
              client_ip_address: await getClientIP(),
              client_user_agent: navigator.userAgent,
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
        throw new Error(`Conversions API error: ${error.message}`);
      }
      console.log('Conversions API tracking successful');
    } catch (error) {
      console.error('Conversions API tracking failed:', error);
    }
  }, [trackEvent]);

  return {
    isPixelReady: isReady,
    trackAddToCart,
    trackInitiateCheckout,
    trackPurchase,
  };
};
