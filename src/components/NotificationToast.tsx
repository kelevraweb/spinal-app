
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Set MapBox access token
mapboxgl.accessToken = 'pk.eyJ1IjoibWV0b2RvLWltbW9iaWxpYXJlMjUiLCJhIjoiY21ibWk3d3l5MTZpYzJpcGo3bGJ3YXhkaiJ9.xaPgjWAvIGVqzQpEATlHXQ';

interface NotificationToastProps {
  name: string;
  city: string;
  plan: string;
  onClose: () => void;
  show: boolean;
}

const NotificationToast: React.FC<NotificationToastProps> = ({ 
  name, 
  city, 
  plan, 
  onClose, 
  show 
}) => {
  const [visible, setVisible] = useState(false);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (show) {
      // Fade in
      setTimeout(() => setVisible(true), 100);
      
      // Auto close after 8 seconds
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onClose, 300); // Wait for fade out
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  useEffect(() => {
    if (show && visible && mapContainer.current && !map.current) {
      // Initialize mini map
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [9.1900, 45.4642], // Default to Milan coordinates
        zoom: 8,
        interactive: false
      });

      // Add marker for the city
      new mapboxgl.Marker({ color: '#ef4444' })
        .setLngLat([9.1900, 45.4642])
        .addTo(map.current);
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [show, visible]);

  if (!show) return null;

  return (
    <div className={`fixed z-50 transition-all duration-300 ${
      visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
    } 
    // Mobile: horizontal full width at bottom
    bottom-4 left-4 right-4 md:right-auto md:max-w-sm
    bg-white rounded-lg shadow-xl border-l-4 border-green-500 p-4`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <span className="text-lg mr-2">🎉</span>
            <h4 className="font-semibold text-gray-900 text-sm md:text-base">
              {name} ha iniziato un nuovo piano
            </h4>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center text-sm text-gray-600">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="w-3 h-3 mr-1 text-red-500" />
              <span>{city}</span>
            </div>
            <p className="text-xs md:text-sm text-gray-600">Piano: {plan}</p>
          </div>

          {/* Mini MapBox map */}
          <div className="mt-3 h-12 md:h-16 bg-gray-100 rounded-md overflow-hidden">
            <div ref={mapContainer} className="w-full h-full" />
          </div>
        </div>
        
        <button
          onClick={() => {
            setVisible(false);
            setTimeout(onClose, 300);
          }}
          className="ml-3 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
        >
          <FontAwesomeIcon icon={faTimes} className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

export default NotificationToast;
