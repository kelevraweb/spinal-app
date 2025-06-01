
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
        return 'Basso';
      case 'Medium':
        return 'Medio';
      case 'High':
        return 'Alto';
    }
  };

  const getInfoText = () => {
    switch (level) {
      case 'Low':
        return 'Livello BASSO di effetti negativi sul tuo benessere. Hai buone abitudini posturali ma c\'è sempre spazio per miglioramenti.';
      case 'Medium':
        return 'Livello MEDIO di effetti negativi sul tuo benessere. Alcuni aggiustamenti alle tue abitudini posturali potrebbero aiutarti a sentirti meglio.';
      case 'High':
        return 'Livello ALTO di effetti negativi sul tuo benessere. Le tue attuali abitudini posturali potrebbero impattare significativamente il tuo comfort quotidiano e la tua salute.';
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
    return (
      <div className="mx-auto my-12 px-4 pt-16" style={{ maxWidth: '580px' }}>
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
      </div>
    );
  }

  return (
    <div className="mx-auto my-12 px-4 pt-16" style={{ maxWidth: '580px' }}>
      <div className="bg-white rounded-3xl p-8 shadow-lg animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Riepilogo del tuo Profilo di Benessere
          </h1>
        </div>

        {/* Negative Effects Level Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">
              Livello di effetti negativi
            </h2>
            <Badge className={`${getLevelColor()} px-3 py-1 text-sm font-medium`}>
              {getLevelText()}
            </Badge>
          </div>

          {/* Gender-based Image */}
          <div className="flex justify-center mb-6 py-0 my-0">
            <div className="w-40 h-48">
              <img 
                src={getGenderImage()} 
                alt={gender === 'Maschio' ? 'Uomo con mal di schiena' : 'Donna con mal di schiena'} 
                className="w-full h-full object-contain" 
              />
            </div>
          </div>

          {/* Level Bar */}
          <div className="relative mb-6">
            <div className="h-4 bg-gradient-to-r from-[#71b8bc] via-yellow-400 to-red-400 rounded-full relative">
              <div 
                className="absolute top-0 w-3 h-3 bg-white border-2 border-gray-800 rounded-full transform -translate-y-1 transition-all duration-1000" 
                style={{
                  left: getLevelPosition(),
                  transform: `translateX(-50%) translateY(-25%)`
                }} 
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>Basso</span>
              <span>Medio</span>
              <span>Alto</span>
            </div>
            <div 
              className="absolute text-xs font-medium text-gray-800 mt-1 transform -translate-x-1/2" 
              style={{ left: getLevelPosition() }}
            >
              Il tuo livello
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-[#71b8bc]/10 border-l-4 border-[#71b8bc] p-4 mb-8 rounded-r-lg">
          <div className="flex items-start">
            <Info className="w-5 h-5 text-[#71b8bc] mt-0.5 mr-3 flex-shrink-0" />
            <p className="text-gray-700 text-sm leading-relaxed">
              {getInfoText()}
            </p>
          </div>
        </div>

        {/* Indicators Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-50 p-4 rounded-xl">
            <div className="flex items-center justify-center w-12 h-12 bg-[#71b8bc]/20 rounded-full mb-3 mx-auto">
              <Heart className="w-6 h-6 text-[#71b8bc]" />
            </div>
            <h3 className="font-medium text-gray-800 text-center text-sm mb-1">Salute Fisica</h3>
            <p className="text-xs text-gray-600 text-center">Impatto su muscoli e articolazioni</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl">
            <div className="flex items-center justify-center w-12 h-12 bg-[#88c2aa]/20 rounded-full mb-3 mx-auto">
              <Brain className="w-6 h-6 text-[#88c2aa]" />
            </div>
            <h3 className="font-medium text-gray-800 text-center text-sm mb-1">Chiarezza Mentale</h3>
            <p className="text-xs text-gray-600 text-center">Concentrazione e focus</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl">
            <div className="flex items-center justify-center w-12 h-12 bg-[#71b8bc]/20 rounded-full mb-3 mx-auto">
              <Zap className="w-6 h-6 text-[#71b8bc]" />
            </div>
            <h3 className="font-medium text-gray-800 text-center text-sm mb-1">Livelli di Energia</h3>
            <p className="text-xs text-gray-600 text-center">Vitalità quotidiana</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl">
            <div className="flex items-center justify-center w-12 h-12 bg-[#88c2aa]/20 rounded-full mb-3 mx-auto">
              <Bed className="w-6 h-6 text-[#88c2aa]" />
            </div>
            <h3 className="font-medium text-gray-800 text-center text-sm mb-1">Qualità del Sonno</h3>
            <p className="text-xs text-gray-600 text-center">Riposo e recupero</p>
          </div>
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <Button 
            onClick={onContinue} 
            size="lg" 
            className="bg-[#71b8bc] hover:bg-[#5da0a4] text-white px-8 py-3 w-full"
          >
            Scopri il tuo piano personalizzato
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WellbeingLevelIndicator;
