
import React, { useEffect, useState } from 'react';

interface WellbeingLevelProps {
  level: 'Low' | 'Normal' | 'Medium' | 'High';
  details?: {
    mainDifficulty?: string;
    triggerType?: string;
    challengingPeriod?: string;
    energyLevel?: string;
  };
}

const levelDescriptions = {
  Low: "Questo indica un benessere compromesso, con sintomi frequenti come ansia, stress elevato, disturbi del sonno e scarsa energia.",
  Normal: "Questo indica un benessere generale equilibrato, con occasionali momenti di stress ma buona capacità di recupero.",
  Medium: "Questo significa che potresti occasionalmente sentirti in ansia, sperimentare un po' di pressione, notare una leggera diminuzione di energia e avere disturbi minori del sonno.",
  High: "Questo indica livelli preoccupanti di stress, ansia frequente, energia molto bassa e significativi problemi di sonno."
};

const levelColors = {
  Low: '#F7685B',
  Normal: '#A5DC86',
  Medium: '#FFB129',
  High: '#F7685B'
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
  }
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`max-w-2xl mx-auto my-10 transition-opacity duration-1000 pt-16 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <h2 className="text-2xl font-bold text-center mb-6">
        Riepilogo del tuo Profilo di Benessere
      </h2>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Livello di effetti negativi</h3>
          <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">
            {level === 'Medium' ? 'Medio' : level}
          </span>
        </div>
        
        <div className="relative my-10">
          <img 
            src="https://images.unsplash.com/photo-1494774157363-9d7fbfd6c613?w=800&auto=format&fit=crop"
            alt="Persona che sperimenta stress"
            className="w-full h-40 object-cover rounded-lg mb-8"
          />
          
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
          <div className="wellbeing-slider">
            <div 
              className="slider-thumb animate-pulse-glow" 
              style={{ 
                left: levelPositions[level],
                borderColor: levelColors[level],
                transition: isVisible ? 'left 1s ease-out' : 'none'
              }}
            >
              <span className="slider-label" style={{ backgroundColor: levelColors[level] }}>
                {level === 'Medium' ? 'Medio' : level}
              </span>
            </div>
          </div>
          
          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <span>Basso</span>
            <span>Normale</span>
            <span>Medio</span>
            <span>Alto</span>
          </div>
        </div>
        
        <div className={`bg-orange-50 border-l-4 border-orange-300 p-4 rounded-md my-4 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="flex items-center">
            <span className="inline-flex items-center justify-center w-6 h-6 mr-2 bg-orange-100 text-orange-500 rounded-full">
              !
            </span>
            <h4 className="font-semibold text-orange-900">Livello MEDIO</h4>
          </div>
          <p className="mt-2 text-orange-800">
            {levelDescriptions[level]}
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center w-6 h-6 mr-2 bg-green-100 text-green-500 rounded-full">
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
          
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center w-6 h-6 mr-2 bg-green-100 text-green-500 rounded-full">
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
          
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center w-6 h-6 mr-2 bg-green-100 text-green-500 rounded-full">
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
          
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center w-6 h-6 mr-2 bg-green-100 text-green-500 rounded-full">
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
      </div>
    </div>
  );
};

export default WellbeingLevelIndicator;
