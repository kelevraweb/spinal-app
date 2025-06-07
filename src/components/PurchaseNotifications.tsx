
import React, { useState, useEffect } from 'react';
import { useGeolocation } from '@/hooks/useGeolocation';
import NotificationToast from './NotificationToast';

const italianNamesWithLastInitials = [
  'Marco R.', 'Giulia B.', 'Alessandro T.', 'Francesca M.', 'Luca P.', 'Chiara S.', 
  'Andrea C.', 'Valentina L.', 'Matteo F.', 'Sara G.', 'Davide N.', 'Elisa V.',
  'Simone D.', 'Martina A.', 'Lorenzo H.', 'Giorgia R.', 'Stefano Q.', 'Federica Z.',
  'Riccardo E.', 'Silvia I.', 'Michele O.', 'Elena U.', 'Fabio W.', 'Alessia K.'
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

interface Notification {
  id: string;
  name: string;
  city: string;
  plan: string;
  show: boolean;
}

const PurchaseNotifications: React.FC<PurchaseNotificationsProps> = ({ isActive }) => {
  const { location } = useGeolocation();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const generateNotification = () => {
    const name = italianNamesWithLastInitials[Math.floor(Math.random() * italianNamesWithLastInitials.length)];
    const plan = plans[Math.floor(Math.random() * plans.length)];
    
    // Usa la città dell'utente o una città casuale nelle vicinanze
    let city = location?.city || 'Milano';
    
    // Aggiungi varietà usando città vicine occasionalmente
    if (Math.random() < 0.3) {
      city = italianCities[Math.floor(Math.random() * italianCities.length)];
    }

    const notificationId = `notification-${Date.now()}`;
    
    const newNotification: Notification = {
      id: notificationId,
      name,
      city,
      plan,
      show: true
    };

    setNotifications(prev => [...prev, newNotification]);
  };

  const handleCloseNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
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

  return (
    <>
      {notifications.map((notification) => (
        <NotificationToast
          key={notification.id}
          name={notification.name}
          city={notification.city}
          plan={notification.plan}
          show={notification.show}
          onClose={() => handleCloseNotification(notification.id)}
        />
      ))}
    </>
  );
};

export default PurchaseNotifications;
