
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

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

  if (!show) return null;

  return (
    <div className={`fixed bottom-4 left-4 max-w-sm bg-white rounded-lg shadow-xl border-l-4 border-green-500 p-4 z-50 transition-all duration-300 ${
      visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <span className="text-lg mr-2">🎉</span>
            <h4 className="font-semibold text-gray-900">Nuovo acquisto!</h4>
          </div>
          
          <div className="space-y-1">
            <p className="font-medium text-gray-800">{name}</p>
            <div className="flex items-center text-sm text-gray-600">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="w-3 h-3 mr-1 text-red-500" />
              <span>{city}</span>
            </div>
            <p className="text-sm text-gray-600">ha acquistato: {plan}</p>
          </div>

          {/* Mini mappa placeholder */}
          <div className="mt-3 h-16 bg-gray-100 rounded-md flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-green-200"></div>
            <div className="relative z-10 flex items-center text-xs text-gray-600">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="w-3 h-3 mr-1 text-red-500" />
              <span>{city}</span>
            </div>
          </div>
        </div>
        
        <button
          onClick={() => {
            setVisible(false);
            setTimeout(onClose, 300);
          }}
          className="ml-3 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <FontAwesomeIcon icon={faTimes} className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

export default NotificationToast;
