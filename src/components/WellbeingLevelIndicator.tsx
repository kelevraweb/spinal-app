
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';

interface WellbeingLevelProps {
  level: 'Low' | 'Normal' | 'Medium' | 'High';
  details?: {
    mainDifficulty?: string;
    triggerType?: string;
    challengingPeriod?: string;
    energyLevel?: string;
  };
  onContinue?: () => void;
}

const levelDescriptions = {
  Low: "Questo indica un benessere compromesso, con sintomi frequenti come ansia, stress elevato, disturbi del sonno e scarsa energia.",
  Normal: "Questo indica un benessere generale equilibrato, con occasionali momenti di stress ma buona capacità di recupero.",
  Medium: "Potresti sperimentare: lievi preoccupazioni, calo d'energia, difficoltà nel sonno.",
  High: "Questo indica livelli preoccupanti di stress, ansia frequente, energia molto bassa e significativi problemi di sonno."
};

const levelColors = {
  Low: '#ff1aa9',
  Normal: '#19f1fe',
  Medium: '#ff80c8',
  High: '#ff1aa9'
};

const levelPositions = {
  Low: '15%',
  Normal: '38%',
  Medium: '62%',
  High: '85%'
};

const WellbeingLevelIndicator: React.FC<WellbeingLevelProps> = ({ 
  level = 'Medium',
  details = {
    mainDifficulty: 'Preoccupazione',
    triggerType: 'Circostanze esterne',
    challengingPeriod: 'Alcuni mesi',
    energyLevel: 'Medio'
  },
  onContinue
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animateThumb, setAnimateThumb] = useState(false);
  
  useEffect(() => {
    const visibilityTimer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    
    const animationTimer = setTimeout(() => {
      setAnimateThumb(true);
    }, 1000);
    
    return () => {
      clearTimeout(visibilityTimer);
      clearTimeout(animationTimer);
    };
  }, []);

  // Translate level to Italian
  const levelInItalian = {
    'Low': 'BASSO',
    'Normal': 'NORMALE',
    'Medium': 'MEDIO',
    'High': 'ALTO'
  }[level];

  return (
    <div className={`max-w-2xl mx-auto my-10 transition-all duration-1000 pt-16 px-4 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <h2 className="text-2xl font-bold text-center mb-6">
        Riepilogo del tuo Profilo di Benessere
      </h2>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Il tuo stato attuale è</h3>
          <span className="bg-[#fff0f8] text-[#ff1aa9] px-3 py-1 rounded-full text-sm font-bold">
            {levelInItalian}
          </span>
        </div>
        
        <div className="relative my-10">
          <div className="w-full h-40 bg-gradient-to-r from-[#fff0f8] via-[#e5fcff] to-[#fff0f8] rounded-lg flex items-center justify-center overflow-hidden">
            <div className="w-20 h-20 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center z-10 animate-pulse-slow">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#ff1aa9]">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            
            {/* Oscillation waves */}
            <div className="absolute inset-0 flex items-center">
              <svg width="100%" height="40" viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg">
                <path d="M0,20 Q25,5 50,20 T100,20 T150,20 T200,20" fill="none" stroke="rgba(255, 26, 169, 0.3)" strokeWidth="1">
                  <animate attributeName="d" dur="5s" repeatCount="indefinite" 
                    values="M0,20 Q25,5 50,20 T100,20 T150,20 T200,20;
                           M0,20 Q25,35 50,20 T100,20 T150,20 T200,20;
                           M0,20 Q25,5 50,20 T100,20 T150,20 T200,20" />
                </path>
                <path d="M0,20 Q25,15 50,20 T100,20 T150,20 T200,20" fill="none" stroke="rgba(25, 241, 254, 0.2)" strokeWidth="1" strokeDasharray="4,4">
                  <animate attributeName="d" dur="7s" repeatCount="indefinite" 
                    values="M0,20 Q25,15 50,20 T100,20 T150,20 T200,20;
                           M0,20 Q25,25 50,20 T100,20 T150,20 T200,20;
                           M0,20 Q25,15 50,20 T100,20 T150,20 T200,20" />
                </path>
              </svg>
            </div>
          </div>
          
          <div 
            className="absolute right-0 bg-gray-900 text-white p-2 rounded shadow-lg transform translate-x-4 -translate-y-8"
            style={{
              top: '50%'
            }}
          >
            Il tuo livello
          </div>
        </div>
        
        <div className="mb-4 mt-10">
          <div className="wellbeing-slider relative h-3 bg-gradient-to-r from-[#ff1aa9] via-[#ff80c8] to-[#19f1fe] rounded-full overflow-hidden">
            <div 
              className={`slider-thumb absolute w-6 h-6 bg-white rounded-full border-4 -mt-1.5 transform -translate-x-1/2 shadow-md ${animateThumb ? '' : 'left-0'}`} 
              style={{ 
                left: animateThumb ? levelPositions[level] : '0%',
                borderColor: levelColors[level],
                transition: 'left 1s ease-out'
              }}
            >
              <span className="slider-label absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs font-bold text-white" 
                style={{ backgroundColor: levelColors[level] }}>
                {levelInItalian}
              </span>
            </div>
          </div>
          
          <div className="flex justify-between mt-6 text-sm text-gray-500">
            <span>Basso</span>
            <span>Normale</span>
            <span>Medio</span>
            <span>Alto</span>
          </div>
        </div>
        
        <div className={`bg-[#fff0f8] border-l-4 border-[#ff1aa9] p-4 rounded-md my-6 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="flex items-center">
            <span className="inline-flex items-center justify-center w-6 h-6 mr-2 bg-[#ff80c8] text-white rounded-full">
              !
            </span>
            <h4 className="font-semibold text-[#ff1aa9]">Livello {levelInItalian}</h4>
          </div>
          <p className="mt-2 text-gray-700">
            {levelDescriptions[level]}
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-gray-50 p-4 rounded-md shadow-sm">
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center w-6 h-6 mr-2 bg-[#e5fcff] text-[#19f1fe] rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </span>
              <div>
                <h5 className="text-sm text-gray-600">Difficoltà principale</h5>
                <p className="font-semibold">{details.mainDifficulty}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md shadow-sm">
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center w-6 h-6 mr-2 bg-[#e5fcff] text-[#19f1fe] rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </span>
              <div>
                <h5 className="text-sm text-gray-600">Periodo di difficoltà</h5>
                <p className="font-semibold">{details.challengingPeriod}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md shadow-sm">
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center w-6 h-6 mr-2 bg-[#e5fcff] text-[#19f1fe] rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
              </span>
              <div>
                <h5 className="text-sm text-gray-600">Fattore scatenante</h5>
                <p className="font-semibold">{details.triggerType}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md shadow-sm">
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center w-6 h-6 mr-2 bg-[#e5fcff] text-[#19f1fe] rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
                </svg>
              </span>
              <div>
                <h5 className="text-sm text-gray-600">Livello di energia</h5>
                <p className="font-semibold">{details.energyLevel}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-center">
          <Button 
            onClick={onContinue}
            size="lg"
            className="bg-[#ff1aa9] hover:bg-[#e6009a] text-white"
          >
            Continua la tua analisi
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WellbeingLevelIndicator;
