
import React from 'react';
import { QuizOption } from '../../types/quiz';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, faMeh, faFrown, faClock, faCalendarAlt, faStopwatch, faDumbbell, faHeartbeat, faTrophy, faStar, faWalking, faRunning, faPersonWalking, faUserNinja, faSpinner, faChartLine } from '@fortawesome/free-solid-svg-icons';

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
      <div className="space-y-6">
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
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          <button 
            type="button" 
            className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all bg-white ${
              value === 'Maschio' ? 'border-[#71b8bc] bg-[#71b8bc]/10' : 'border-gray-300 hover:border-gray-400'
            }`} 
            onClick={() => handleSelection('Maschio')}
          >
            <div className="w-32 h-32 rounded-full overflow-hidden mb-3">
              <img 
                src="/lovable-uploads/8416fbc2-1a9c-4811-b5e7-3f97afd4ef1a.png" 
                alt="Uomo" 
                className="w-full h-full object-cover" 
              />
            </div>
            <span className="font-medium text-lg">Maschio</span>
          </button>
          
          <button 
            type="button" 
            className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all bg-white ${
              value === 'Femmina' ? 'border-[#71b8bc] bg-[#71b8bc]/10' : 'border-gray-300 hover:border-gray-400'
            }`} 
            onClick={() => handleSelection('Femmina')}
          >
            <div className="w-32 h-32 rounded-full overflow-hidden mb-3">
              <img 
                src="/lovable-uploads/eca5092d-dc6c-48c1-a4d7-849a52a9f1da.png" 
                alt="Donna" 
                className="w-full h-full object-cover" 
              />
            </div>
            <span className="font-medium text-lg">Femmina</span>
          </button>
        </div>
        
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            Facendo clic su "Maschio" o "Femmina" accetti i Termini di utilizzo e servizio, l'Informativa sulla privacy, l'Informativa sugli abbonamenti e l'Informativa sui cookie
          </p>
        </div>
      </div>
    );
  }

  // Show smaller image cards for daily_activity question
  if (questionId === 'daily_activity') {
    return (
      <div className="flex flex-col space-y-3 mt-6">
        <button 
          type="button" 
          className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all bg-white ${
            value === 'Quasi nulla' ? 'border-[#71b8bc] bg-[#71b8bc]/10' : 'border-gray-300 hover:border-gray-400'
          }`} 
          onClick={() => handleSelection('Quasi nulla')}
        >
          <span className="font-medium text-base text-left">Quasi nulla</span>
          <div className="w-16 h-16 rounded-lg overflow-hidden ml-3">
            <img 
              src="/lovable-uploads/571517df-fff1-450c-a7ce-4106823bbb20.png" 
              alt="Quasi nulla" 
              className="w-full h-full object-contain" 
            />
          </div>
        </button>
        
        <button 
          type="button" 
          className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all bg-white ${
            value === 'Solo camminate leggere' ? 'border-[#71b8bc] bg-[#71b8bc]/10' : 'border-gray-300 hover:border-gray-400'
          }`} 
          onClick={() => handleSelection('Solo camminate leggere')}
        >
          <span className="font-medium text-base text-left">Solo camminate leggere</span>
          <div className="w-16 h-16 rounded-lg overflow-hidden ml-3">
            <img 
              src="/lovable-uploads/93841400-1ea7-4de9-acad-ab6555af2849.png" 
              alt="Solo camminate leggere" 
              className="w-full h-full object-contain" 
            />
          </div>
        </button>
        
        <button 
          type="button" 
          className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all bg-white ${
            value === 'Faccio sport o esercizi regolari' ? 'border-[#71b8bc] bg-[#71b8bc]/10' : 'border-gray-300 hover:border-gray-400'
          }`} 
          onClick={() => handleSelection('Faccio sport o esercizi regolari')}
        >
          <span className="font-medium text-base text-left">Faccio sport o esercizi regolari</span>
          <div className="w-16 h-16 rounded-lg overflow-hidden ml-3">
            <img 
              src="/lovable-uploads/8a0a4be8-8641-4ed1-8b73-1763ad9c9593.png" 
              alt="Faccio sport" 
              className="w-full h-full object-contain" 
            />
          </div>
        </button>
        
        <button 
          type="button" 
          className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all bg-white ${
            value === 'Alterno periodi attivi e sedentari' ? 'border-[#71b8bc] bg-[#71b8bc]/10' : 'border-gray-300 hover:border-gray-400'
          }`} 
          onClick={() => handleSelection('Alterno periodi attivi e sedentari')}
        >
          <span className="font-medium text-base text-left">Alterno periodi attivi e sedentari</span>
          <div className="w-16 h-16 rounded-lg overflow-hidden ml-3">
            <img 
              src="/lovable-uploads/43e7ee8c-6523-4701-82bf-52356d8f8f9a.png" 
              alt="Alterno periodi" 
              className="w-full h-full object-contain" 
            />
          </div>
        </button>
      </div>
    );
  }

  // Default view for all other questions
  return (
    <div className="space-y-3 mt-6">
      {options.map((option, index) => {
        const optionText = typeof option === 'string' ? option : option.text;
        const optionIconName = typeof option === 'string' ? null : option.iconName;
        const icon = optionIconName ? iconMap[optionIconName.toLowerCase()] || faChartLine : faChartLine;
        
        return (
          <button 
            key={index} 
            type="button" 
            className={`option-btn bg-white ${value === optionText ? 'selected' : ''}`} 
            onClick={() => handleSelection(optionText)}
          >
            <div className="flex items-center w-full">
              <div className={`icon-circle ${value === optionText ? 'bg-[#88c2aa]/30' : 'bg-gray-100'}`}>
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
