
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';

interface WellbeingLevelIndicatorProps {
  level: 'Low' | 'Medium' | 'High';
  onContinue: () => void;
}

const WellbeingLevelIndicator: React.FC<WellbeingLevelIndicatorProps> = ({ level, onContinue }) => {
  const [sliderPosition, setSliderPosition] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Animate slider position
    const timer = setTimeout(() => {
      setSliderPosition(level === 'Low' ? 25 : level === 'Medium' ? 60 : 85);
      setShowContent(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [level]);

  const getColorByLevel = () => {
    if (level === 'Low') return '#ff1aa9';
    if (level === 'Medium') return '#8af8fe'; 
    return '#19f1fe';
  };

  return (
    <div className="max-w-2xl mx-auto my-12 px-4 pt-16">
      <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Il tuo livello di benessere
          </h2>
          
          {/* Person silhouette with wellbeing level */}
          <div className="relative flex justify-center mb-8">
            <div className="w-32 h-40 bg-gray-300 rounded-full relative" style={{
              background: 'linear-gradient(180deg, #f3f4f6 0%, #e5e7eb 100%)',
              clipPath: 'ellipse(40px 60px at center)'
            }}>
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gray-400 rounded-full"></div>
            </div>
            
            {/* Level indicator */}
            <div 
              className="absolute top-8 right-0 px-3 py-1 rounded-full text-white font-semibold text-sm"
              style={{ backgroundColor: getColorByLevel() }}
            >
              {level}
            </div>
          </div>

          {/* Wellbeing slider */}
          <div className="mb-8">
            <div className="wellbeing-slider mx-auto max-w-xs">
              <div 
                className="slider-thumb"
                style={{ 
                  left: `${sliderPosition}%`,
                  borderColor: getColorByLevel()
                }}
              >
                <div 
                  className="slider-label"
                  style={{ backgroundColor: getColorByLevel() }}
                >
                  {level}
                </div>
              </div>
            </div>
            
            <div className="flex justify-between text-xs text-gray-500 mt-2 max-w-xs mx-auto">
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
            </div>
          </div>
        </div>

        {showContent && (
          <div className="animate-fade-in">
            {/* Info boxes */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-gray-600 text-sm mb-1">Main difficulty</div>
                <div className="font-semibold text-gray-800">Posture pain</div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-gray-600 text-sm mb-1">Challenging period</div>
                <div className="font-semibold text-gray-800">Work hours</div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-gray-600 text-sm mb-1">Trigger</div>
                <div className="font-semibold text-gray-800">Sitting too long</div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-gray-600 text-sm mb-1">Energy level</div>
                <div className="font-semibold text-gray-800">{level}</div>
              </div>
            </div>

            {/* Description based on level */}
            <div className="bg-blue-50 rounded-lg p-4 mb-6 border-l-4 border-blue-500">
              <p className="text-blue-800 text-sm">
                {level === 'Low' && "Il tuo livello di benessere è basso. Un programma strutturato può aiutarti significativamente a migliorare la tua postura e ridurre i dolori."}
                {level === 'Medium' && "Il tuo livello di benessere è nella media. C'è ancora spazio per miglioramenti significativi nel tuo benessere posturale."}
                {level === 'High' && "Hai un buon livello di benessere! Mantieni e ottimizza ulteriormente i tuoi risultati con il programma giusto."}
              </p>
            </div>

            <div className="text-center">
              <Button 
                onClick={onContinue}
                size="lg" 
                className="bg-[#71b8bc] hover:bg-[#5da0a4] text-white px-8 py-3"
                style={{ background: '#71b8bc !important', color: 'white !important' }}
              >
                Scopri il tuo piano personalizzato
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WellbeingLevelIndicator;
