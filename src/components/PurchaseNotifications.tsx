
import React, { useState, useEffect } from 'react';

const PurchaseNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Array<{
    id: number;
    name: string;
    location: string;
    plan: string;
    timeAgo: string;
  }>>([]);

  const names = [
    "Marco R.", "Giulia S.", "Alessandro M.", "Francesca B.", "Luca T.", 
    "Elena C.", "Matteo F.", "Chiara L.", "Andrea P.", "Silvia G.",
    "Roberto V.", "Valentina N.", "Davide Z.", "Martina K.", "Simone Q.",
    "Laura A.", "Federico D.", "Giorgia M.", "Nicola W.", "Alessia J.",
    "Giovanni H.", "Sara Y.", "Fabio X.", "Michela U.", "Paolo I."
  ];

  const cities = [
    // Major cities
    "Milano", "Roma", "Napoli", "Torino", "Palermo", "Genova", "Bologna", "Firenze", "Bari", "Catania",
    "Venezia", "Verona", "Messina", "Padova", "Trieste", "Brescia", "Parma", "Taranto", "Prato", "Reggio Calabria",
    
    // Provincial capitals and important centers
    "Bergamo", "Vicenza", "Perugia", "Ancona", "La Spezia", "Rimini", "Salerno", "Sassari", "Monza", "Varese",
    "Como", "Lecco", "Cremona", "Mantova", "Pavia", "Sondrio", "Treviso", "Belluno", "Rovigo", "Udine",
    "Pordenone", "Gorizia", "Bolzano", "Trento", "Aosta", "Cuneo", "Asti", "Alessandria", "Novara", "Vercelli",
    "Biella", "Verbania", "Imperia", "Savona", "Piacenza", "Reggio Emilia", "Modena", "Ferrara", "Ravenna",
    "Forlì", "Cesena", "Pesaro", "Urbino", "Macerata", "Ascoli Piceno", "Fermo", "Terni", "Viterbo", "Rieti",
    "Latina", "Frosinone", "L'Aquila", "Teramo", "Pescara", "Chieti", "Campobasso", "Isernia", "Caserta",
    "Benevento", "Avellino", "Foggia", "Lecce", "Brindisi", "Potenza", "Matera", "Cosenza", "Catanzaro",
    "Reggio Calabria", "Crotone", "Vibo Valentia", "Trapani", "Agrigento", "Caltanissetta", "Enna", "Ragusa",
    "Siracusa", "Cagliari", "Nuoro", "Oristano", "Tempio Pausania",
    
    // Smaller towns and municipalities
    "Seregno", "Desio", "Lissone", "Cesano Maderno", "Limbiate", "Saronno", "Busto Arsizio", "Gallarate",
    "Rho", "Bollate", "Cinisello Balsamo", "Sesto San Giovanni", "Cologno Monzese", "Brugherio", "Vimercate",
    "Carate Brianza", "Giussano", "Mariano Comense", "Cantù", "Erba", "Menaggio", "Bellagio", "Lecco",
    "Merate", "Casatenovo", "Osnago", "Olgiate Comasco", "Luino", "Somma Lombardo", "Castellanza",
    "Legnano", "Magenta", "Abbiategrasso", "Corsico", "Buccinasco", "Trezzano sul Naviglio", "Rozzano",
    "Peschiera Borromeo", "San Donato Milanese", "Melegnano", "Lodi", "Codogno", "Casalpusterlengo",
    "Sant'Angelo Lodigiano", "Crema", "Treviglio", "Romano di Lombardia", "Dalmine", "Albino", "Nembro",
    "Alzano Lombardo", "Gazzaniga", "Ponte San Pietro", "Mapello", "Bonate Sopra", "Stezzano", "Osio Sotto"
  ];

  const plans = ["Piano Mensile", "Piano Trimestrale", "Piano Prova"];
  const timeOptions = ["2 minuti fa", "5 minuti fa", "8 minuti fa", "12 minuti fa", "15 minuti fa", "18 minuti fa"];

  const generateNotification = () => {
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    const randomPlan = plans[Math.floor(Math.random() * plans.length)];
    const randomTime = timeOptions[Math.floor(Math.random() * timeOptions.length)];
    
    return {
      id: Date.now() + Math.random(),
      name: randomName,
      location: randomCity,
      plan: randomPlan,
      timeAgo: randomTime
    };
  };

  useEffect(() => {
    // Generate initial notification
    const initialNotification = generateNotification();
    setNotifications([initialNotification]);

    // Set up interval for new notifications
    const interval = setInterval(() => {
      const newNotification = generateNotification();
      
      setNotifications(prev => {
        const updated = [newNotification, ...prev].slice(0, 5); // Keep only 5 latest
        return updated;
      });
    }, Math.random() * 8000 + 7000); // Random interval between 7-15 seconds

    return () => clearInterval(interval);
  }, []);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 space-y-3 max-w-sm">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 transform transition-all duration-500 ease-in-out animate-slide-in-left"
        >
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-400 rounded-full mt-2 animate-pulse"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                <span className="text-[#71b8bc] font-semibold">{notification.name}</span> da {notification.location}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Ha appena acquistato il <span className="font-medium">{notification.plan}</span>
              </p>
              <p className="text-xs text-gray-400 mt-1">{notification.timeAgo}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PurchaseNotifications;
