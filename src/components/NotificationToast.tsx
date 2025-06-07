
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Set MapBox access token
mapboxgl.accessToken = 'pk.eyJ1IjoibWV0b2RvLWltbW9iaWxpYXJlMjUiLCJhIjoiY21ibWk3d3l5MTZpYzJpcGo3bGJ3YXhkaiJ9.xaPgjWAvIGVqzQpEATlHXQ';

// Mapping delle coordinate per le diverse città
const cityCoordinates: { [key: string]: [number, number] } = {
  // Italia
  'Milano': [9.1900, 45.4642],
  'Roma': [12.4964, 41.9028],
  'Napoli': [14.2681, 40.8518],
  'Torino': [7.6869, 45.0703],
  'Palermo': [13.3614, 38.1157],
  'Genova': [8.9463, 44.4056],
  'Bologna': [11.3426, 44.4949],
  'Firenze': [11.2558, 43.7696],
  'Catania': [15.0870, 37.5079],
  'Venezia': [12.3155, 45.4408],
  'Verona': [10.9916, 45.4384],
  'Messina': [15.5518, 38.1938],
  'Padova': [11.8767, 45.4064],
  'Trieste': [13.7681, 45.6495],
  'Brescia': [10.2113, 45.5416],
  'Parma': [10.3279, 44.8015],
  
  // Francia
  'Parigi': [2.3522, 48.8566],
  'Lione': [4.8357, 45.7640],
  'Marsiglia': [5.3698, 43.2965],
  'Nizza': [7.2619, 43.7102],
  'Tolosa': [1.4442, 43.6047],
  'Strasburgo': [7.7521, 48.5734],
  'Bordeaux': [-0.5792, 44.8378],
  'Lille': [3.0573, 50.6292],
  
  // Svizzera
  'Zurigo': [8.5417, 47.3769],
  'Ginevra': [6.1432, 46.2044],
  'Basilea': [7.5886, 47.5596],
  'Berna': [7.4474, 46.9480],
  'Losanna': [6.6323, 46.5197],
  'Lucerna': [8.3093, 47.0502],
  'San Gallo': [9.3767, 47.4245],
  
  // Austria
  'Vienna': [16.3738, 48.2082],
  'Salisburgo': [13.0550, 47.8095],
  'Innsbruck': [11.4041, 47.2692],
  'Graz': [15.4395, 47.0707],
  'Linz': [14.2858, 48.3069],
  'Klagenfurt': [14.3050, 46.6247],
  
  // Slovenia
  'Lubiana': [14.5058, 46.0569],
  'Maribor': [15.6459, 46.5547],
  'Celje': [15.2677, 46.2311],
  'Kranj': [14.3552, 46.2394],
  'Velenje': [15.1116, 46.3590],
  'Koper': [13.7301, 45.5469],
  
  // Germania (sud)
  'Monaco di Baviera': [11.5820, 48.1351],
  'Stoccarda': [9.1829, 48.7758],
  'Norimberga': [11.0767, 49.4521],
  'Augusta': [10.8978, 48.3705],
  'Ratisbona': [12.1016, 49.0134],
  'Würzburg': [9.9294, 49.7913]
};

interface NotificationToastProps {
  name: string;
  city: string;
  country: string;
  plan: string;
  onClose: () => void;
  show: boolean;
}

const NotificationToast: React.FC<NotificationToastProps> = ({ 
  name, 
  city, 
  country,
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
      // Get coordinates for the city, fallback to Milan
      const coordinates = cityCoordinates[city] || cityCoordinates['Milano'] || [9.1900, 45.4642];
      
      // Initialize mini map
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: coordinates,
        zoom: 8,
        interactive: false
      });

      // Add marker for the city
      new mapboxgl.Marker({ color: '#ef4444' })
        .setLngLat(coordinates)
        .addTo(map.current);
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [show, visible, city]);

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
              <span>{city}, {country}</span>
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
