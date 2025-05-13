
import React, { useEffect, useState } from "react";

const worldMapPositions = [
  { x: 20, y: 20 }, // North America
  { x: 45, y: 30 }, // Europe
  { x: 70, y: 25 }, // Asia
  { x: 55, y: 60 }, // Africa
  { x: 25, y: 70 }, // South America
  { x: 85, y: 80 }, // Australia
  { x: 50, y: 40 }  // Middle East
];

const TrustMapAnimation: React.FC = () => {
  const [visiblePins, setVisiblePins] = useState<number[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setVisiblePins(prev => {
          if (prev.length >= worldMapPositions.length) {
            clearInterval(interval);
            return prev;
          }
          return [...prev, prev.length];
        });
      }, 500);

      return () => clearInterval(interval);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto my-8 animate-fade-in">
      <h2 className="text-2xl font-bold text-center mb-6">
        Join over <span className="text-brand-primary">1,000,000</span> people
      </h2>
      <p className="text-center mb-8 text-gray-600">
        Become part of a growing worldwide community and achieve your goals with us!
      </p>
      
      <div className="map-animation-container">
        <svg width="100%" height="100%" viewBox="0 0 100 100" className="map-bg">
          <pattern id="dotPattern" width="2" height="2" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.5" fill="#ccc" />
          </pattern>
          <path d="M10,20 Q30,10 50,20 T90,20 Q70,40 90,60 T70,80 Q50,90 30,80 T10,60 Q30,40 10,20" 
                fill="url(#dotPattern)" stroke="#ddd" strokeWidth="0.5" />
        </svg>
        
        {visiblePins.map((index) => (
          <div
            key={index}
            className="pin"
            style={{
              left: `${worldMapPositions[index].x}%`,
              top: `${worldMapPositions[index].y}%`,
            }}
          >
            <div className="relative">
              <span className="absolute w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center animate-bounce-slow">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </span>
              <span className="absolute w-12 h-12 bg-brand-primary rounded-full -left-3 -top-3 animate-ping-slow opacity-20"></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustMapAnimation;
