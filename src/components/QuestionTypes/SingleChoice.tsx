
import React from 'react';
import { QuizOption } from '../../types/quiz';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSmile, 
  faMeh, 
  faFrown, 
  faClock, 
  faCalendarAlt, 
  faStopwatch, 
  faDumbbell, 
  faHeartbeat, 
  faTrophy, 
  faStar, 
  faWalking,
  faRunning,
  faYoga,
  faPerson,
  faSpine,
  faChartLine
} from '@fortawesome/free-solid-svg-icons';

interface SingleChoiceProps {
  options: string[] | QuizOption[];
  value: string;
  onChange: (value: string) => void;
  useImages?: boolean;
  questionId?: string;
}

const SingleChoice: React.FC<SingleChoiceProps> = ({ 
  options, 
  value, 
  onChange, 
  useImages = false,
  questionId
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
    'yoga': faYoga,
    'body': faPerson,
    'spine': faSpine, // Might need to use a different icon if this isn't available
    'chart': faChartLine
  };
  
  // Show image cards for gender selection
  if (useImages && questionId === 'gender') {
    return (
      <div className="grid grid-cols-2 gap-4 mt-6">
        <button
          type="button"
          className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all ${
            value === 'Maschio' 
              ? 'border-brand-primary bg-brand-primary/10' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onClick={() => onChange('Maschio')}
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
          className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all ${
            value === 'Femmina' 
              ? 'border-brand-primary bg-brand-primary/10' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onClick={() => onChange('Femmina')}
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
    );
  }

  // Default view for all other questions - removed the circle selector
  return (
    <div className="space-y-3 mt-6">
      {options.map((option, index) => {
        // Handle both string options and QuizOption objects
        const optionText = typeof option === 'string' ? option : option.text;
        const optionIconName = typeof option === 'string' ? null : option.iconName;
        
        // Default icon if none provided
        const icon = optionIconName ? iconMap[optionIconName.toLowerCase()] || faChartLine : faChartLine;
        
        return (
          <button
            key={index}
            type="button"
            className={`option-btn ${value === optionText ? 'selected' : ''}`}
            onClick={() => onChange(optionText)}
          >
            <div className="flex items-center w-full">
              <FontAwesomeIcon 
                icon={icon} 
                className={`mr-3 ${value === optionText ? 'text-brand-primary text-xl' : 'text-gray-400'}`}
                size="lg"
              />
              <span>{optionText}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default SingleChoice;
