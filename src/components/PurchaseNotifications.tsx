
import React, { useState, useEffect } from 'react';
import { useGeolocation } from '@/hooks/useGeolocation';
import NotificationToast from './NotificationToast';

// Nomi e città per diversi paesi europei
const europeanData = {
  italia: {
    names: ['Marco R.', 'Giulia B.', 'Alessandro T.', 'Francesca M.', 'Luca P.', 'Chiara S.', 
             'Andrea C.', 'Valentina L.', 'Matteo F.', 'Sara G.', 'Davide N.', 'Elisa V.',
             'Simone D.', 'Martina A.', 'Lorenzo H.', 'Giorgia R.', 'Stefano Q.', 'Federica Z.',
             'Riccardo E.', 'Silvia I.', 'Michele O.', 'Elena U.', 'Fabio W.', 'Alessia K.'],
    cities: ['Milano', 'Roma', 'Napoli', 'Torino', 'Palermo', 'Genova', 'Bologna', 'Firenze',
             'Catania', 'Venezia', 'Verona', 'Messina', 'Padova', 'Trieste', 'Brescia', 'Parma']
  },
  francia: {
    names: ['Pierre L.', 'Marie D.', 'Jean-Paul M.', 'Sophie R.', 'Antoine B.', 'Camille G.',
            'Nicolas T.', 'Emma C.', 'Julien V.', 'Léa S.', 'Thomas H.', 'Chloé P.',
            'Alexandre F.', 'Marine N.', 'Maxime Q.', 'Pauline Z.'],
    cities: ['Parigi', 'Lione', 'Marsiglia', 'Nizza', 'Tolosa', 'Strasburgo', 'Bordeaux', 'Lille']
  },
  svizzera: {
    names: ['Hans M.', 'Anna S.', 'Marco B.', 'Sarah L.', 'Peter W.', 'Lisa K.',
            'David R.', 'Elena F.', 'Michael T.', 'Julia H.', 'Stefan G.', 'Nicole P.'],
    cities: ['Zurigo', 'Ginevra', 'Basilea', 'Berna', 'Losanna', 'Lucerna', 'San Gallo']
  },
  austria: {
    names: ['Wolfgang A.', 'Ingrid H.', 'Klaus S.', 'Petra M.', 'Franz L.', 'Sabine R.',
            'Andreas W.', 'Martina K.', 'Georg F.', 'Daniela B.', 'Thomas G.', 'Barbara P.'],
    cities: ['Vienna', 'Salisburgo', 'Innsbruck', 'Graz', 'Linz', 'Klagenfurt']
  },
  slovenia: {
    names: ['Marko J.', 'Ana K.', 'Luka S.', 'Nina P.', 'Matej L.', 'Eva R.',
            'Jan M.', 'Sara T.', 'David H.', 'Maja F.', 'Miha G.', 'Tina B.'],
    cities: ['Lubiana', 'Maribor', 'Celje', 'Kranj', 'Velenje', 'Koper']
  },
  germania: {
    names: ['Hans M.', 'Greta S.', 'Klaus W.', 'Emma B.', 'Stefan L.', 'Anna K.',
            'Michael R.', 'Sophie F.', 'Thomas H.', 'Lisa G.', 'Andreas P.', 'Marie T.'],
    cities: ['Monaco di Baviera', 'Stoccarda', 'Norimberga', 'Augusta', 'Ratisbona', 'Würzburg']
  }
};

const plans = ['Piano 7 Giorni', 'Piano 1 Mese', 'Piano 3 Mesi'];

interface PurchaseNotificationsProps {
  isActive: boolean;
}

interface Notification {
  id: string;
  name: string;
  city: string;
  country: string;
  plan: string;
  show: boolean;
}

const PurchaseNotifications: React.FC<PurchaseNotificationsProps> = ({ isActive }) => {
  const { location } = useGeolocation();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const generateNotification = () => {
    const plan = plans[Math.floor(Math.random() * plans.length)];
    
    // Determina il paese base dall'utente (default Italia)
    const userCountry = location?.country?.toLowerCase().includes('ital') ? 'italia' : 'italia';
    
    // 60% probabilità di usare il paese dell'utente, 40% paesi limitrofi
    let selectedCountry;
    let countryName;
    
    if (Math.random() < 0.6) {
      selectedCountry = europeanData.italia;
      countryName = 'Italia';
    } else {
      // Scegli un paese limitrofo casuale
      const neighboringCountries = ['francia', 'svizzera', 'austria', 'slovenia', 'germania'];
      const randomCountry = neighboringCountries[Math.floor(Math.random() * neighboringCountries.length)];
      selectedCountry = europeanData[randomCountry];
      countryName = randomCountry.charAt(0).toUpperCase() + randomCountry.slice(1);
    }
    
    const name = selectedCountry.names[Math.floor(Math.random() * selectedCountry.names.length)];
    const city = selectedCountry.cities[Math.floor(Math.random() * selectedCountry.cities.length)];

    const notificationId = `notification-${Date.now()}`;
    
    const newNotification: Notification = {
      id: notificationId,
      name,
      city,
      country: countryName,
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
          country={notification.country}
          plan={notification.plan}
          show={notification.show}
          onClose={() => handleCloseNotification(notification.id)}
        />
      ))}
    </>
  );
};

export default PurchaseNotifications;
