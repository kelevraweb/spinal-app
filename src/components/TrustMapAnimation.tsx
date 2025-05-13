
import React, { useEffect, useState } from "react";

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

const TrustMapAnimation: React.FC = () => {
  const [visiblePins, setVisiblePins] = useState<number[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const visibilityTimer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setVisiblePins(prev => {
          if (prev.length >= worldMapPositions.length) {
            clearInterval(interval);
            return prev;
          }
          return [...prev, prev.length];
        });
      }, 400);

      return () => clearInterval(interval);
    }, 800);

    return () => {
      clearTimeout(timer);
      clearTimeout(visibilityTimer);
    };
  }, []);

  return (
    <div className={`w-full max-w-2xl mx-auto my-8 pt-16 px-4 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <h2 className="text-2xl font-bold text-center mb-3">
        Unisciti a oltre <span className="text-brand-primary">1.000.000</span> di persone
      </h2>
      <p className="text-center mb-8 text-gray-600">
        Persone da tutto il mondo stanno già usando questo metodo per trasformare la loro vita emotiva
      </p>
      
      <div className="relative w-full h-64 sm:h-80 bg-slate-50 rounded-xl overflow-hidden shadow-md">
        <div className="map-animation-container w-full h-full relative">
          <svg width="100%" height="100%" viewBox="0 0 100 100" className="map-bg absolute inset-0">
            {/* Continenti stilizzati */}
            <path d="M10,20 Q30,10 50,20 T90,25 Q70,40 90,60 T70,80 Q50,90 30,80 T10,60 Q30,40 10,20" 
                  fill="#f0f4f8" stroke="#d1dce5" strokeWidth="0.8" />
            
            {/* Linee di latitudine/longitudine */}
            <path d="M5,50 H95" stroke="#dce6f0" strokeWidth="0.3" strokeDasharray="1,1" />
            <path d="M50,5 V95" stroke="#dce6f0" strokeWidth="0.3" strokeDasharray="1,1" />
            
            {/* Nord America */}
            <path d="M15,15 Q25,20 20,30 T10,35 Q15,25 15,15" fill="#e2eaf2" />
            
            {/* Europa */}
            <path d="M45,25 Q55,20 60,25 T55,35 Q45,35 45,25" fill="#e2eaf2" />
            
            {/* Asia */}
            <path d="M65,20 Q80,25 85,35 T75,45 Q65,35 65,20" fill="#e2eaf2" />
            
            {/* Africa */}
            <path d="M45,40 Q60,45 55,60 T40,55 Q45,45 45,40" fill="#e2eaf2" />
            
            {/* Sud America */}
            <path d="M25,55 Q35,60 30,75 T20,70 Q25,60 25,55" fill="#e2eaf2" />
            
            {/* Australia */}
            <path d="M75,65 Q85,70 80,80 T70,75 Q75,65 75,65" fill="#e2eaf2" />
          </svg>
          
          {visiblePins.map((index) => (
            <div
              key={index}
              className="pin absolute"
              style={{
                left: `${worldMapPositions[index].x}%`,
                top: `${worldMapPositions[index].y}%`,
                transition: 'opacity 0.5s ease-in-out',
              }}
            >
              <div className="relative">
                <span className="absolute w-5 h-5 bg-brand-primary rounded-full flex items-center justify-center animate-bounce-slow text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </span>
                <span className="absolute w-12 h-12 bg-brand-primary rounded-full -left-3 -top-3 animate-ping-slow opacity-20"></span>
              </div>
            </div>
          ))}
          
          {/* Connessioni animate tra i pin */}
          <svg width="100%" height="100%" viewBox="0 0 100 100" className="connections absolute inset-0 pointer-events-none">
            {visiblePins.length > 1 && visiblePins.slice(0, -1).map((index, i) => {
              if (i % 2 !== 0) return null;
              const nextIndex = visiblePins[i + 1];
              if (!nextIndex) return null;
              
              return (
                <line 
                  key={`connection-${index}`}
                  x1={`${worldMapPositions[index].x}%`} 
                  y1={`${worldMapPositions[index].y}%`}
                  x2={`${worldMapPositions[nextIndex].x}%`}
                  y2={`${worldMapPositions[nextIndex].y}%`}
                  stroke="#3b82f680"
                  strokeWidth="0.5"
                  strokeDasharray="1,1"
                  className="animate-pulse-slow"
                />
              );
            })}
          </svg>
        </div>
      </div>
      
      <div className="flex justify-center mt-8">
        <div className="inline-flex items-center px-4 py-2 bg-brand-primary/10 text-brand-primary rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
          </svg>
          <span className="text-sm font-medium">Crescita continua in tutto il mondo</span>
        </div>
      </div>
    </div>
  );
};

export default TrustMapAnimation;
