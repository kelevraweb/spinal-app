
import React, { useState } from 'react';
import { QuizOption } from '../../types/quiz';
import {
  Activity,
  Dumbbell,
  Frown,
  Meh,
  Smile,
  Clock,
  Timer,
  Calendar,
  Award,
  Trophy,
  Star
} from 'lucide-react';

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
  
  // Check if options is array of strings or array of QuizOption
  const hasIconOptions = options.length > 0 && typeof options[0] !== 'string';

  const handleOptionClick = (optionText: string) => {
    let newValue: string[];
    
    if (value.includes(optionText)) {
      // Remove option if already selected
      newValue = value.filter(val => val !== optionText);
    } else {
      // Add option if not at max selections
      if (maxSelections && value.length >= maxSelections) {
        setError(`You can select a maximum of ${maxSelections} options`);
        setTimeout(() => setError(null), 3000);
        return;
      }
      newValue = [...value, optionText];
    }
    
    onChange(newValue);
  };

  // Icon mapping function
  const getIconComponent = (iconName: string | undefined) => {
    if (!iconName) return null;
    
    // Map of available icons
    const iconMap: Record<string, React.ReactNode> = {
      'activity': <Activity size={20} />,
      'dumbbell': <Dumbbell size={20} />,
      'frown': <Frown size={20} />,
      'meh': <Meh size={20} />,
      'smile': <Smile size={20} />,
      'clock': <Clock size={20} />,
      'timer': <Timer size={20} />,
      'calendar': <Calendar size={20} />,
      'award': <Award size={20} />,
      'trophy': <Trophy size={20} />,
      'star': <Star size={20} />
    };
    
    return iconMap[iconName.toLowerCase()] || null;
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
        
        // Get the icon component
        const IconComponent = getIconComponent(optionIconName);
        
        return (
          <button
            key={index}
            type="button"
            className={`option-btn ${value.includes(optionText) ? 'selected' : ''}`}
            onClick={() => handleOptionClick(optionText)}
          >
            <div className="w-6 h-6 rounded border-2 flex items-center justify-center mr-3 flex-shrink-0">
              {value.includes(optionText) && (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-brand-primary">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              )}
            </div>
            
            <div className="flex items-center">
              {IconComponent && (
                <span className="mr-2 text-brand-primary">{IconComponent}</span>
              )}
              <span>{optionText}</span>
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
