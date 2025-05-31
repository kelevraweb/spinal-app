
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';

interface WellbeingLevelIndicatorProps {
  level: 'Low' | 'Medium' | 'High';
  onContinue: () => void;
}

const WellbeingLevelIndicator: React.FC<WellbeingLevelIndicatorProps> = ({ level, onContinue }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const getLevelData = () => {
    switch (level) {
      case 'High':
        return {
          title: 'HIGH',
          barPosition: 85,
          color: '#ff4444',
          description: 'Your negative effects level is high. This means you\'re experiencing significant stress and emotional challenges that need immediate attention.',
          sections: [
            { label: 'Negative effects level', value: 'HIGH', color: '#ff4444' },
            { label: 'Main difficulty', value: 'Emotional exhaustion', color: '#22c55e' },
            { label: 'Challenging period', value: 'Few weeks', color: '#22c55e' },
            { label: 'Trigger', value: 'External circumstances', color: '#22c55e' },
            { label: 'Energy level', value: 'Low', color: '#22c55e' }
          ]
        };
      case 'Medium':
        return {
          title: 'MEDIUM',
          barPosition: 60,
          color: '#ffa500',
          description: 'Your negative effects level is medium. You\'re managing well but there\'s room for improvement in your stress management.',
          sections: [
            { label: 'Negative effects level', value: 'MEDIUM', color: '#ffa500' },
            { label: 'Main difficulty', value: 'Occasional stress', color: '#22c55e' },
            { label: 'Challenging period', value: 'Some days', color: '#22c55e' },
            { label: 'Trigger', value: 'Work pressure', color: '#22c55e' },
            { label: 'Energy level', value: 'Moderate', color: '#22c55e' }
          ]
        };
      case 'Low':
        return {
          title: 'LOW',
          barPosition: 25,
          color: '#22c55e',
          description: 'Your negative effects level is low. You\'re managing stress well and maintaining good emotional balance.',
          sections: [
            { label: 'Negative effects level', value: 'LOW', color: '#22c55e' },
            { label: 'Main difficulty', value: 'Minor concerns', color: '#22c55e' },
            { label: 'Challenging period', value: 'Rare', color: '#22c55e' },
            { label: 'Trigger', value: 'Minor stressors', color: '#22c55e' },
            { label: 'Energy level', value: 'Good', color: '#22c55e' }
          ]
        };
      default:
        return {
          title: 'MEDIUM',
          barPosition: 60,
          color: '#ffa500',
          description: 'Your negative effects level is medium.',
          sections: []
        };
    }
  };

  const levelData = getLevelData();

  return (
    <div className="max-w-2xl mx-auto my-12 px-4 pt-16">
      <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Your Wellbeing Profile
          </h2>
          
          {/* Horizontal color bar */}
          <div className="relative w-full h-8 rounded-full mb-6" 
               style={{ background: 'linear-gradient(to right, #22c55e 0%, #eab308 25%, #ffa500 50%, #f97316 75%, #ff4444 100%)' }}>
            {/* Position indicator */}
            <div 
              className="absolute top-0 w-4 h-8 bg-white border-2 border-gray-800 rounded-full"
              style={{ 
                left: `${levelData.barPosition}%`,
                transform: 'translateX(-50%)'
              }}
            />
          </div>
          
          {/* Level title */}
          <div className="mb-6">
            <span 
              className="text-4xl font-bold px-4 py-2 rounded-lg text-white"
              style={{ backgroundColor: levelData.color }}
            >
              {levelData.title}
            </span>
          </div>
        </div>

        {showContent && (
          <div className="animate-fade-in">
            {/* Person image and description */}
            <div className="flex items-start gap-6 mb-8">
              <div className="w-24 h-24 flex-shrink-0">
                <img 
                  src="/lovable-uploads/e9249388-f3e1-42d9-b1ab-0d37d195d4b3.png"
                  alt="Stressed person"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1">
                <p className="text-gray-700 text-sm leading-relaxed">
                  {levelData.description}
                </p>
              </div>
            </div>

            {/* Info sections */}
            <div className="space-y-4 mb-8">
              {levelData.sections.map((section, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: section.color }}
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {section.label}:
                    </span>
                  </div>
                  <span 
                    className="text-sm font-bold"
                    style={{ color: section.color }}
                  >
                    {section.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Explanation box for HIGH level */}
            {level === 'High' && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg">
                <p className="text-red-800 text-sm">
                  <strong>HIGH negative effects:</strong> Your current stress level requires immediate attention. 
                  A personalized program can help you develop effective coping strategies and restore emotional balance.
                </p>
              </div>
            )}

            <div className="text-center">
              <Button 
                onClick={onContinue}
                size="lg" 
                className="bg-[#71b8bc] hover:bg-[#5da0a4] text-white px-8 py-3"
              >
                Get your personalized plan
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WellbeingLevelIndicator;
