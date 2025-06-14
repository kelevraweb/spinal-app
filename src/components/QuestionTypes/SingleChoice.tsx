
import React, { useState, useEffect } from 'react';
import { QuizOption } from '../../types/quiz';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, faMeh, faFrown, faClock, faCalendarAlt, faStopwatch, faDumbbell, faHeartbeat, faTrophy, faStar, faWalking, faRunning, faPersonWalking, faUserNinja, faSpinner, faChartLine, faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface SingleChoiceProps {
  options: string[] | QuizOption[];
  value: string;
  onChange: (value: string) => void;
  useImages?: boolean;
  questionId?: string;
  autoAdvance?: boolean;
  question?: string;
}

const SingleChoice: React.FC<SingleChoiceProps> = ({
  options,
  value,
  onChange,
  useImages = false,
  questionId,
  autoAdvance = true,
  question
}) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  // Safety check for options
  if (!options || !Array.isArray(options)) {
    console.error('SingleChoice: options prop is undefined or not an array:', options);
    return (
      <div className="w-full max-w-full space-y-3 mt-6">
        <p className="text-gray-500">Nessuna opzione disponibile</p>
      </div>
    );
  }

  // Preload images for gender selection
  useEffect(() => {
    if (useImages && questionId === 'gender') {
      const imageUrls = [
        'https://i.postimg.cc/5Nkq12fR/a33b1e79-7e26-4bce-be77-283e1cda201d.png',
        'https://i.postimg.cc/cHZfTKcr/88c515a2-3d6c-485a-9dda-72f4e1137cb0.png'
      ];
      
      let loadedCount = 0;
      imageUrls.forEach(url => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          if (loadedCount === imageUrls.length) {
            setImagesLoaded(true);
          }
        };
        img.onerror = () => {
          setImageErrors(prev => ({ ...prev, [url]: true }));
          loadedCount++;
          if (loadedCount === imageUrls.length) {
            setImagesLoaded(true);
          }
        };
        img.src = url;
      });
    } else if (questionId === 'daily_activity') {
      const imageUrls = [
        '/lovable-uploads/571517df-fff1-450c-a7ce-4106823bbb20.png',
        '/lovable-uploads/93841400-1ea7-4de9-acad-ab6555af2849.png',
        '/lovable-uploads/8a0a4be8-8641-4ed1-8b73-1763ad9c9593.png',
        '/lovable-uploads/43e7ee8c-6523-4701-82bf-52356d8f8f9a.png'
      ];
      
      let loadedCount = 0;
      imageUrls.forEach(url => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          if (loadedCount === imageUrls.length) {
            setImagesLoaded(true);
          }
        };
        img.onerror = () => {
          setImageErrors(prev => ({ ...prev, [url]: true }));
          loadedCount++;
          if (loadedCount === imageUrls.length) {
            setImagesLoaded(true);
          }
        };
        img.src = url;
      });
    }
  }, [useImages, questionId]);

  // Map of FontAwesome icons
  const iconMap: Record<string, any> = {
    'smile': faSmile,
    'meh': faMeh,
    'frown': faFrown,
    'clock': faClock,
    'calendar': faCalendarAlt,
    'timer': faStopwatch,
    'dumbbell': faDumbbell,
    'activity': faHeartbeat,
    'trophy': faTrophy,
    'star': faStar,
    'walking': faWalking,
    'running': faRunning,
    'yoga': faPersonWalking,
    'body': faUserNinja,
    'spine': faSpinner,
    'chart': faChartLine,
    'young': faUserNinja,
    'adult': faPersonWalking,
    'middle': faRunning,
    'senior': faWalking
  };

  // Handler for selection that will trigger immediate advancement
  const handleSelection = (selectedValue: string) => {
    onChange(selectedValue);
  };

  // Show gender selection with titles and disclaimer
  if (useImages && questionId === 'gender') {
    return (
      <div className="w-full max-w-full space-y-6">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 uppercase">
            UN PIANO PERSONALIZZATO per il tuo mal di schiena
          </h1>
          <h2 className="text-base md:text-lg text-gray-700 uppercase">
            MIGLIORA IL TUO BENESSERE CON IL NOSTRO PIANO PERSONALIZZATO
          </h2>
          <h3 className="text-sm md:text-base font-bold text-gray-600 uppercase">
            QUIZ DI 3 MINUTI
          </h3>
        </div>

        {question && (
          <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 leading-tight text-center">
            {question}
          </h2>
        )}
        
        <div className="w-full max-w-full grid grid-cols-2 gap-3 md:gap-6 mt-8">
          <button 
            type="button" 
            className={`group w-full max-w-full flex flex-col items-center rounded-2xl border-2 transition-all duration-300 bg-white relative overflow-visible h-64 md:h-80 shadow-lg hover:shadow-xl transform hover:scale-105 ${
              value === 'Maschio' ? 'border-[#71b8bc] shadow-[#71b8bc]/20' : 'border-gray-200 hover:border-gray-300'
            }`} 
            onClick={() => handleSelection('Maschio')}
          >
            {/* Loading placeholder */}
            {!imagesLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-[#71b8bc] border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            
            {/* Image container positioned to touch the footer from bottom */}
            <div className={`absolute bottom-10 md:bottom-12 left-1/2 transform -translate-x-1/2 w-40 h-44 md:w-56 md:h-64 z-10 transition-opacity duration-300 ${imagesLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <img 
                src="https://i.postimg.cc/5Nkq12fR/a33b1e79-7e26-4bce-be77-283e1cda201d.png" 
                alt="Uomo" 
                className="w-full h-full object-contain object-bottom drop-shadow-lg" 
                loading="eager"
                onError={() => setImageErrors(prev => ({ ...prev, maschio: true }))}
              />
            </div>
            
            {/* Colored footer section */}
            <div className={`absolute bottom-0 left-0 right-0 rounded-b-2xl px-4 py-3 md:px-6 md:py-4 flex items-center justify-between transition-all duration-300 ${
              value === 'Maschio' ? 'bg-[#71b8bc]' : 'bg-[#88c2aa] group-hover:bg-[#71b8bc]'
            }`}>
              <span className="font-semibold text-base md:text-lg text-white">Maschio</span>
              <FontAwesomeIcon 
                icon={faChevronRight} 
                className={`text-white transition-transform duration-300 ${
                  value === 'Maschio' ? 'transform rotate-90' : 'group-hover:transform group-hover:translate-x-1'
                }`}
                size="lg" 
              />
            </div>
          </button>
          
          <button 
            type="button" 
            className={`group w-full max-w-full flex flex-col items-center rounded-2xl border-2 transition-all duration-300 bg-white relative overflow-visible h-64 md:h-80 shadow-lg hover:shadow-xl transform hover:scale-105 ${
              value === 'Femmina' ? 'border-[#71b8bc] shadow-[#71b8bc]/20' : 'border-gray-200 hover:border-gray-300'
            }`} 
            onClick={() => handleSelection('Femmina')}
          >
            {/* Loading placeholder */}
            {!imagesLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-[#71b8bc] border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            
            {/* Image container positioned to touch the footer from bottom */}
            <div className={`absolute bottom-10 md:bottom-12 left-1/2 transform -translate-x-1/2 w-40 h-44 md:w-56 md:h-64 z-10 transition-opacity duration-300 ${imagesLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <img 
                src="https://i.postimg.cc/cHZfTKcr/88c515a2-3d6c-485a-9dda-72f4e1137cb0.png" 
                alt="Donna" 
                className="w-full h-full object-contain object-bottom drop-shadow-lg" 
                loading="eager"
                onError={() => setImageErrors(prev => ({ ...prev, femmina: true }))}
              />
            </div>
            
            {/* Colored footer section */}
            <div className={`absolute bottom-0 left-0 right-0 rounded-b-2xl px-4 py-3 md:px-6 md:py-4 flex items-center justify-between transition-all duration-300 ${
              value === 'Femmina' ? 'bg-[#71b8bc]' : 'bg-[#88c2aa] group-hover:bg-[#71b8bc]'
            }`}>
              <span className="font-semibold text-base md:text-lg text-white">Femmina</span>
              <FontAwesomeIcon 
                icon={faChevronRight} 
                className={`text-white transition-transform duration-300 ${
                  value === 'Femmina' ? 'transform rotate-90' : 'group-hover:transform group-hover:translate-x-1'
                }`}
                size="lg" 
              />
            </div>
          </button>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-xs text-gray-500">
            Facendo clic su "Maschio" o "Femmina" accetti i{' '}
            <a href="/terms-of-use" className="underline hover:text-gray-700">
              Termini di utilizzo e servizio
            </a>, l'{' '}
            <a href="/privacy-policy" className="underline hover:text-gray-700">
              Informativa sulla privacy
            </a>, l'{' '}
            <a href="/subscription-policy" className="underline hover:text-gray-700">
              Informativa sugli abbonamenti
            </a>, l'{' '}
            <a href="/money-back-guarantee" className="underline hover:text-gray-700">
              Garanzia di rimborso
            </a>{' '}
            e l'{' '}
            <a href="/cookie-policy" className="underline hover:text-gray-700">
              Informativa sui cookie
            </a>
          </p>
        </div>
      </div>
    );
  }

  // Show smaller image cards for daily_activity question
  if (questionId === 'daily_activity') {
    const activityOptions = [
      { text: 'Quasi nulla', image: '/lovable-uploads/571517df-fff1-450c-a7ce-4106823bbb20.png' },
      { text: 'Solo camminate leggere', image: '/lovable-uploads/93841400-1ea7-4de9-acad-ab6555af2849.png' },
      { text: 'Faccio sport o esercizi regolari', image: '/lovable-uploads/8a0a4be8-8641-4ed1-8b73-1763ad9c9593.png' },
      { text: 'Alterno periodi attivi e sedentari', image: '/lovable-uploads/43e7ee8c-6523-4701-82bf-52356d8f8f9a.png' }
    ];

    return (
      <div className="w-full max-w-full flex flex-col space-y-3 mt-6">
        {activityOptions.map((option, index) => (
          <button 
            key={index}
            type="button" 
            className={`w-full max-w-full flex items-center justify-between p-3 rounded-lg border-2 transition-all bg-white ${
              value === option.text ? 'border-[#71b8bc] bg-[#71b8bc]/10' : 'border-gray-300 hover:border-gray-400'
            }`} 
            onClick={() => handleSelection(option.text)}
          >
            <span className="font-medium text-base text-left">{option.text}</span>
            <div className="w-16 h-16 rounded-lg overflow-hidden ml-3 relative">
              {!imagesLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div className="w-4 h-4 border-2 border-[#71b8bc] border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              <img 
                src={option.image}
                alt={option.text}
                className={`w-full h-full object-contain transition-opacity duration-300 ${imagesLoaded ? 'opacity-100' : 'opacity-0'}`}
                loading="lazy"
                onError={() => setImageErrors(prev => ({ ...prev, [option.image]: true }))}
              />
            </div>
          </button>
        ))}
      </div>
    );
  }

  // Default view for all other questions
  return (
    <div className="w-full max-w-full space-y-3 mt-6">
      {options.map((option, index) => {
        const optionText = typeof option === 'string' ? option : option.text;
        const optionIconName = typeof option === 'string' ? null : option.iconName;
        const icon = optionIconName ? iconMap[optionIconName.toLowerCase()] || faChartLine : faChartLine;
        
        return (
          <button 
            key={index} 
            type="button" 
            className={`w-full max-w-full bg-white border-2 hover:border-[#71b8bc] text-gray-800 font-medium py-3 px-6 rounded-xl transition-all duration-200 mb-3 text-left hover:shadow-md flex items-center justify-between ${
              value === optionText 
                ? 'bg-[#e5f6f7] border-[#71b8bc] text-gray-900 shadow-md' 
                : 'border-gray-200'
            }`} 
            onClick={() => handleSelection(optionText)}
          >
            <div className="flex items-center w-full">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full mr-3 ${
                value === optionText ? 'bg-[#88c2aa]/30' : 'bg-gray-100'
              }`}>
                <FontAwesomeIcon 
                  icon={icon} 
                  className={value === optionText ? 'text-[#71b8bc]' : 'text-gray-500'} 
                  size="lg" 
                />
              </div>
              <span>{optionText}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default SingleChoice;
