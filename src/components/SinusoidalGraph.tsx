
import React, { useEffect, useState } from 'react';

const SinusoidalGraph: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activePoint, setActivePoint] = useState(0);
  const [pathLength, setPathLength] = useState(0);
  const [pathOffset, setPathOffset] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setPathOffset(0);
      
      const interval = setInterval(() => {
        setActivePoint(prev => {
          if (prev >= 3) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 1500);
      
      return () => clearInterval(interval);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVisible) {
      // Simulare l'animazione della linea
      const lineAnimation = setInterval(() => {
        setPathOffset(prev => {
          if (prev <= 0) {
            clearInterval(lineAnimation);
            return 0;
          }
          return prev - 10;
        });
      }, 20);
      
      return () => clearInterval(lineAnimation);
    }
  }, [isVisible]);

  const pointData = [
    { week: 'SETTIMANA 1', x: '15%', y: '80%', color: '#F7685B', label: 'Oggi', active: true },
    { week: 'SETTIMANA 2', x: '38%', y: '60%', color: '#F7685B' },
    { week: 'SETTIMANA 3', x: '62%', y: '35%', color: '#FFB129' },
    { week: 'SETTIMANA 4', x: '85%', y: '20%', color: '#47B881', label: 'Dopo LoveCoach' }
  ];
  
  return (
    <div className="max-w-2xl mx-auto my-12 px-4 pt-16">
      <h2 className="text-xl font-semibold text-center mb-4">Il tuo livello di benessere</h2>
      
      <div className="relative h-64 border-b border-gray-200 mb-6">
        {/* Vertical grid lines */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-100 h-full"></div>
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-gray-100 h-full"></div>
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-100 h-full"></div>
        <div className="absolute left-3/4 top-0 bottom-0 w-px bg-gray-100 h-full"></div>
        <div className="absolute right-0 top-0 bottom-0 w-px bg-gray-100 h-full"></div>
        
        {/* Horizontal grid lines */}
        <div className="absolute left-0 right-0 top-0 h-px bg-gray-100 w-full"></div>
        <div className="absolute left-0 right-0 top-1/4 h-px bg-gray-100 w-full"></div>
        <div className="absolute left-0 right-0 top-1/2 h-px bg-gray-100 w-full"></div>
        <div className="absolute left-0 right-0 top-3/4 h-px bg-gray-100 w-full"></div>
        
        {/* SVG for curve */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 1s' }}>
          <path
            d="M 0,200 C 80,180 120,140 200,100 C 280,60 350,50 400,50"
            fill="none"
            stroke="#e0e0e0"
            strokeWidth="3"
            className="transition-all duration-1000"
            style={{
              strokeDasharray: 500,
              strokeDashoffset: pathOffset,
              transition: 'stroke-dashoffset 2s ease-in-out'
            }}
            ref={(path) => {
              if (path && pathLength === 0) {
                setPathLength(path.getTotalLength());
                setPathOffset(path.getTotalLength());
              }
            }}
          />
          
          {/* Animated path that follows the gray path */}
          <path
            d="M 0,200 C 80,180 120,140 200,100 C 280,60 350,50 400,50"
            fill="none"
            stroke="url(#gradientLine)"
            strokeWidth="3"
            className="transition-all duration-1000"
            style={{
              strokeDasharray: 500,
              strokeDashoffset: pathOffset,
              transition: 'stroke-dashoffset 2s ease-in-out'
            }}
          />

          {/* Define gradient */}
          <defs>
            <linearGradient id="gradientLine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F7685B" />
              <stop offset="50%" stopColor="#FFB129" />
              <stop offset="100%" stopColor="#47B881" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Points on the curve */}
        {pointData.map((point, index) => {
          return (
            <React.Fragment key={index}>
              {/* Point */}
              <div 
                className="graph-point"
                style={{ 
                  left: point.x, 
                  top: point.y, 
                  borderColor: point.color,
                  transform: `translate(-50%, -50%) scale(${index <= activePoint ? 1.5 : 0.8})`,
                  boxShadow: index <= activePoint ? `0 0 10px ${point.color}` : 'none',
                  opacity: isVisible ? 1 : 0,
                  transitionDelay: `${index * 0.3}s`
                }}
              />
              
              {/* Label */}
              {point.label && (
                <div 
                  className={`absolute px-3 py-1 rounded text-white text-sm font-medium`}
                  style={{ 
                    left: point.x, 
                    top: point.y, 
                    transform: `translate(-50%, ${point.label === 'Oggi' ? '100%' : '-150%'})`,
                    backgroundColor: point.color,
                    opacity: index <= activePoint ? 1 : 0,
                    transition: 'opacity 0.5s',
                    transitionDelay: `${index * 0.3 + 0.2}s`
                  }}
                >
                  {point.label}
                </div>
              )}
              
              {/* Week label */}
              <div
                className="absolute text-xs text-gray-500"
                style={{
                  left: point.x,
                  bottom: '-25px',
                  transform: 'translateX(-50%)',
                  opacity: isVisible ? 1 : 0,
                  transitionDelay: `${index * 0.3}s`
                }}
              >
                {point.week}
              </div>
            </React.Fragment>
          );
        })}
      </div>
      
      <p className="text-xs text-center text-gray-400 mt-2 mb-10">
        Il grafico è un'illustrazione non personalizzata e i risultati possono variare
      </p>
      
      <h2 className="text-2xl font-bold text-center">
        Il tuo piano personale di
      </h2>
      <h2 className="text-2xl font-bold text-center text-brand-primary mb-3">
        Gestione del Benessere
      </h2>
      <h2 className="text-2xl font-bold text-center">
        è pronto!
      </h2>
    </div>
  );
};

export default SinusoidalGraph;
