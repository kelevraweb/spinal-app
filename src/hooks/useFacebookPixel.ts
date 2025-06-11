
import { useEffect } from 'react';

interface PurchaseData {
  value: number;
  currency: string;
  content_ids?: string[];
  content_type?: string;
  plan_type?: string;
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
  }
}

export const useFacebookPixel = () => {
  const PIXEL_ID = '1282457903238969';
  const ACCESS_TOKEN = 'EAANlC14nHVkBOZCdxZBpXmVfgIMfjPJ598jhIJOoXOB8ZCKMCWCBDBHR94QhZCCt0U9qc2CdFltWxyWNJdPFCiTnMWp9ZCJnGTMmbr7GqZAhb2Bso0lkQHTPO0wrhx0HZCNk1S1FiZCPQ3A6RCfxMZA0AwUYHySwhaPDwJimprafs8UqZAHtZBOEydxUaeU2jdfxgZDZD';
  const TEST_EVENT_CODE = 'TEST25893';

  useEffect(() => {
    // Load Facebook Pixel
    if (typeof window !== 'undefined' && !window.fbq) {
      (function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
        if (f.fbq) return;
        n = f.fbq = function() {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
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

      window.fbq('init', PIXEL_ID, {}, {
        testEventCode: TEST_EVENT_CODE
      });
      window.fbq('track', 'PageView');
    }
  }, []);

  const trackAddToCart = (data: AddToCartData) => {
    if (typeof window !== 'undefined' && window.fbq) {
      console.log('Tracking AddToCart:', data);
      window.fbq('track', 'AddToCart', {
        value: data.value,
        currency: data.currency,
        content_ids: data.content_ids || [data.plan_type || 'unknown'],
        content_type: 'product'
      });
    }
  };

  const trackInitiateCheckout = (data: InitiateCheckoutData) => {
    if (typeof window !== 'undefined' && window.fbq) {
      console.log('Tracking InitiateCheckout:', data);
      window.fbq('track', 'InitiateCheckout', {
        value: data.value,
        currency: data.currency,
        content_ids: data.content_ids || [data.plan_type || 'unknown'],
        content_type: 'product'
      });
    }
  };

  const trackPurchase = async (data: PurchaseData) => {
    if (typeof window !== 'undefined' && window.fbq) {
      console.log('Tracking Purchase:', data);
      
      // Client-side tracking
      window.fbq('track', 'Purchase', {
        value: data.value,
        currency: data.currency,
        content_ids: data.content_ids || [data.plan_type || 'unknown'],
        content_type: 'product'
      });

      // Server-side tracking via Conversions API
      try {
        const response = await fetch('/api/facebook-conversion', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
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
          })
        });
        
        if (response.ok) {
          console.log('Conversions API tracking successful');
        }
      } catch (error) {
        console.error('Conversions API tracking failed:', error);
      }
    }
  };

  const getClientIP = async (): Promise<string> => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch {
      return '';
    }
  };

  return {
    trackAddToCart,
    trackInitiateCheckout,
    trackPurchase
  };
};
