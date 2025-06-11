import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getUserGender } from './QuizDataManager';

const WellbeingLevelIndicator: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [userGender, setUserGender] = useState<'male' | 'female'>('female');
  const userName = searchParams.get('name') || 'Marco';

  useEffect(() => {
    const determineGender = () => {
      console.log('=== DETERMINAZIONE GENERE WellbeingLevel ===');
      
      // Priorità 1: URL parameter
      const urlGender = searchParams.get('gender');
      console.log('URL gender:', urlGender);
      
      // Priorità 2: localStorage
      const savedGender = localStorage.getItem('userGender');
      console.log('Saved gender:', savedGender);
      
      // Priorità 3: funzione getUserGender (database)
      const dbGender = getUserGender();
      console.log('DB gender:', dbGender);
      
      let finalGender: 'male' | 'female' = 'female'; // default
      
      if (urlGender === 'male' || urlGender === 'female') {
        finalGender = urlGender;
      } else if (savedGender === 'Maschio') {
        finalGender = 'male';
      } else if (savedGender === 'Femmina') {
        finalGender = 'female';
      } else if (dbGender === 'Maschio') {
        finalGender = 'male';
      }
      
      console.log('=== GENERE FINALE WellbeingLevel ===', finalGender);
      setUserGender(finalGender);
    };
    
    determineGender();
  }, [searchParams]);

  const wellnessLevels = {
    low: {
      title: 'Basso',
      description: 'Ti senti spesso stanco e senza energia. La tua routine quotidiana è influenzata da dolori e rigidità.',
      imageMale: '/lovable-uploads/01_low_energy_male.png',
      imageFemale: '/lovable-uploads/01_low_energy_female.png',
    },
    medium: {
      title: 'Medio',
      description: 'Hai alti e bassi durante la giornata. Alcuni giorni ti senti bene, altri sono più difficili a causa del dolore.',
      imageMale: '/lovable-uploads/02_medium_energy_male.png',
      imageFemale: '/lovable-uploads/02_medium_energy_female.png',
    },
    high: {
      title: 'Alto',
      description: 'Ti senti generalmente in forma e attivo. Il dolore è gestibile e non ti impedisce di goderti la vita.',
      imageMale: '/lovable-uploads/03_high_energy_male.png',
      imageFemale: '/lovable-uploads/03_high_energy_female.png',
    },
  };

  // Determine which level to show based on URL parameter (default to medium)
  const levelParam = searchParams.get('level') || 'medium';
  const currentLevel = wellnessLevels[levelParam as keyof typeof wellnessLevels] || wellnessLevels.medium;

  // Determine the correct image based on user's gender
  const currentImage = userGender === 'male' ? currentLevel.imageMale : currentLevel.imageFemale;

  return (
    <div className="max-w-4xl mx-auto mb-8 px-4">
      {/* Debug info */}
      <div className="text-xs text-gray-500 text-center mb-4">
        Genere rilevato: {userGender} | URL: {searchParams.get('gender')} | Stored: {localStorage.getItem('userGender')}
      </div>
      
      <h2 className="text-2xl font-bold text-center mb-4">
        {userName}, ecco il tuo livello di benessere attuale:
      </h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-center mb-4">
          <img
            src={currentImage}
            alt={`Livello di benessere ${currentLevel.title}`}
            className="w-48 h-48 object-contain"
          />
        </div>
        <h3 className="text-xl font-semibold text-center mb-2">
          Livello di benessere: {currentLevel.title}
        </h3>
        <p className="text-gray-700 text-center">
          {currentLevel.description}
        </p>
      </div>
    </div>
  );
};

export default WellbeingLevelIndicator;
