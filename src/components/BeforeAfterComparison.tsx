
import React, { useEffect, useState } from 'react';
import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronRight } from 'lucide-react';

interface AnimatedIndicatorProps {
  title: string;
  beforeLabel: string;
  afterLabel: string;
  beforeValue: number;
  afterValue: number;
  animationDelay?: number;
}

const AnimatedIndicator: React.FC<AnimatedIndicatorProps> = ({
  title,
  beforeLabel,
  afterLabel,
  beforeValue,
  afterValue,
  animationDelay = 0
}) => {
  const [currentBeforeValue, setCurrentBeforeValue] = useState(0);
  const [currentAfterValue, setCurrentAfterValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true);
      setCurrentBeforeValue(beforeValue);
      
      setTimeout(() => {
        setCurrentAfterValue(afterValue);
      }, 300);
    }, animationDelay);

    return () => clearTimeout(timer);
  }, [beforeValue, afterValue, animationDelay]);

  const ProgressBar = ({ value, isAfter = false }: { value: number; isAfter?: boolean }) => (
    <div className="relative w-full h-6 bg-gray-200 rounded-full overflow-hidden">
      <div 
        className={`h-full transition-all duration-1000 ease-out ${
          isAfter ? 'bg-[#71b8bc]' : 'bg-gray-400'
        }`}
        style={{ 
          width: `${value}%`,
          transform: isAnimating ? 'translateX(0)' : 'translateX(-100%)'
        }}
      />
      <div 
        className={`absolute top-1/2 w-4 h-4 rounded-full border-2 border-white shadow-lg transition-all duration-1000 ease-out ${
          isAfter ? 'bg-[#71b8bc]' : 'bg-gray-400'
        }`}
        style={{
          left: `${Math.max(value - 2, 0)}%`,
          transform: 'translateY(-50%)',
          opacity: isAnimating ? 1 : 0
        }}
      />
    </div>
  );

  return (
    <div className="mb-6">
      <div className="grid grid-cols-2 gap-8">
        {/* Before */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-2">{title}</h4>
          <p className="text-sm text-gray-600 mb-3">{beforeLabel}</p>
          <ProgressBar value={currentBeforeValue} />
        </div>
        
        {/* After */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-2">{title}</h4>
          <p className="text-sm text-gray-600 mb-3">{afterLabel}</p>
          <ProgressBar value={currentAfterValue} isAfter />
        </div>
      </div>
    </div>
  );
};

const BeforeAfterComparison: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [userName, setUserName] = useState('Marco');
  const [showArrows, setShowArrows] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const visibilityTimer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    const arrowTimer = setTimeout(() => {
      setShowArrows(true);
    }, 800);
    
    // Try to get user name from localStorage or quiz data
    const storedEmail = localStorage.getItem('userEmail') || '';
    if (storedEmail) {
      const name = storedEmail.split('@')[0];
      setUserName(name.charAt(0).toUpperCase() + name.slice(1));
    }
    
    return () => {
      clearTimeout(visibilityTimer);
      clearTimeout(arrowTimer);
    };
  }, []);

  return (
    <div className={`max-w-6xl mx-auto mb-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-800">
        {userName}, il tuo piano personalizzato è pronto!
      </h2>
      
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden relative">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[600px]">
          {/* Before Column - NOW */}
          <div className="bg-gray-50 p-8 relative">
            <div className="flex items-center justify-between mb-6">
              <div className="bg-gray-400 text-white px-6 py-3 rounded-full">
                <span className="font-bold text-lg">Now</span>
              </div>
            </div>
            
            <div className="relative overflow-hidden mb-8 rounded-2xl h-[280px] bg-white flex items-center justify-center shadow-lg">
              <img 
                src="/lovable-uploads/c99bbbe1-5997-45bd-a1ff-752a4a9049f1.png" 
                alt="Situazione attuale - persona con stress e dolori" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Energy level</h4>
                <p className="text-sm text-gray-600 mb-3">Low</p>
                <div className="relative w-full h-6 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gray-400 transition-all duration-1000 ease-out delay-300`}
                    style={{ width: isVisible ? '25%' : '0%' }}
                  />
                  <div 
                    className={`absolute top-1/2 w-4 h-4 bg-gray-400 rounded-full border-2 border-white shadow-lg transition-all duration-1000 ease-out delay-300`}
                    style={{
                      left: '23%',
                      transform: 'translateY(-50%)',
                      opacity: isVisible ? 1 : 0
                    }}
                  />
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Well-being level</h4>
                <p className="text-sm text-gray-600 mb-3">Weak</p>
                <div className="relative w-full h-6 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gray-400 transition-all duration-1000 ease-out delay-500`}
                    style={{ width: isVisible ? '20%' : '0%' }}
                  />
                  <div 
                    className={`absolute top-1/2 w-4 h-4 bg-gray-400 rounded-full border-2 border-white shadow-lg transition-all duration-1000 ease-out delay-500`}
                    style={{
                      left: '18%',
                      transform: 'translateY(-50%)',
                      opacity: isVisible ? 1 : 0
                    }}
                  />
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Self-esteem level</h4>
                <p className="text-sm text-gray-600 mb-3">Low</p>
                <div className="relative w-full h-6 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gray-400 transition-all duration-1000 ease-out delay-700`}
                    style={{ width: isVisible ? '30%' : '0%' }}
                  />
                  <div 
                    className={`absolute top-1/2 w-4 h-4 bg-gray-400 rounded-full border-2 border-white shadow-lg transition-all duration-1000 ease-out delay-700`}
                    style={{
                      left: '28%',
                      transform: 'translateY(-50%)',
                      opacity: isVisible ? 1 : 0
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* After Column - YOUR GOAL */}
          <div className="bg-white p-8 relative">
            <div className="flex items-center justify-between mb-6">
              <div className="bg-[#71b8bc] text-white px-6 py-3 rounded-full shadow-lg">
                <span className="font-bold text-lg">Your Goal</span>
              </div>
            </div>
            
            <div className="relative overflow-hidden mb-8 rounded-2xl h-[280px] bg-gray-50 flex items-center justify-center shadow-lg">
              <img 
                src="/lovable-uploads/eb4eabe5-ba3d-4388-948c-d21e0211167f.png" 
                alt="Obiettivo - persona felice e in salute" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Energy level</h4>
                <p className="text-sm text-gray-600 mb-3">High</p>
                <div className="relative w-full h-6 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-[#71b8bc] transition-all duration-1000 ease-out delay-800`}
                    style={{ width: isVisible ? '90%' : '0%' }}
                  />
                  <div 
                    className={`absolute top-1/2 w-4 h-4 bg-[#71b8bc] rounded-full border-2 border-white shadow-lg transition-all duration-1000 ease-out delay-800`}
                    style={{
                      left: '88%',
                      transform: 'translateY(-50%)',
                      opacity: isVisible ? 1 : 0
                    }}
                  />
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Well-being level</h4>
                <p className="text-sm text-gray-600 mb-3">Strong</p>
                <div className="relative w-full h-6 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-[#71b8bc] transition-all duration-1000 ease-out delay-1000`}
                    style={{ width: isVisible ? '95%' : '0%' }}
                  />
                  <div 
                    className={`absolute top-1/2 w-4 h-4 bg-[#71b8bc] rounded-full border-2 border-white shadow-lg transition-all duration-1000 ease-out delay-1000`}
                    style={{
                      left: '93%',
                      transform: 'translateY(-50%)',
                      opacity: isVisible ? 1 : 0
                    }}
                  />
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Self-esteem level</h4>
                <p className="text-sm text-gray-600 mb-3">High</p>
                <div className="relative w-full h-6 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-[#71b8bc] transition-all duration-1000 ease-out delay-1200`}
                    style={{ width: isVisible ? '88%' : '0%' }}
                  />
                  <div 
                    className={`absolute top-1/2 w-4 h-4 bg-[#71b8bc] rounded-full border-2 border-white shadow-lg transition-all duration-1000 ease-out delay-1200`}
                    style={{
                      left: '86%',
                      transform: 'translateY(-50%)',
                      opacity: isVisible ? 1 : 0
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Arrow in the center */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:block">
          <div className={`flex items-center space-x-2 transition-all duration-1000 ${showArrows ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
            <ChevronRight className="w-8 h-8 text-[#71b8bc] animate-bounce" />
            <ChevronRight className="w-8 h-8 text-[#71b8bc] animate-bounce" style={{ animationDelay: '0.2s' }} />
            <ChevronRight className="w-8 h-8 text-[#71b8bc] animate-bounce" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
        
        <div className="bg-[#71b8bc] text-white p-6 text-center">
          <p className="font-medium text-lg">Il 94% dei nostri clienti ha notato un miglioramento dopo solo 2 settimane</p>
          <p className="text-sm opacity-90 mt-2">Basato su rilevazioni effettuate su 1.200+ utenti</p>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterComparison;
