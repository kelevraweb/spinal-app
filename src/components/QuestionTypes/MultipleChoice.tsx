
import React, { useState, useEffect } from 'react';
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
  faChartLine,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import { faSquare as faSquareRegular } from '@fortawesome/free-regular-svg-icons';

interface MultipleChoiceProps {
  options: string[] | QuizOption[];
  value: string[];
  onChange: (value: string[]) => void;
  maxSelections?: number;
  onNextClick?: () => void;
}

const MultipleChoice: React.FC<MultipleChoiceProps> = ({ 
  options, 
  value = [], 
  onChange,
  maxSelections,
  onNextClick
}) => {
  const [error, setError] = useState<string | null>(null);
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  
  // Check if at least 1 option is selected to enable Next button
  useEffect(() => {
    setIsNextEnabled(value.length >= 1);
  }, [value]);

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
        const optionText = typeof option === 'string' ? option : option.text;
        const optionIconName = typeof option === 'string' ? null : option.iconName;
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
                    className={isSelected ? 'text-[#70b8bc]' : 'text-gray-500'}
                  />
                </div>
                <span className="ml-2">{optionText}</span>
              </div>
              
              <FontAwesomeIcon 
                icon={isSelected ? faSquareCheck : faSquareRegular}
                className={`${isSelected ? 'text-[#70b8bc]' : 'text-gray-400'}`}
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
      
      {/* Next button visible with multiple selection */}
      <div className="mt-8">
        <button
          type="button"
          onClick={onNextClick}
          disabled={!isNextEnabled}
          className={`w-full py-3 rounded-lg flex items-center justify-center font-medium ${
            isNextEnabled 
              ? 'bg-[#70b8bc] text-white' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <span>Avanti</span>
          <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
        </button>
        <p className="text-center text-sm text-gray-500 mt-2">
          {!isNextEnabled ? 'Seleziona almeno 1 opzione per continuare' : ''}
        </p>
      </div>
    </div>
  );
};

export default MultipleChoice;
