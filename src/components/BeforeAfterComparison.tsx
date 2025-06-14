import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronRight } from 'lucide-react';
import { getUserGender } from './QuizDataManager';

const BeforeAfterComparison: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showArrows, setShowArrows] = useState(false);
  const [userGender, setUserGender] = useState<'male' | 'female'>('female');
  const isMobile = useIsMobile();
  const [searchParams] = useSearchParams();
  
  // Get user name from URL params
  const userName = searchParams.get('name') || 'Marco';
  
  useEffect(() => {
    const visibilityTimer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    const arrowTimer = setTimeout(() => {
      setShowArrows(true);
    }, 1200);
    
    // First, try to get gender from URL parameters (priority)
    const genderFromUrl = searchParams.get('gender');
    console.log('Gender from URL:', genderFromUrl);
    
    if (genderFromUrl) {
      // Convert URL gender values to internal format
      if (genderFromUrl === 'Maschio' || genderFromUrl === 'male') {
        console.log('Setting gender to male from URL');
        setUserGender('male');
      } else if (genderFromUrl === 'Femmina' || genderFromUrl === 'female') {
        console.log('Setting gender to female from URL');
        setUserGender('female');
      } else {
        console.log('Unknown gender from URL:', genderFromUrl, 'defaulting to female');
        setUserGender('female');
      }
    } else {
      // Fallback: Get user gender using the data manager
      const gender = getUserGender();
      console.log('Gender from getUserGender (fallback):', gender);
      
      if (gender === 'Maschio') {
        console.log('Setting gender to male from data manager');
        setUserGender('male');
      } else {
        console.log('Setting gender to female from data manager or default');
        setUserGender('female');
      }
    }
    
    return () => {
      clearTimeout(visibilityTimer);
      clearTimeout(arrowTimer);
    };
  }, [searchParams]);

  // External image URLs - these will definitely work!
  const beforeImage = userGender === 'male' 
    ? 'https://i.postimg.cc/3xsX4f4j/9a85d05c-58e2-4525-ba80-3f09a535780b.png' // uomo prima
    : 'https://i.postimg.cc/NFRqtzHN/2a43f080-c42b-4d16-bd8d-8397cf5b51a2.png'; // donna prima

  const afterImage = userGender === 'male'
    ? 'https://i.postimg.cc/5Nkq12fR/a33b1e79-7e26-4bce-be77-283e1cda201d.png' // uomo dopo
    : 'https://i.postimg.cc/cHZfTKcr/88c515a2-3d6c-485a-9dda-72f4e1137cb0.png'; // donna dopo

  console.log('Final userGender:', userGender);
  console.log('Selected beforeImage:', beforeImage);
  console.log('Selected afterImage:', afterImage);

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
    <div className={`max-w-7xl mx-auto mb-6 px-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
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
            
            {/* Image with external URLs */}
            <div className="relative mb-6 flex justify-center">
              <img 
                src={beforeImage}
                alt="Situazione attuale - persona con stress e dolori" 
                className="w-32 h-32 md:w-40 md:h-40 object-contain rounded-lg"
                onError={(e) => console.log('Error loading before image:', beforeImage)}
                onLoad={() => console.log('Successfully loaded before image:', beforeImage)}
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
            
            {/* Image with external URLs */}
            <div className="relative mb-6 flex justify-center">
              <img 
                src={afterImage}
                alt="Obiettivo - persona felice e in salute" 
                className="w-32 h-32 md:w-40 md:h-40 object-contain rounded-lg"
                onError={(e) => console.log('Error loading after image:', afterImage)}
                onLoad={() => console.log('Successfully loaded after image:', afterImage)}
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
        <div className="absolute top-16 md:top-20 left-1/2 transform -translate-x-1/2 z-10">
          <div className={`flex items-center space-x-1 transition-all duration-1000 ${showArrows ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-[#71b8bc] animate-bounce" />
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-[#71b8bc] animate-bounce" style={{ animationDelay: '0.2s' }} />
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-[#71b8bc] animate-bounce" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      </div>
      
      {/* Bottom Stats Bar */}
      <div className="bg-[#71b8bc] text-white p-6 rounded-lg mt-8 text-center">
        <p className="font-medium text-lg">Il 94% dei nostri clienti ha notato un miglioramento dopo solo 2 settimane</p>
        <p className="text-sm opacity-90 mt-2">Basato su rilevazioni effettuate su 1.200+ utenti</p>
      </div>
    </div>
  );
};

export default BeforeAfterComparison;
