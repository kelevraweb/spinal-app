
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { ChevronRight } from 'lucide-react';

interface SinusoidalGraphProps {
  onContinue?: () => void;
}

const SinusoidalGraph: React.FC<SinusoidalGraphProps> = ({ onContinue }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activePoint, setActivePoint] = useState(0);
  const [pathAnimated, setPathAnimated] = useState(false);
  
  useEffect(() => {
    // Initial visibility animation
    const visibilityTimer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    
    // Start path animation
    const pathTimer = setTimeout(() => {
      setPathAnimated(true);
    }, 1000);
    
    // Points animation sequence
    const pointsSequence = [0, 1, 2, 3].map((point, index) => {
      return setTimeout(() => {
        setActivePoint(point);
      }, 1500 + index * 1000);
    });
    
    return () => {
      clearTimeout(visibilityTimer);
      clearTimeout(pathTimer);
      pointsSequence.forEach(timer => clearTimeout(timer));
    };
  }, []);

  const pointData = [
    { week: 'SETTIMANA 1', x: '15%', y: '80%', color: '#F7685B', label: 'Oggi', active: true },
    { week: 'SETTIMANA 2', x: '38%', y: '60%', color: '#F7685B' },
    { week: 'SETTIMANA 3', x: '62%', y: '35%', color: '#FFB129' },
    { week: 'SETTIMANA 4', x: '85%', y: '20%', color: '#47B881', label: 'Dopo LoveCoach' }
  ];
  
  return (
    <div className="max-w-2xl mx-auto my-12 px-4 pt-16">
      <h2 className="text-xl font-semibold text-center mb-4">Il tuo livello di benessere</h2>
      
      <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
        <div className="relative h-64 mb-8">
          {/* Background grid */}
          <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
            {/* Vertical grid lines */}
            {[...Array(5)].map((_, i) => (
              <div 
                key={`v-${i}`} 
                className="absolute top-0 bottom-0 w-px bg-gray-100 h-full"
                style={{ left: `${i * 25}%` }}
              />
            ))}
            
            {/* Horizontal grid lines */}
            {[...Array(5)].map((_, i) => (
              <div 
                key={`h-${i}`} 
                className="absolute left-0 right-0 h-px bg-gray-100 w-full"
                style={{ top: `${i * 25}%` }}
              />
            ))}
          </div>
          
          {/* SVG for curve */}
          <svg className="absolute inset-0 w-full h-full overflow-visible" style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 1s' }}>
            {/* Define gradient */}
            <defs>
              <linearGradient id="gradientLine" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F7685B" />
                <stop offset="50%" stopColor="#FFB129" />
                <stop offset="100%" stopColor="#47B881" />
              </linearGradient>
              
              {/* Shadow filter */}
              <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.2" />
              </filter>
              
              {/* Glow filter */}
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            
            {/* Background path for the curve */}
            <path
              d="M 0,200 C 80,180 120,140 200,100 C 280,60 350,50 400,50"
              fill="none"
              stroke="#e0e0e0"
              strokeWidth="4"
              strokeLinecap="round"
            />
            
            {/* Animated gradient path */}
            <path
              d="M 0,200 C 80,180 120,140 200,100 C 280,60 350,50 400,50"
              fill="none"
              stroke="url(#gradientLine)"
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#shadow)"
              style={{
                strokeDasharray: 500,
                strokeDashoffset: pathAnimated ? 0 : 500,
                transition: 'stroke-dashoffset 2s ease-out'
              }}
            />
            
            {/* Highlight glow on the curve */}
            <path
              d="M 0,200 C 80,180 120,140 200,100 C 280,60 350,50 400,50"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeOpacity="0.5"
              filter="url(#glow)"
              style={{
                strokeDasharray: 500,
                strokeDashoffset: pathAnimated ? 0 : 500,
                transition: 'stroke-dashoffset 2s ease-out'
              }}
            />
          </svg>
          
          {/* Points on the curve */}
          {pointData.map((point, index) => {
            const isActive = index <= activePoint && pathAnimated;
            return (
              <React.Fragment key={index}>
                {/* Ripple effect for active points */}
                {isActive && (
                  <div 
                    className="absolute rounded-full animate-pulse-slow"
                    style={{
                      left: point.x,
                      top: point.y,
                      width: '30px',
                      height: '30px',
                      backgroundColor: `${point.color}20`,
                      transform: 'translate(-50%, -50%)',
                      transition: 'opacity 0.5s',
                      animation: 'pulse 2s infinite'
                    }}
                  />
                )}
                
                {/* Point */}
                <div 
                  className="absolute rounded-full border-4 bg-white z-10"
                  style={{ 
                    left: point.x, 
                    top: point.y, 
                    width: isActive ? '14px' : '10px',
                    height: isActive ? '14px' : '10px',
                    borderColor: point.color,
                    opacity: pathAnimated ? 1 : 0,
                    transform: `translate(-50%, -50%) scale(${isActive ? 1 : 0.8})`,
                    boxShadow: isActive ? `0 0 10px ${point.color}` : 'none',
                    transition: 'all 0.5s',
                    transitionDelay: `${index * 0.3}s`
                  }}
                />
                
                {/* Label */}
                {point.label && (
                  <div 
                    className="absolute px-3 py-1.5 rounded-full text-white text-sm font-medium shadow-lg z-10"
                    style={{ 
                      left: point.x, 
                      top: point.y, 
                      transform: `translate(-50%, ${point.label === 'Oggi' ? '150%' : '-150%'})`,
                      backgroundColor: point.color,
                      opacity: isActive ? 1 : 0,
                      transition: 'opacity 0.5s, transform 0.5s',
                      transitionDelay: `${index * 0.3 + 0.2}s`
                    }}
                  >
                    {point.label}
                  </div>
                )}
                
                {/* Week label */}
                <div
                  className="absolute text-xs font-medium"
                  style={{
                    left: point.x,
                    bottom: '-25px',
                    transform: 'translateX(-50%)',
                    opacity: pathAnimated ? 1 : 0,
                    color: isActive ? point.color : '#888',
                    transition: 'opacity 0.5s, color 0.5s',
                    transitionDelay: `${index * 0.3}s`
                  }}
                >
                  {point.week}
                </div>
              </React.Fragment>
            );
          })}
          
          {/* Y-axis labels */}
          <div className="absolute text-xs text-gray-500 left-0 top-0 transform -translate-x-6">Alto</div>
          <div className="absolute text-xs text-gray-500 left-0 bottom-0 transform -translate-x-6">Basso</div>
          
          {/* Legend */}
          <div className="absolute -bottom-10 left-0 flex items-center gap-3 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-[#F7685B]"></div>
              <span>Stress</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-[#FFB129]"></div>
              <span>Miglioramento</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-[#47B881]"></div>
              <span>Benessere</span>
            </div>
          </div>
        </div>
      
        <p className="text-xs text-center text-gray-400 mt-2 mb-6">
          Il grafico è un'illustrazione non personalizzata e i risultati possono variare
        </p>
        
        <div className="text-center mt-10">
          <Button 
            onClick={onContinue}
            size="lg"
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Continua <ChevronRight className="ml-2" size={18} />
          </Button>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-center mt-10">
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
