
import React from 'react';
import { cn } from '@/lib/utils';

interface SingleChoiceProps {
  question: {
    id: string;
    text: string;
    options: string[];
    required?: boolean;
  };
  value: string | null;
  onChange: (value: string) => void;
  onNext?: () => void;
}

const SingleChoice: React.FC<SingleChoiceProps> = ({ 
  question, 
  value, 
  onChange, 
  onNext 
}) => {
  const handleOptionClick = (option: string) => {
    onChange(option);
    
    // Auto-advance after a short delay for better UX
    if (onNext) {
      setTimeout(() => {
        onNext();
      }, 300); // Reduced from 800ms to 300ms for faster transitions
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-center mb-6">{question.text}</h2>
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            className={cn(
              "w-full p-4 text-left border rounded-lg transition-all duration-200 hover:border-[#71b8bc] hover:bg-[#71b8bc]/5 focus:outline-none focus:ring-2 focus:ring-[#71b8bc]/50",
              value === option 
                ? "border-[#71b8bc] bg-[#71b8bc]/10 shadow-md" 
                : "border-gray-200 bg-white"
            )}
          >
            <div className="flex items-center space-x-3">
              <div className={cn(
                "w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors",
                value === option 
                  ? "border-[#71b8bc] bg-[#71b8bc]" 
                  : "border-gray-300"
              )}>
                {value === option && (
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                )}
              </div>
              <span className={cn(
                "text-sm font-medium transition-colors",
                value === option ? "text-[#71b8bc]" : "text-gray-700"
              )}>
                {option}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SingleChoice;
