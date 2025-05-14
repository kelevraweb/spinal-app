
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { ChevronRight } from 'lucide-react';

interface TrustMapAnimationProps {
  worldMap?: boolean;
  onContinue?: () => void;
}

// Avatar images for world map locations 
const avatars = [
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&auto=format&fit=crop&q=60&crop=faces",
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&auto=format&fit=crop&q=60&crop=faces",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&auto=format&fit=crop&q=60&crop=faces",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&auto=format&fit=crop&q=60&crop=faces",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&auto=format&fit=crop&q=60&crop=faces",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&auto=format&fit=crop&q=60&crop=faces"
];

const worldMapPositions = [
  { x: '20%', y: '35%', delay: 0, name: 'Maria', country: 'USA' },    // North America
  { x: '40%', y: '30%', delay: 0.2, name: 'Marco', country: 'Italia' },  // Europe
  { x: '35%', y: '45%', delay: 0.4, name: 'Amara', country: 'Nigeria' },  // Africa
  { x: '60%', y: '40%', delay: 0.6, name: 'Jin', country: 'Giappone' },  // Asia
  { x: '75%', y: '60%', delay: 0.8, name: 'Sarah', country: 'Australia' },  // Australia
  { x: '30%', y: '60%', delay: 1.0, name: 'Carlos', country: 'Brasile' },  // South America
];

const TrustMapAnimation: React.FC<TrustMapAnimationProps> = ({ worldMap = false, onContinue }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    const timer2 = setTimeout(() => {
      setStep(2);
    }, 1500);

    const timer3 = setTimeout(() => {
      setStep(3);
    }, 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // Render world map version
  if (worldMap) {
    return (
      <div className={`max-w-2xl mx-auto my-10 px-4 pt-16 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <h2 className="text-2xl font-bold text-center mb-4">
          Il metodo è già utilizzato in tutto il mondo
        </h2>
        
        <p className="text-center mb-8 text-gray-600">
          Migliaia di persone stanno già beneficiando di questo approccio al benessere
        </p>
        
        <div className="relative w-full h-[400px] bg-[#f5f7fa] rounded-lg overflow-hidden shadow-lg mb-10">
          {/* World map background image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80')",
              filter: "brightness(0.9) saturate(1.2)",
              opacity: 0.9
            }}
          />
          
          {/* Semi-transparent overlay */}
          <div className="absolute inset-0 bg-blue-900/30" />
          
          {/* Animated user avatars */}
          {worldMapPositions.map((pin, index) => (
            <div 
              key={index}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
              style={{
                left: pin.x,
                top: pin.y,
                opacity: step >= 2 ? 1 : 0,
                transition: `opacity 0.5s ease ${pin.delay}s`,
              }}
            >
              <div className="relative">
                {/* Growing circle animation */}
                <div 
                  className="absolute inset-0 rounded-full"
                  style={{
                    animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
                    backgroundColor: 'rgba(239, 68, 68, 0.4)',
                    animationDelay: `${pin.delay}s`
                  }}
                />
                
                {/* Avatar image */}
                <div 
                  className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-lg transform transition-transform hover:scale-110"
                  style={{ zIndex: 5 }}
                >
                  <img 
                    src={avatars[index % avatars.length]} 
                    alt={`User ${index}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Name & country tooltip */}
                <div 
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white text-xs px-2 py-1 rounded shadow-md whitespace-nowrap"
                  style={{
                    opacity: step >= 3 ? 1 : 0,
                    transition: 'opacity 0.3s',
                    transitionDelay: `${pin.delay + 0.5}s`
                  }}
                >
                  <strong>{pin.name}</strong> • {pin.country}
                </div>
              </div>
            </div>
          ))}
          
          {/* Statistics counter */}
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-3 rounded-md shadow-lg">
            <div className="text-sm font-medium">Utenti attivi:</div>
            <div className="text-xl font-bold text-brand-primary">
              {step === 3 ? '12,482' : step === 2 ? '8,235' : '5,000+'}
            </div>
          </div>
        </div>
        
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="text-2xl font-bold text-brand-primary">87%</div>
            <div className="text-sm text-gray-600">Tasso di successo</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="text-2xl font-bold text-brand-primary">24</div>
            <div className="text-sm text-gray-600">Paesi</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="text-2xl font-bold text-brand-primary">4.8/5</div>
            <div className="text-sm text-gray-600">Valutazione media</div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Button 
            onClick={onContinue}
            size="lg" 
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Continua <ChevronRight className="ml-2" size={18} />
          </Button>
        </div>
      </div>
    );
  }

  // Original TrustMap content
  return (
    <div className={`max-w-2xl mx-auto my-10 px-4 pt-16 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Keep original TrustMapAnimation content */}
      <h2 className="text-2xl font-bold text-center mb-4">
        Verifica dell'affidabilità del metodo
      </h2>
      
      <p className="text-center mb-8 text-gray-600">
        Il metodo di benessere è stato validato da ricercatori ed esperti in psicologia
      </p>
      
      <div className="relative w-full h-[300px] bg-[#f5f7fa] rounded-lg overflow-hidden shadow-md flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4">
            <svg className="w-20 h-20 mx-auto text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          
          <h3 className="text-xl font-bold">
            Validato da esperti
          </h3>
          
          <p className="mt-2 text-gray-600 max-w-md mx-auto">
            Ogni step del percorso è basato su evidenze scientifiche e protocolli testati clinicamente
          </p>
        </div>
      </div>
      
      <div className="mt-8 flex justify-around">
        <div className="text-center">
          <div className="text-2xl font-bold text-brand-primary">97%</div>
          <div className="text-sm text-gray-600">Tasso di miglioramento</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-brand-primary">5+</div>
          <div className="text-sm text-gray-600">Anni di ricerca</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-brand-primary">10k+</div>
          <div className="text-sm text-gray-600">Partecipanti</div>
        </div>
      </div>

      <div className="mt-10 text-center">
        <Button 
          onClick={onContinue}
          size="lg" 
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          Continua <ChevronRight className="ml-2" size={18} />
        </Button>
      </div>
    </div>
  );
};

export default TrustMapAnimation;
