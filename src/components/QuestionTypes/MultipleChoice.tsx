
import React, { useState } from 'react';
import { QuizOption } from '../../types/quiz';
import * as LucideIcons from 'lucide-react';

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
        
        // Dynamically get the icon component if an icon name is provided
        let IconComponent = null;
        if (optionIconName && LucideIcons[optionIconName]) {
          IconComponent = LucideIcons[optionIconName];
        }
        
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
                <IconComponent className="mr-2 text-brand-primary" size={20} />
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
