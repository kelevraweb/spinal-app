
import { useState, useEffect } from 'react';

interface LocationData {
  city: string;
  country: string;
  region: string;
}

export const useGeolocation = () => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLocation = async () => {
      try {
        // Usa un servizio gratuito per ottenere la posizione approssimativa
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        setLocation({
          city: data.city || 'Milano',
          country: data.country_name || 'Italia',
          region: data.region || 'Lombardia'
        });
      } catch (error) {
        console.log('Geolocation error:', error);
        // Fallback location
        setLocation({
          city: 'Milano',
          country: 'Italia',
          region: 'Lombardia'
        });
      } finally {
        setLoading(false);
      }
    };

    getLocation();
  }, []);

  return { location, loading };
};
