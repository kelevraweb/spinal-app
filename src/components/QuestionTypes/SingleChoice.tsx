
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
}

const SingleChoice: React.FC<SingleChoiceProps> = ({
  options,
  value,
  onChange,
  useImages = false,
  questionId,
  autoAdvance = false
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
    // Changed from faYoga to faPersonWalking
    'body': faUserNinja,
    // Changed from faPerson to faUserNinja
    'spine': faSpinner,
    // Changed from faSpine to faSpinner
    'chart': faChartLine
  };

  // Handler for selection that can trigger immediate advancement
  const handleSelection = (selectedValue: string) => {
    onChange(selectedValue);
  };

  // Show image cards for gender selection
  if (useImages && questionId === 'gender') {
    return <div className="grid grid-cols-2 gap-4 mt-6">
        <button type="button" className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all ${value === 'Maschio' ? 'border-brand-primary bg-brand-light' : 'border-gray-300 hover:border-gray-400'}`} onClick={() => handleSelection('Maschio')}>
          <div className="w-32 h-32 rounded-full overflow-hidden mb-3">
            <img src="/lovable-uploads/8416fbc2-1a9c-4811-b5e7-3f97afd4ef1a.png" alt="Uomo" className="w-full h-full object-cover" />
          </div>
          <span className="font-medium text-lg">Maschio</span>
        </button>
        
        <button type="button" className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all ${value === 'Femmina' ? 'border-brand-primary bg-brand-light' : 'border-gray-300 hover:border-gray-400'}`} onClick={() => handleSelection('Femmina')}>
          <div className="w-32 h-32 rounded-full overflow-hidden mb-3">
            <img src="/lovable-uploads/eca5092d-dc6c-48c1-a4d7-849a52a9f1da.png" alt="Donna" className="w-full h-full object-cover" />
          </div>
          <span className="font-medium text-lg">Femmina</span>
        </button>
      </div>;
  }

  // Show image cards for daily_activity question - vertical layout with image on right
  if (questionId === 'daily_activity') {
    return <div className="flex flex-col space-y-4 mt-6">
        <button type="button" className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${value === 'Quasi nulla' ? 'border-brand-primary bg-brand-light' : 'border-gray-300 hover:border-gray-400'}`} onClick={() => handleSelection('Quasi nulla')}>
          <span className="font-medium text-lg text-left">Quasi nulla</span>
          <div className="w-24 h-24 rounded-lg overflow-hidden ml-4">
            <img src="/lovable-uploads/571517df-fff1-450c-a7ce-4106823bbb20.png" alt="Quasi nulla" className="w-full h-full object-contain" />
          </div>
        </button>
        
        <button type="button" className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${value === 'Solo camminate leggere' ? 'border-brand-primary bg-brand-light' : 'border-gray-300 hover:border-gray-400'}`} onClick={() => handleSelection('Solo camminate leggere')}>
          <span className="font-medium text-lg text-left">Solo camminate leggere</span>
          <div className="w-24 h-24 rounded-lg overflow-hidden ml-4">
            <img src="/lovable-uploads/93841400-1ea7-4de9-acad-ab6555af2849.png" alt="Solo camminate leggere" className="w-full h-full object-contain" />
          </div>
        </button>
        
        <button type="button" className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${value === 'Faccio sport o esercizi regolari' ? 'border-brand-primary bg-brand-light' : 'border-gray-300 hover:border-gray-400'}`} onClick={() => handleSelection('Faccio sport o esercizi regolari')}>
          <span className="font-medium text-lg text-left">Faccio sport o esercizi regolari</span>
          <div className="w-24 h-24 rounded-lg overflow-hidden ml-4">
            <img src="/lovable-uploads/8a0a4be8-8641-4ed1-8b73-1763ad9c9593.png" alt="Faccio sport" className="w-full h-full object-contain" />
          </div>
        </button>
        
        <button type="button" className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${value === 'Alterno periodi attivi e sedentari' ? 'border-brand-primary bg-brand-light' : 'border-gray-300 hover:border-gray-400'}`} onClick={() => handleSelection('Alterno periodi attivi e sedentari')}>
          <span className="font-medium text-lg text-left">Alterno periodi attivi e sedentari</span>
          <div className="w-24 h-24 rounded-lg overflow-hidden ml-4">
            <img src="/lovable-uploads/43e7ee8c-6523-4701-82bf-52356d8f8f9a.png" alt="Alterno periodi" className="w-full h-full object-contain" />
          </div>
        </button>
      </div>;
  }

  // Default view for all other questions - with icon in a light circle
  return <div className="space-y-3 mt-6">
      {options.map((option, index) => {
      // Handle both string options and QuizOption objects
      const optionText = typeof option === 'string' ? option : option.text;
      const optionIconName = typeof option === 'string' ? null : option.iconName;

      // Default icon if none provided
      const icon = optionIconName ? iconMap[optionIconName.toLowerCase()] || faChartLine : faChartLine;
      return <button key={index} type="button" className={`option-btn ${value === optionText ? 'selected' : ''}`} onClick={() => handleSelection(optionText)}>
            <div className="flex items-center w-full">
              <div className={`icon-circle ${value === optionText ? 'bg-brand-light' : 'bg-gray-100'}`}>
                <FontAwesomeIcon icon={icon} className={value === optionText ? 'text-brand-primary' : 'text-gray-500'} size="lg" />
              </div>
              <span>{optionText}</span>
            </div>
          </button>;
    })}
    </div>;
};

export default SingleChoice;
