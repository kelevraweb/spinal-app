
import React from 'react';

interface WellbeingLevelIndicatorProps {
  level: string;
  onContinue: () => void;
  gender: string;
}

const WellbeingLevelIndicator: React.FC<WellbeingLevelIndicatorProps> = ({ level, onContinue, gender }) => {
  return (
    <div className="min-h-screen bg-[#fbfaf8] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Livello di Benessere: {level}</h1>
        <p className="text-gray-600 mb-6">
          Basato sul tuo profilo ({gender}), il tuo livello di benessere è stato valutato come {level}.
        </p>
        <button
          onClick={onContinue}
          className="bg-[#71b8bc] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#5da0a4] transition-colors"
        >
          Continua
        </button>
      </div>
    </div>
  );
};

export default WellbeingLevelIndicator;
