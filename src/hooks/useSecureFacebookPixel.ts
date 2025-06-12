
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface FacebookConfig {
  pixelId: string;
  accessToken: string;
}

export const useSecureFacebookPixel = () => {
  const [config, setConfig] = useState<FacebookConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFacebookConfig = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('get-facebook-config');
        
        if (error) {
          console.error('Error loading Facebook config:', error);
          return;
        }

        if (data?.pixelId && data?.accessToken) {
          setConfig(data);
          
          // Initialize Facebook Pixel securely
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
              s.parentNode.insertBefore(t, s);
            })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

            window.fbq('init', data.pixelId);
            window.fbq('track', 'PageView');
          }
        }
      } catch (error) {
        console.error('Error loading Facebook configuration:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFacebookConfig();
  }, []);

  const trackEvent = (eventName: string, parameters?: any) => {
    if (config && window.fbq) {
      window.fbq('track', eventName, parameters);
    }
  };

  const trackCustomEvent = (eventName: string, parameters?: any) => {
    if (config && window.fbq) {
      window.fbq('trackCustom', eventName, parameters);
    }
  };

  const trackInitiateCheckout = (parameters?: any) => {
    trackEvent('InitiateCheckout', parameters);
  };

  const trackPurchase = (parameters?: any) => {
    trackEvent('Purchase', parameters);
  };

  return {
    isLoading,
    trackEvent,
    trackCustomEvent,
    trackInitiateCheckout,
    trackPurchase,
  };
};
