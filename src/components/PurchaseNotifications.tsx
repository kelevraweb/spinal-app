import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface Notification {
  id: number;
  name: string;
  location: string;
  timeAgo: string;
  coordinates: [number, number];
}

const PurchaseNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const names = [
    "Marco R.", "Giulia S.", "Alessandro M.", "Francesca B.", "Luca T.", 
    "Elena C.", "Matteo F.", "Chiara L.", "Andrea P.", "Silvia G.",
    "Roberto V.", "Valentina N.", "Davide Z.", "Martina K.", "Simone Q.",
    "Laura A.", "Federico D.", "Giorgia M.", "Nicola W.", "Alessia J.",
    "Giovanni H.", "Sara Y.", "Fabio X.", "Michela U.", "Paolo I."
  ];

  const citiesWithCoordinates = [
    // Major cities
    { name: "Milano", coordinates: [9.1900, 45.4642] },
    { name: "Roma", coordinates: [12.4964, 41.9028] },
    { name: "Napoli", coordinates: [14.2681, 40.8518] },
    { name: "Torino", coordinates: [7.6869, 45.0703] },
    { name: "Palermo", coordinates: [13.3614, 38.1157] },
    { name: "Genova", coordinates: [8.9463, 44.4056] },
    { name: "Bologna", coordinates: [11.3426, 44.4949] },
    { name: "Firenze", coordinates: [11.2558, 43.7696] },
    { name: "Bari", coordinates: [16.8719, 41.1171] },
    { name: "Catania", coordinates: [15.0873, 37.5079] },
    { name: "Venezia", coordinates: [12.3155, 45.4408] },
    { name: "Verona", coordinates: [10.9916, 45.4384] },
    { name: "Messina", coordinates: [15.5518, 38.1938] },
    { name: "Padova", coordinates: [11.8767, 45.4064] },
    { name: "Trieste", coordinates: [13.7681, 45.6495] },
    { name: "Brescia", coordinates: [10.2113, 45.5416] },
    { name: "Parma", coordinates: [10.3279, 44.8015] },
    { name: "Prato", coordinates: [11.0948, 43.8777] },
    { name: "Bergamo", coordinates: [9.6699, 45.6983] },
    { name: "Vicenza", coordinates: [11.5444, 45.5455] },
    { name: "Perugia", coordinates: [12.3828, 43.1122] },
    { name: "Ancona", coordinates: [13.5188, 43.6158] },
    { name: "La Spezia", coordinates: [9.8186, 44.1024] },
    { name: "Rimini", coordinates: [12.5681, 44.0678] },
    { name: "Salerno", coordinates: [14.7681, 40.6824] },
    { name: "Sassari", coordinates: [8.5596, 40.7259] },
    { name: "Monza", coordinates: [9.2744, 45.5845] },
    { name: "Como", coordinates: [9.0832, 45.8081] },
    { name: "Lecco", coordinates: [9.3931, 45.8566] },
    { name: "Cremona", coordinates: [10.0227, 45.1335] },
    { name: "Mantova", coordinates: [10.7915, 45.1564] },
    { name: "Pavia", coordinates: [9.1585, 45.1847] },
    { name: "Treviso", coordinates: [12.2433, 45.6669] },
    { name: "Udine", coordinates: [13.2335, 46.0748] },
    { name: "Bolzano", coordinates: [11.3548, 46.4983] },
    { name: "Trento", coordinates: [11.1217, 46.0748] },
    { name: "Aosta", coordinates: [7.3156, 45.7373] }
  ];

  const timeOptions = ["2 minuti fa", "5 minuti fa", "8 minuti fa", "12 minuti fa", "15 minuti fa", "18 minuti fa"];

  const generateNotification = (): Notification => {
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomCity = citiesWithCoordinates[Math.floor(Math.random() * citiesWithCoordinates.length)];
    const randomTime = timeOptions[Math.floor(Math.random() * timeOptions.length)];
    
    return {
      id: Date.now() + Math.random(),
      name: randomName,
      location: randomCity.name,
      timeAgo: randomTime,
      coordinates: randomCity.coordinates as [number, number]
    };
  };

  const dismissNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  useEffect(() => {
    // Initial delay of 10 seconds before first notification
    const initialTimeout = setTimeout(() => {
      const initialNotification = generateNotification();
      setNotifications([initialNotification]);

      // Auto-dismiss after 7 seconds
      setTimeout(() => {
        setNotifications(prev => prev.filter(notif => notif.id !== initialNotification.id));
      }, 7000);
    }, 10000);

    // Set up interval for new notifications (15-25 seconds)
    const interval = setInterval(() => {
      const newNotification = generateNotification();
      
      setNotifications(prev => {
        // Keep only 3 most recent notifications
        const updated = [newNotification, ...prev].slice(0, 3);
        
        // Auto-dismiss the new notification after 7 seconds
        setTimeout(() => {
          setNotifications(current => current.filter(notif => notif.id !== newNotification.id));
        }, 7000);
        
        return updated;
      });
    }, Math.random() * 10000 + 15000); // 15-25 seconds

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const generateMapUrl = (coordinates: [number, number]) => {
    const [lng, lat] = coordinates;
    // Using your Mapbox API key and larger dimensions for better visibility
    const zoom = 8;
    return `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/pin-s+71b8bc(${lng},${lat})/${lng},${lat},${zoom}/80x60@2x?access_token=pk.eyJ1IjoibWV0b2RvLWltbW9iaWxpYXJlMjUiLCJhIjoiY21ibWk3d3l5MTZpYzJpcGo3bGJ3YXhkaiJ9.xaPgjWAvIGVqzQpEATlHXQ`;
  };

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 space-y-3 max-w-sm">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="bg-white border border-gray-200 rounded-xl shadow-lg p-4 transform transition-all duration-500 ease-in-out animate-slide-in-right"
        >
          <div className="flex items-start gap-3">
            {/* Content section - left side */}
            <div className="flex items-start space-x-3 flex-1 min-w-0">
              <div className="w-2 h-2 bg-green-400 rounded-full mt-2 animate-pulse flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  <span className="text-[#71b8bc] font-semibold">{notification.name}</span> da {notification.location}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Si è registrato/a a <span className="font-medium">Spinal</span>
                </p>
                <p className="text-xs text-gray-400 mt-1">{notification.timeAgo}</p>
              </div>
            </div>
            
            {/* Map section - right side */}
            <div className="flex-shrink-0">
              <div className="w-20 h-15 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                <img
                  src={generateMapUrl(notification.coordinates)}
                  alt={`Mappa di ${notification.location}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to a placeholder if map fails to load
                    e.currentTarget.src = `data:image/svg+xml,${encodeURIComponent(`
                      <svg width="80" height="60" xmlns="http://www.w3.org/2000/svg">
                        <rect width="80" height="60" fill="#e5f6f7"/>
                        <circle cx="40" cy="30" r="4" fill="#71b8bc"/>
                        <text x="40" y="45" text-anchor="middle" font-size="8" fill="#666">${notification.location}</text>
                      </svg>
                    `)}`;
                  }}
                />
              </div>
            </div>
            
            {/* Close button - top right */}
            <button
              onClick={() => dismissNotification(notification.id)}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 flex-shrink-0 -mt-1 -mr-1"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PurchaseNotifications;
