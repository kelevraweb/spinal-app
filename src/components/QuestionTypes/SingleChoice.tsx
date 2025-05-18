
import React from 'react';
import { QuizOption } from '../../types/quiz';
import * as LucideIcons from 'lucide-react';

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
  // Check if options is array of strings or array of QuizOption
  const hasIconOptions = options.length > 0 && typeof options[0] !== 'string';
  
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

  // Default view for all other questions
  return (
    <div className="space-y-3 mt-6">
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
            className={`option-btn ${value === optionText ? 'selected' : ''}`}
            onClick={() => onChange(optionText)}
          >
            <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 flex-shrink-0">
              {value === optionText && (
                <div className="w-3 h-3 rounded-full bg-brand-primary"></div>
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
    </div>
  );
};

export default SingleChoice;
