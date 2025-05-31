
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';

interface WellbeingLevelIndicatorProps {
  level: 'Low' | 'Medium' | 'High';
  onContinue: () => void;
}

const WellbeingLevelIndicator: React.FC<WellbeingLevelIndicatorProps> = ({ level, onContinue }) => {
  const [progress, setProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Animate progress bar
    const timer = setTimeout(() => {
      setProgress(level === 'Low' ? 25 : level === 'Medium' ? 60 : 85);
      setShowContent(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [level]);

  const getColorScheme = () => {
    switch (level) {
      case 'Low':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          progressBg: 'bg-red-500',
          text: 'text-red-800',
          accent: 'text-red-600'
        };
      case 'Medium':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          progressBg: 'bg-yellow-500',
          text: 'text-yellow-800',
          accent: 'text-yellow-600'
        };
      case 'High':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          progressBg: 'bg-green-500',
          text: 'text-green-800',
          accent: 'text-green-600'
        };
    }
  };

  const colors = getColorScheme();

  const getMessage = () => {
    switch (level) {
      case 'Low':
        return {
          title: 'Livello di Benessere: Basso',
          description: 'Dalle tue risposte emerge che potresti beneficiare significativamente di un programma strutturato per migliorare la tua postura e ridurre i dolori.',
          recommendation: 'È importante iniziare subito un percorso mirato.'
        };
      case 'Medium':
        return {
          title: 'Livello di Benessere: Medio',
          description: 'Il tuo livello di benessere posturale è nella media, ma c\'è ancora molto margine di miglioramento per sentirti al meglio.',
          recommendation: 'Un programma personalizzato può portarti al livello successivo.'
        };
      case 'High':
        return {
          title: 'Livello di Benessere: Alto',
          description: 'Complimenti! Hai già un buon livello di benessere posturale, ma puoi sempre ottimizzare ulteriormente.',
          recommendation: 'Mantieni e migliora i tuoi risultati con il programma giusto.'
        };
    }
  };

  const message = getMessage();

  return (
    <div className="max-w-2xl mx-auto my-12 px-4 pt-16">
      <div className={`${colors.bg} ${colors.border} border-2 rounded-3xl p-8 shadow-lg`}>
        <div className="text-center mb-8">
          <h2 className={`text-3xl font-bold mb-4 ${colors.text}`}>
            {message.title}
          </h2>
        </div>

        {/* Progress Circle */}
        <div className="flex justify-center mb-8">
          <div className="relative w-48 h-48">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-gray-200"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - progress / 100)}`}
                className={colors.progressBg.replace('bg-', 'text-')}
                style={{
                  transition: 'stroke-dashoffset 2s ease-in-out'
                }}
                strokeLinecap="round"
              />
            </svg>
            
            {/* Center content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className={`text-4xl font-bold ${colors.accent}`}>
                  {showContent ? `${progress}%` : '0%'}
                </div>
                <div className={`text-sm ${colors.text} mt-1`}>
                  Benessere Posturale
                </div>
              </div>
            </div>
          </div>
        </div>

        {showContent && (
          <div className="animate-fade-in">
            <p className={`text-center text-lg mb-4 ${colors.text}`}>
              {message.description}
            </p>
            
            <div className="bg-white rounded-xl p-6 mb-6 border-l-4" style={{ borderLeftColor: colors.progressBg.includes('red') ? '#ef4444' : colors.progressBg.includes('yellow') ? '#eab308' : '#22c55e' }}>
              <p className={`font-medium ${colors.accent}`}>
                💡 {message.recommendation}
              </p>
            </div>

            <div className="text-center">
              <Button 
                onClick={onContinue}
                size="lg" 
                className="bg-[#71b8bc] hover:bg-[#5da0a4] text-white px-8 py-3"
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
