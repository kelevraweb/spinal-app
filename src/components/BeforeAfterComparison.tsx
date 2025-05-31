
import React, { useEffect, useState } from 'react';
import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronRight } from 'lucide-react';

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
    }, 1200);
    
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

  const ProgressIndicator = ({ 
    title, 
    value, 
    label, 
    color, 
    delay 
  }: { 
    title: string; 
    value: number; 
    label: string; 
    color: string; 
    delay: number; 
  }) => (
    <div className="mb-4">
      <h4 className="text-sm font-semibold text-gray-800 mb-1">{title}</h4>
      <p className="text-xs text-gray-600 mb-2">{label}</p>
      <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-1000 ease-out`}
          style={{ 
            width: isVisible ? `${value}%` : '0%',
            backgroundColor: color,
            transitionDelay: `${delay}ms`
          }}
        />
        <div 
          className={`absolute top-1/2 w-3 h-3 rounded-full border-2 border-white shadow-lg transition-all duration-1000 ease-out`}
          style={{
            left: `${Math.max(value - 1.5, 0)}%`,
            transform: 'translateY(-50%)',
            backgroundColor: color,
            opacity: isVisible ? 1 : 0,
            transitionDelay: `${delay}ms`
          }}
        />
      </div>
    </div>
  );

  return (
    <div className={`max-w-7xl mx-auto mb-10 px-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-800">
        {userName}, il tuo piano personalizzato è pronto!
      </h2>
      
      {/* Main Before-After Layout */}
      <div className="relative">
        <div className="grid grid-cols-2 gap-4 md:gap-16">
          {/* Before Column */}
          <div className="text-center">
            {/* Badge */}
            <div className="flex justify-center mb-6">
              <div className="bg-gray-400 text-white px-4 py-2 rounded-full">
                <span className="font-bold text-sm md:text-base">Ora</span>
              </div>
            </div>
            
            {/* Image */}
            <div className="relative mb-6">
              <img 
                src="/lovable-uploads/c99bbbe1-5997-45bd-a1ff-752a4a9049f1.png" 
                alt="Situazione attuale - persona con stress e dolori" 
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Progress Indicators */}
            <div className="space-y-4">
              <ProgressIndicator
                title="Dolore lombare"
                value={80}
                label="Alto"
                color="#9CA3AF"
                delay={300}
              />
              <ProgressIndicator
                title="Mobilità spinale"
                value={25}
                label="Limitata"
                color="#9CA3AF"
                delay={500}
              />
              <ProgressIndicator
                title="Rigidità mattutina"
                value={75}
                label="Severa"
                color="#9CA3AF"
                delay={700}
              />
            </div>
          </div>
          
          {/* After Column */}
          <div className="text-center">
            {/* Badge */}
            <div className="flex justify-center mb-6">
              <div className="bg-[#71b8bc] text-white px-4 py-2 rounded-full shadow-lg">
                <span className="font-bold text-sm md:text-base">Il Tuo Obiettivo</span>
              </div>
            </div>
            
            {/* Image */}
            <div className="relative mb-6">
              <img 
                src="/lovable-uploads/eb4eabe5-ba3d-4388-948c-d21e0211167f.png" 
                alt="Obiettivo - persona felice e in salute" 
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Progress Indicators */}
            <div className="space-y-4">
              <ProgressIndicator
                title="Dolore lombare"
                value={15}
                label="Minimo"
                color="#71b8bc"
                delay={800}
              />
              <ProgressIndicator
                title="Mobilità spinale"
                value={90}
                label="Ottima"
                color="#71b8bc"
                delay={1000}
              />
              <ProgressIndicator
                title="Rigidità mattutina"
                value={10}
                label="Assente"
                color="#71b8bc"
                delay={1200}
              />
            </div>
          </div>
        </div>

        {/* Animated Arrow Between Images */}
        <div className="absolute top-32 md:top-40 left-1/2 transform -translate-x-1/2 z-10">
          <div className={`flex items-center space-x-1 transition-all duration-1000 ${showArrows ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-[#71b8bc] animate-bounce" />
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-[#71b8bc] animate-bounce" style={{ animationDelay: '0.2s' }} />
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-[#71b8bc] animate-bounce" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      </div>
      
      {/* Bottom Stats Bar */}
      <div className="bg-[#71b8bc] text-white p-6 rounded-lg mt-12 text-center">
        <p className="font-medium text-lg">Il 94% dei nostri clienti ha notato un miglioramento dopo solo 2 settimane</p>
        <p className="text-sm opacity-90 mt-2">Basato su rilevazioni effettuate su 1.200+ utenti</p>
      </div>
    </div>
  );
};

export default BeforeAfterComparison;
