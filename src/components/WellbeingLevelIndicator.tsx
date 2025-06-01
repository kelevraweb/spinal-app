import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Info, Heart, Brain, Zap, Bed } from 'lucide-react';
interface WellbeingLevelIndicatorProps {
  level: 'Low' | 'Medium' | 'High';
  onContinue: () => void;
  gender?: string;
}
const WellbeingLevelIndicator: React.FC<WellbeingLevelIndicatorProps> = ({
  level,
  onContinue,
  gender
}) => {
  const [showContent, setShowContent] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  const getLevelColor = () => {
    switch (level) {
      case 'Low':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'High':
        return 'bg-pink-100 text-pink-800';
    }
  };
  const getLevelText = () => {
    switch (level) {
      case 'Low':
        return 'Low';
      case 'Medium':
        return 'Medium';
      case 'High':
        return 'High';
    }
  };
  const getInfoText = () => {
    switch (level) {
      case 'Low':
        return 'LOW level of negative effects on your well-being. You have good posture habits but there\'s always room for improvement.';
      case 'Medium':
        return 'MEDIUM level of negative effects on your well-being. Some adjustments to your posture habits could help you feel better.';
      case 'High':
        return 'HIGH level of negative effects on your well-being. Your current posture habits may be significantly impacting your daily comfort and health.';
    }
  };
  const getLevelPosition = () => {
    switch (level) {
      case 'Low':
        return '20%';
      case 'Medium':
        return '50%';
      case 'High':
        return '80%';
    }
  };
  const getGenderImage = () => {
    if (gender === 'Maschio') {
      return '/lovable-uploads/e7153d0f-abb0-43b0-bdbc-491e1cacbfb2.png';
    } else {
      return '/lovable-uploads/2f0d9073-87c5-4875-a918-f292d1ddbdd1.png';
    }
  };
  if (!showContent) {
    return <div className="max-w-2xl mx-auto my-12 px-4 pt-16">
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded mb-8"></div>
            <div className="h-32 bg-gray-200 rounded mb-6"></div>
            <div className="h-20 bg-gray-200 rounded mb-6"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-24 bg-gray-200 rounded"></div>
              <div className="h-24 bg-gray-200 rounded"></div>
              <div className="h-24 bg-gray-200 rounded"></div>
              <div className="h-24 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>;
  }
  return <div className="max-w-2xl mx-auto my-12 px-4 pt-16">
      <div className="bg-white rounded-3xl p-8 shadow-lg animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Summary of your Well-being Profile
          </h1>
        </div>

        {/* Negative Effects Level Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">
              Negative effects level
            </h2>
            <Badge className={`${getLevelColor()} px-3 py-1 text-sm font-medium`}>
              {getLevelText()}
            </Badge>
          </div>

          {/* Gender-based Image */}
          <div className="flex justify-center mb-6 my-0">
            <div className="w-40 h-48">
              <img src={getGenderImage()} alt={gender === 'Maschio' ? 'Uomo con mal di schiena' : 'Donna con mal di schiena'} className="w-full h-full object-contain" />
            </div>
          </div>

          {/* Level Bar */}
          <div className="relative mb-6">
            <div className="h-4 bg-gradient-to-r from-blue-400 via-yellow-400 to-red-400 rounded-full relative">
              <div className="absolute top-0 w-3 h-3 bg-white border-2 border-gray-800 rounded-full transform -translate-y-1 transition-all duration-1000" style={{
              left: getLevelPosition(),
              transform: `translateX(-50%) translateY(-25%)`
            }} />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
            </div>
            <div className="absolute text-xs font-medium text-gray-800 mt-1 transform -translate-x-1/2" style={{
            left: getLevelPosition()
          }}>
              Your level
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-pink-50 border-l-4 border-pink-400 p-4 mb-8 rounded-r-lg">
          <div className="flex items-start">
            <Info className="w-5 h-5 text-pink-400 mt-0.5 mr-3 flex-shrink-0" />
            <p className="text-gray-700 text-sm leading-relaxed">
              {getInfoText()}
            </p>
          </div>
        </div>

        {/* Indicators Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-50 p-4 rounded-xl">
            <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-3 mx-auto">
              <Heart className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="font-medium text-gray-800 text-center text-sm mb-1">Physical Health</h3>
            <p className="text-xs text-gray-600 text-center">Impact on muscles & joints</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3 mx-auto">
              <Brain className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="font-medium text-gray-800 text-center text-sm mb-1">Mental Clarity</h3>
            <p className="text-xs text-gray-600 text-center">Focus & concentration</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl">
            <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mb-3 mx-auto">
              <Zap className="w-6 h-6 text-yellow-500" />
            </div>
            <h3 className="font-medium text-gray-800 text-center text-sm mb-1">Energy Levels</h3>
            <p className="text-xs text-gray-600 text-center">Daily vitality</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3 mx-auto">
              <Bed className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="font-medium text-gray-800 text-center text-sm mb-1">Sleep Quality</h3>
            <p className="text-xs text-gray-600 text-center">Rest & recovery</p>
          </div>
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <Button onClick={onContinue} size="lg" className="bg-[#71b8bc] hover:bg-[#5da0a4] text-white px-8 py-3 w-full">
            Scopri il tuo piano personalizzato
          </Button>
        </div>
      </div>
    </div>;
};
export default WellbeingLevelIndicator;