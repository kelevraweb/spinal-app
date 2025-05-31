
import React, { useEffect, useState } from 'react';
import { Progress } from "@/components/ui/progress";
import { useIsMobile } from "@/hooks/use-mobile";

interface ComparisonIndicatorProps {
  title: string;
  beforeValue: number;
  afterValue: number;
  animationDelay?: number;
}

const ComparisonIndicator: React.FC<ComparisonIndicatorProps> = ({
  title,
  beforeValue,
  afterValue,
  animationDelay = 0
}) => {
  const [currentBeforeValue, setCurrentBeforeValue] = useState(0);
  const [currentAfterValue, setCurrentAfterValue] = useState(0);

  useEffect(() => {
    const beforeTimer = setTimeout(() => {
      setCurrentBeforeValue(beforeValue);
    }, animationDelay);

    const afterTimer = setTimeout(() => {
      setCurrentAfterValue(afterValue);
    }, animationDelay + 500);

    return () => {
      clearTimeout(beforeTimer);
      clearTimeout(afterTimer);
    };
  }, [beforeValue, afterValue, animationDelay]);

  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-700">{title}</span>
        <span className="text-sm font-bold text-[#71b8bc]">{currentAfterValue}%</span>
      </div>
      <Progress 
        className="h-2 bg-gray-200" 
        indicatorClassName="bg-[#71b8bc]"
        value={currentAfterValue} 
      />
    </div>
  );
};

const BeforeAfterComparison: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [userName, setUserName] = useState('Marco'); // Default name, should be retrieved from quiz data
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const visibilityTimer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    // Try to get user name from localStorage or quiz data
    const storedEmail = localStorage.getItem('userEmail') || '';
    if (storedEmail) {
      const name = storedEmail.split('@')[0];
      setUserName(name.charAt(0).toUpperCase() + name.slice(1));
    }
    
    return () => {
      clearTimeout(visibilityTimer);
    };
  }, []);

  return (
    <div className={`max-w-5xl mx-auto mb-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
        {userName}, il tuo piano personalizzato è pronto!
      </h2>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Before Column - NOW */}
          <div className="bg-gray-50 p-6 relative">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">ORA</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800">La tua situazione attuale</h3>
            </div>
            
            <div className="relative overflow-hidden mb-6 rounded-lg h-[200px] md:h-[250px] bg-gray-200 flex items-center justify-center">
              <img 
                src="/lovable-uploads/c99bbbe1-5997-45bd-a1ff-752a4a9049f1.png" 
                alt="Situazione attuale - persona con dolori alla schiena" 
                className="w-full h-full object-contain"
              />
            </div>
            
            <div className="space-y-3">
              <ComparisonIndicator 
                title="Livello di energia" 
                beforeValue={0} 
                afterValue={25} 
                animationDelay={300} 
              />
              <ComparisonIndicator 
                title="Benessere della schiena" 
                beforeValue={0} 
                afterValue={20} 
                animationDelay={500} 
              />
              <ComparisonIndicator 
                title="Fiducia nei movimenti" 
                beforeValue={0} 
                afterValue={30} 
                animationDelay={700} 
              />
            </div>
          </div>
          
          {/* After Column - YOUR GOAL */}
          <div className="bg-white p-6 relative">
            <div className="absolute top-4 right-4 bg-[#71b8bc] text-white px-3 py-1 rounded-full text-sm font-bold">
              IL TUO OBIETTIVO
            </div>
            
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-[#71b8bc] rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">META</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800">Con il piano "Schiena Libera"</h3>
            </div>
            
            <div className="relative overflow-hidden mb-6 rounded-lg h-[200px] md:h-[250px] bg-gray-100 flex items-center justify-center">
              <img 
                src="/lovable-uploads/eb4eabe5-ba3d-4388-948c-d21e0211167f.png" 
                alt="Obiettivo - persona felice e senza dolori" 
                className="w-full h-full object-contain"
              />
            </div>
            
            <div className="space-y-3">
              <ComparisonIndicator 
                title="Livello di energia" 
                beforeValue={0} 
                afterValue={90} 
                animationDelay={300} 
              />
              <ComparisonIndicator 
                title="Benessere della schiena" 
                beforeValue={0} 
                afterValue={95} 
                animationDelay={500} 
              />
              <ComparisonIndicator 
                title="Fiducia nei movimenti" 
                beforeValue={0} 
                afterValue={88} 
                animationDelay={700} 
              />
            </div>
          </div>
        </div>
        
        <div className="bg-[#71b8bc] text-white p-4 text-center">
          <p className="font-medium text-lg">Il 94% dei nostri clienti ha notato un miglioramento dopo solo 2 settimane</p>
          <p className="text-sm opacity-90 mt-1">Basato su rilevazioni effettuate su 1.200+ utenti</p>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterComparison;
