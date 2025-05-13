
import React from 'react';

interface ColorSelectionProps {
  value: string[];
  onChange: (value: string[]) => void;
  maxSelections?: number;
}

const ColorSelection: React.FC<ColorSelectionProps> = ({ 
  value = [], 
  onChange,
  maxSelections = 3
}) => {
  const colors = [
    { name: 'Rosso', value: '#F7685B' },
    { name: 'Arancione', value: '#FFB129' },
    { name: 'Giallo', value: '#FFD84D' },
    { name: 'Verde', value: '#47B881' },
    { name: 'Blu chiaro', value: '#33C3F0' },
    { name: 'Blu', value: '#0EA5E9' },
    { name: 'Viola', value: '#9b87f5' },
    { name: 'Rosa', value: '#D946EF' },
    { name: 'Marrone', value: '#8E9196' },
    { name: 'Grigio', value: '#6E59A5' },
    { name: 'Bianco', value: '#FFFFFF' },
    { name: 'Nero', value: '#1A1F2C' },
  ];

  const handleColorClick = (colorValue: string) => {
    if (value.includes(colorValue)) {
      // Remove color if already selected
      onChange(value.filter(c => c !== colorValue));
    } else if (value.length < maxSelections) {
      // Add color if not at max selections
      onChange([...value, colorValue]);
    }
  };

  return (
    <div className="mt-8">
      <p className="text-sm text-gray-600 mb-4">
        Seleziona da 1 a {maxSelections} colori che riflettono il tuo momento attuale
      </p>
      
      <div className="grid grid-cols-4 gap-4">
        {colors.map((color) => (
          <button
            key={color.value}
            type="button"
            className={`relative h-16 rounded-lg transition-all duration-200 
              ${value.includes(color.value) ? 'ring-4 ring-brand-primary transform scale-105' : 'ring-1 ring-gray-300'}`}
            style={{ backgroundColor: color.value }}
            onClick={() => handleColorClick(color.value)}
          >
            {value.includes(color.value) && (
              <div className="absolute top-1 right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ color: color.value }}>
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            )}
            <span className={`absolute bottom-1 left-1 text-xs font-medium px-1 rounded 
              ${['#FFFFFF', '#FFD84D', '#A5DC86'].includes(color.value) ? 'text-gray-800' : 'text-white'}`}>
              {color.name}
            </span>
          </button>
        ))}
      </div>
      
      <div className="mt-4 text-sm text-gray-500">
        {value.length} / {maxSelections} colori selezionati
      </div>
    </div>
  );
};

export default ColorSelection;
