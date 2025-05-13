import React, { useEffect, useState } from 'react';

interface TrustMapAnimationProps {
  worldMap?: boolean;
}

const worldMapPositions = [
  { x: 20, y: 20 }, // Nord America
  { x: 45, y: 30 }, // Europa
  { x: 70, y: 25 }, // Asia
  { x: 55, y: 60 }, // Africa
  { x: 25, y: 70 }, // Sud America
  { x: 85, y: 80 }, // Australia
  { x: 50, y: 40 }, // Medio Oriente
  { x: 35, y: 35 }, // Europa Meridionale
  { x: 60, y: 20 }, // Russia
  { x: 75, y: 40 }, // India
  { x: 80, y: 30 }, // Cina
];

const TrustMapAnimation: React.FC<TrustMapAnimationProps> = ({ worldMap = false }) => {
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

  // These are pixel locations for the pins on the world map
  const worldPins = [
    { x: '20%', y: '35%', delay: 0 },    // North America
    { x: '40%', y: '30%', delay: 0.2 },  // Europe
    { x: '35%', y: '45%', delay: 0.4 },  // Africa
    { x: '60%', y: '40%', delay: 0.6 },  // Asia
    { x: '75%', y: '60%', delay: 0.8 },  // Australia
    { x: '30%', y: '60%', delay: 1.0 },  // South America
    { x: '45%', y: '35%', delay: 1.2 },  // Southern Europe
    { x: '55%', y: '30%', delay: 1.4 },  // Russia
    { x: '65%', y: '35%', delay: 1.6 },  // East Asia
  ];

  // Render different content based on worldMap prop
  if (worldMap) {
    return (
      <div className={`max-w-2xl mx-auto my-10 px-4 pt-16 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <h2 className="text-2xl font-bold text-center mb-4">
          Il metodo è già utilizzato in tutto il mondo
        </h2>
        
        <p className="text-center mb-8 text-gray-600">
          Migliaia di persone stanno già beneficiando di questo approccio al benessere
        </p>
        
        <div className="relative w-full h-[300px] bg-[#f5f7fa] rounded-lg overflow-hidden shadow-md">
          {/* World map SVG or image */}
          <div className="absolute inset-0 bg-[url('https://fakeimg.pl/1200x600/f5f7fa/909090?text=World+Map')] bg-contain bg-center bg-no-repeat" />
          
          {/* Animated pins */}
          {worldPins.map((pin, index) => (
            <div 
              key={index}
              className="absolute w-3 h-3 rounded-full bg-red-500 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
              style={{
                left: pin.x,
                top: pin.y,
                opacity: step >= 2 ? 1 : 0,
                transition: `opacity 0.5s ease ${pin.delay}s`,
                boxShadow: '0 0 0 rgba(239, 68, 68, 0.4)',
                animation: 'pulse 1.5s infinite'
              }}
            >
              <span className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-red-500 animate-ping opacity-75"></span>
            </div>
          ))}
          
          {/* Stats counter */}
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-md shadow-lg">
            <div className="text-sm font-medium">Utenti attivi:</div>
            <div className="text-xl font-bold text-brand-primary">
              {step === 3 ? '12,482' : step === 2 ? '8,235' : '5,000+'}
            </div>
          </div>
        </div>
        
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <div className="text-xl font-bold text-brand-primary">87%</div>
            <div className="text-sm text-gray-600">Tasso di successo</div>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <div className="text-xl font-bold text-brand-primary">24</div>
            <div className="text-sm text-gray-600">Paesi</div>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <div className="text-xl font-bold text-brand-primary">4.8/5</div>
            <div className="text-sm text-gray-600">Valutazione media</div>
          </div>
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
    </div>
  );
};

export default TrustMapAnimation;
