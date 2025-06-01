
import React, { useState } from 'react';

interface ScaleInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

const ScaleInput: React.FC<ScaleInputProps> = ({ 
  value, 
  onChange, 
  min = 1, 
  max = 10, 
  step = 1 
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  
  const values = Array.from({ length: (max - min) / step + 1 }, (_, i) => min + i * step);
  
  return (
    <div className="w-full max-w-full mt-8">
      <div className="flex justify-between items-center mb-2 text-sm text-gray-500">
        <span>Low: {min}</span>
        <span>High: {max}</span>
      </div>
      
      <div className="bg-gray-200 h-2 w-full rounded-full mb-6 relative">
        {/* Scale track */}
        <div
          className="absolute h-full bg-brand-primary rounded-full"
          style={{ width: `${((value - min) / (max - min)) * 100}%` }}
        ></div>
        
        {/* Current value bubble */}
        <div
          className="absolute w-8 h-8 bg-white border-4 border-brand-primary rounded-full -mt-3 transform -translate-x-1/2 flex items-center justify-center shadow-md"
          style={{ left: `${((value - min) / (max - min)) * 100}%` }}
        >
          <span className="text-xs font-bold">{value}</span>
        </div>
      </div>
      
      <div className="w-full flex justify-between">
        {values.map((val) => (
          <button
            key={val}
            type="button"
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all duration-200
              ${val === value 
                ? 'bg-brand-primary text-white font-bold' 
                : 'bg-gray-100 hover:bg-gray-200'
              }
              ${hoverValue !== null && val <= hoverValue ? 'ring-2 ring-brand-primary ring-opacity-50' : ''}
            `}
            onClick={() => onChange(val)}
            onMouseEnter={() => setHoverValue(val)}
            onMouseLeave={() => setHoverValue(null)}
          >
            {val}
          </button>
        ))}
      </div>
      
      <div className="flex justify-between mt-2 text-sm text-gray-500">
        <span>Insufficiente</span>
        <span>Eccellente</span>
      </div>
    </div>
  );
};

export default ScaleInput;
