
import React, { useEffect, useState } from 'react';
import { Progress } from "@/components/ui/progress";
import { useIsMobile } from "@/hooks/use-mobile";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

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
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium">{title}</span>
        <div className="flex items-center">
          <span className="text-xs font-semibold">{currentBeforeValue}%</span>
          <FontAwesomeIcon 
            icon={faArrowRight} 
            className="text-brand-primary mx-2 animate-pulse" 
          />
          <span className="text-xs font-semibold">{currentAfterValue}%</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Progress 
          className="h-2 bg-gray-200" 
          value={currentBeforeValue} 
        />
        <div className="w-6 flex-shrink-0 flex justify-center">
          <FontAwesomeIcon icon={faArrowRight} className="text-brand-primary" />
        </div>
        <Progress 
          className="h-2 bg-gray-200" 
          indicatorClassName="bg-brand-primary"
          value={currentAfterValue} 
        />
      </div>
    </div>
  );
};

const BeforeAfterComparison: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const visibilityTimer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => {
      clearTimeout(visibilityTimer);
    };
  }, []);

  return (
    <div className={`max-w-5xl mx-auto mb-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        Come potrebbe cambiare la tua vita con il nostro piano personalizzato?
      </h2>
      
      <div className="bg-gradient-to-b from-brand-light to-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Before Column */}
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-brand-light rounded-full flex items-center justify-center mr-3">
                <span className="text-brand-primary font-bold">ORA</span>
              </div>
              <h3 className="text-lg font-bold text-[#1A1F2C]">La tua situazione attuale</h3>
            </div>
            
            <div className="relative overflow-hidden mb-5 rounded-lg h-[200px] md:h-[250px] bg-gray-100">
              <img 
                src="/lovable-uploads/c99bbbe1-5997-45bd-a1ff-752a4a9049f1.png" 
                alt="Situazione attuale" 
                className="w-full h-full object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <p className="text-white font-medium">Dolore e disagio quotidiano</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <ComparisonIndicator 
                title="Livello di Energia" 
                beforeValue={25} 
                afterValue={0} 
                animationDelay={300} 
              />
              <ComparisonIndicator 
                title="Benessere Fisico" 
                beforeValue={20} 
                afterValue={0} 
                animationDelay={500} 
              />
              <ComparisonIndicator 
                title="Qualità della Vita" 
                beforeValue={30} 
                afterValue={0} 
                animationDelay={700} 
              />
            </div>
            
            <div className="mt-6 p-3 bg-red-50 border-l-4 border-red-300 rounded">
              <h4 className="font-semibold mb-1">Problema principale:</h4>
              <p className="text-sm">Dolori continui che limitano i movimenti quotidiani</p>
            </div>
          </div>
          
          {/* After Column */}
          <div className="bg-white p-5 rounded-lg shadow-sm relative">
            <div className="absolute -top-3 -right-3 bg-brand-primary text-white px-3 py-1 rounded-full text-sm font-bold">
              OBIETTIVO
            </div>
            
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-brand-light rounded-full flex items-center justify-center mr-3">
                <span className="text-brand-primary font-bold">DOPO</span>
              </div>
              <h3 className="text-lg font-bold text-[#1A1F2C]">Con il piano "Schiena Libera"</h3>
            </div>
            
            <div className="relative overflow-hidden mb-5 rounded-lg h-[200px] md:h-[250px] bg-gray-100">
              <img 
                src="/lovable-uploads/eb4eabe5-ba3d-4388-948c-d21e0211167f.png" 
                alt="Situazione dopo il piano" 
                className="w-full h-full object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <p className="text-white font-medium">Libertà di movimento e benessere</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <ComparisonIndicator 
                title="Livello di Energia" 
                beforeValue={0} 
                afterValue={85} 
                animationDelay={300} 
              />
              <ComparisonIndicator 
                title="Benessere Fisico" 
                beforeValue={0} 
                afterValue={90} 
                animationDelay={500} 
              />
              <ComparisonIndicator 
                title="Qualità della Vita" 
                beforeValue={0} 
                afterValue={95} 
                animationDelay={700} 
              />
            </div>
            
            <div className="mt-6 p-3 bg-green-50 border-l-4 border-green-300 rounded">
              <h4 className="font-semibold mb-1">Risultato atteso:</h4>
              <p className="text-sm">Libertà di movimento e ritorno alle attività quotidiane senza dolore</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="font-medium text-lg mb-2">Il 94% dei nostri clienti ha notato un miglioramento dopo solo 2 settimane</p>
          <p className="text-gray-600">Basato su rilevazioni effettuate su 1.200+ utenti</p>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterComparison;
