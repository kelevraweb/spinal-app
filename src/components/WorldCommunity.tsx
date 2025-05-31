
import React, { useEffect, useState } from 'react';

interface WorldCommunityProps {
  onContinue: () => void;
}

const WorldCommunity: React.FC<WorldCommunityProps> = ({ onContinue }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedUsers, setAnimatedUsers] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    const userTimer = setTimeout(() => {
      setAnimatedUsers(true);
    }, 1500);
    
    // Auto continue after 5 seconds
    const autoTimer = setTimeout(() => {
      onContinue();
    }, 5000);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(userTimer);
      clearTimeout(autoTimer);
    };
  }, [onContinue]);

  return (
    <div className={`max-w-2xl mx-auto my-8 transition-opacity duration-1000 px-4 pt-16 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <h2 className="text-2xl font-bold text-center mb-6">
        Unisciti alla <span className="text-[#71b8bc]">community mondiale</span> di persone che hanno migliorato la loro postura
      </h2>
      
      <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-8 shadow-lg">
        {/* World map illustration */}
        <div className="relative w-full h-64 mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-green-200 rounded-2xl opacity-20"></div>
          
          {/* Animated dots representing users around the world */}
          <div className="absolute inset-0">
            {animatedUsers && (
              <>
                <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-[#71b8bc] rounded-full animate-ping"></div>
                <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-[#88c2aa] rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-[#71b8bc] rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-[#88c2aa] rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
                <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-[#71b8bc] rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-2/3 right-1/2 w-3 h-3 bg-[#88c2aa] rounded-full animate-ping" style={{ animationDelay: '2.5s' }}></div>
              </>
            )}
          </div>
          
          {/* Central world icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
              <span className="text-4xl">🌍</span>
            </div>
          </div>
        </div>
        
        {/* Statistics */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#71b8bc] mb-1">127K+</div>
            <div className="text-sm text-gray-600">Utenti attivi</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#88c2aa] mb-1">89%</div>
            <div className="text-sm text-gray-600">Miglioramenti</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#71b8bc] mb-1">45</div>
            <div className="text-sm text-gray-600">Paesi</div>
          </div>
        </div>
        
        {/* Community message */}
        <div className="bg-white rounded-xl p-6 text-center shadow-sm">
          <h3 className="font-bold text-lg mb-2 text-gray-800">
            Fai parte di una rivoluzione globale del benessere
          </h3>
          <p className="text-gray-600 text-sm">
            Migliaia di persone come te stanno già trasformando la loro vita quotidiana con il nostro metodo scientifico.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorldCommunity;
