
import React, { useState, useEffect } from 'react';

interface CountdownOfferProps {
  onExpired: () => void;
}

const CountdownOffer: React.FC<CountdownOfferProps> = ({ onExpired }) => {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  useEffect(() => {
    if (timeLeft <= 0) {
      onExpired();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          onExpired();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onExpired]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getUrgencyColor = () => {
    if (timeLeft <= 120) return 'bg-red-500 text-white'; // Last 2 minutes
    if (timeLeft <= 300) return 'bg-orange-500 text-white'; // Last 5 minutes
    return 'bg-[#71b8bc] text-white';
  };

  if (timeLeft <= 0) return null;

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 ${getUrgencyColor()} shadow-lg`}>
      <div className="max-w-4xl mx-auto px-2 sm:px-4 py-2 sm:py-3">
        <div className="flex items-center justify-center text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-3">
            <div className="flex items-center space-x-2">
              <span className="text-xs sm:text-sm font-medium">🔥 OFFERTA LIMITATA</span>
            </div>
            
            <div className="bg-white/20 rounded-lg px-2 sm:px-3 py-1">
              <span className="font-bold text-sm sm:text-lg">
                {formatTime(timeLeft)}
              </span>
            </div>
            
            <div className="text-xs sm:text-sm">
              SCONTATO
            </div>
          </div>
        </div>
      </div>
      
      {timeLeft <= 60 && (
        <div className="bg-red-600 text-center py-1">
          <span className="text-xs sm:text-sm font-bold animate-pulse">
            ⚠️ ULTIMI 60 SECONDI! ⚠️
          </span>
        </div>
      )}
    </div>
  );
};

export default CountdownOffer;
