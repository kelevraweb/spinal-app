
import React, { useState } from 'react';

interface MultipleChoiceProps {
  options: string[];
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

  const handleOptionClick = (option: string) => {
    let newValue: string[];
    
    if (value.includes(option)) {
      // Remove option if already selected
      newValue = value.filter(val => val !== option);
    } else {
      // Add option if not at max selections
      if (maxSelections && value.length >= maxSelections) {
        setError(`You can select a maximum of ${maxSelections} options`);
        setTimeout(() => setError(null), 3000);
        return;
      }
      newValue = [...value, option];
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
      
      {options.map((option, index) => (
        <button
          key={index}
          type="button"
          className={`option-btn ${value.includes(option) ? 'selected' : ''}`}
          onClick={() => handleOptionClick(option)}
        >
          <div className="w-6 h-6 rounded border-2 flex items-center justify-center mr-3 flex-shrink-0">
            {value.includes(option) && (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-brand-primary">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            )}
          </div>
          {option}
        </button>
      ))}
      
      {error && (
        <p className="text-red-500 text-sm mt-2 animate-fade-in">
          {error}
        </p>
      )}
    </div>
  );
};

export default MultipleChoice;
