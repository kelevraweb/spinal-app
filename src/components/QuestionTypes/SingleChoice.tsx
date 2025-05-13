
import React from 'react';

interface SingleChoiceProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

const SingleChoice: React.FC<SingleChoiceProps> = ({ options, value, onChange }) => {
  return (
    <div className="space-y-3 mt-6">
      {options.map((option, index) => (
        <button
          key={index}
          type="button"
          className={`option-btn ${value === option ? 'selected' : ''}`}
          onClick={() => onChange(option)}
        >
          <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 flex-shrink-0">
            {value === option && (
              <div className="w-3 h-3 rounded-full bg-brand-primary"></div>
            )}
          </div>
          {option}
        </button>
      ))}
    </div>
  );
};

export default SingleChoice;
