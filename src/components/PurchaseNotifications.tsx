
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useGeolocation } from '@/hooks/useGeolocation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimes } from '@fortawesome/free-solid-svg-icons';

const italianNames = [
  'Marco', 'Giulia', 'Alessandro', 'Francesca', 'Luca', 'Chiara', 'Andrea', 'Valentina',
  'Matteo', 'Sara', 'Davide', 'Elisa', 'Simone', 'Martina', 'Lorenzo', 'Giorgia',
  'Stefano', 'Federica', 'Riccardo', 'Silvia', 'Michele', 'Elena', 'Fabio', 'Alessia'
];

const italianCities = [
  'Milano', 'Roma', 'Napoli', 'Torino', 'Palermo', 'Genova', 'Bologna', 'Firenze',
  'Catania', 'Venezia', 'Verona', 'Messina', 'Padova', 'Trieste', 'Brescia', 'Parma',
  'Modena', 'Reggio Calabria', 'Reggio Emilia', 'Perugia', 'Livorno', 'Cagliari'
];

const plans = ['Piano 7 Giorni', 'Piano 1 Mese', 'Piano 3 Mesi'];

interface PurchaseNotificationsProps {
  isActive: boolean;
}

const PurchaseNotifications: React.FC<PurchaseNotificationsProps> = ({ isActive }) => {
  const { toast } = useToast();
  const { location } = useGeolocation();
  const [notifications, setNotifications] = useState<string[]>([]);

  const generateNotification = () => {
    const name = italianNames[Math.floor(Math.random() * italianNames.length)];
    const plan = plans[Math.floor(Math.random() * plans.length)];
    
    // Usa la città dell'utente o una città casuale nelle vicinanze
    let city = location?.city || 'Milano';
    
    // Aggiungi varietà usando città vicine occasionalmente
    if (Math.random() < 0.3) {
      city = italianCities[Math.floor(Math.random() * italianCities.length)];
    }

    const notificationId = `notification-${Date.now()}`;
    setNotifications(prev => [...prev, notificationId]);

    toast({
      title: "🎉 Nuovo acquisto!",
      description: (
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">{name} da {city}</p>
            <p className="text-sm text-gray-600">ha appena acquistato: {plan}</p>
          </div>
          <button
            onClick={() => {
              setNotifications(prev => prev.filter(id => id !== notificationId));
            }}
            className="ml-3 text-gray-400 hover:text-gray-600"
          >
            <FontAwesomeIcon icon={faTimes} className="w-3 h-3" />
          </button>
        </div>
      ),
      duration: 8000,
    });

    // Rimuovi automaticamente dalla lista dopo il timeout
    setTimeout(() => {
      setNotifications(prev => prev.filter(id => id !== notificationId));
    }, 8000);
  };

  useEffect(() => {
    if (!isActive) return;

    // Prima notifica dopo 3-8 secondi
    const firstTimeout = setTimeout(() => {
      generateNotification();
    }, Math.random() * 5000 + 3000);

    // Notifiche successive ogni 15-45 secondi
    const interval = setInterval(() => {
      if (Math.random() < 0.7) { // 70% di probabilità
        generateNotification();
      }
    }, Math.random() * 30000 + 15000);

    return () => {
      clearTimeout(firstTimeout);
      clearInterval(interval);
    };
  }, [isActive, location]);

  return null;
};

export default PurchaseNotifications;
