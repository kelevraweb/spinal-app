
import React, { useState } from 'react';
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
  faPersonWalking,
  faUserNinja,
  faSquare,
  faSquareCheck,
  faChartLine
} from '@fortawesome/free-solid-svg-icons';
import { faSquare as faSquareRegular } from '@fortawesome/free-regular-svg-icons';

interface MultipleChoiceProps {
  options: string[] | QuizOption[];
  value: string[];
  onChange: (value: string[]) => void;
  maxSelections?: number;
}

const MultipleChoice: React.FC<MultipleChoiceProps> = ({ 
  options, 
  value = [], 
  onChange,
  maxSelections
}) => {
  const [error, setError] = useState<string | null>(null);

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
    'chart': faChartLine
  };

  const handleOptionClick = (optionText: string) => {
    let newValue: string[];
    
    if (value.includes(optionText)) {
      // Remove option if already selected
      newValue = value.filter(val => val !== optionText);
    } else {
      // Add option if not at max selections
      if (maxSelections && value.length >= maxSelections) {
        setError(`Puoi selezionare un massimo di ${maxSelections} opzioni`);
        setTimeout(() => setError(null), 3000);
        return;
      }
      newValue = [...value, optionText];
    }
    
    onChange(newValue);
  };

  return (
    <div className="space-y-3 mt-6">
      {maxSelections && (
        <p className="text-sm text-gray-500 mb-2">
          Seleziona fino a {maxSelections} opzioni
        </p>
      )}
      
      {options.map((option, index) => {
        // Handle both string options and QuizOption objects
        const optionText = typeof option === 'string' ? option : option.text;
        const optionIconName = typeof option === 'string' ? null : option.iconName;
        
        // Default icon if none provided
        const iconOption = optionIconName ? iconMap[optionIconName.toLowerCase()] || faChartLine : faChartLine;
        const isSelected = value.includes(optionText);
        
        return (
          <button
            key={index}
            type="button"
            className={`option-btn ${isSelected ? 'selected' : ''}`}
            onClick={() => handleOptionClick(optionText)}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <div className={`icon-circle ${isSelected ? 'bg-[#88c2aa]/30' : 'bg-gray-100'}`}>
                  <FontAwesomeIcon 
                    icon={iconOption} 
                    className={isSelected ? 'text-[#71b8bc]' : 'text-gray-500'}
                  />
                </div>
                <span className="ml-2">{optionText}</span>
              </div>
              
              <FontAwesomeIcon 
                icon={isSelected ? faSquareCheck : faSquareRegular}
                className={`${isSelected ? 'text-[#71b8bc]' : 'text-gray-400'}`}
                size="lg"
              />
            </div>
          </button>
        );
      })}
      
      {error && (
        <p className="text-red-500 text-sm mt-2 animate-fade-in">
          {error}
        </p>
      )}
    </div>
  );
};

export default MultipleChoice;
