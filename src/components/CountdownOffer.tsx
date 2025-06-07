
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

  const handleScrollToPricing = () => {
    // Scroll to pricing section
    const pricingElement = document.querySelector('[data-pricing-section]');
    if (pricingElement) {
      pricingElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (timeLeft <= 0) return null;

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 ${getUrgencyColor()} shadow-lg`}>
      <div className="max-w-4xl mx-auto px-2 sm:px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <span className="text-xs sm:text-sm font-medium">🔥 OFFERTA LIMITATA</span>
            
            <div className="bg-white/20 rounded px-2 py-1">
              <span className="font-bold text-sm sm:text-base">
                {formatTime(timeLeft)}
              </span>
            </div>
            
            <span className="text-xs sm:text-sm">SCONTATO</span>
          </div>
          
          <button 
            onClick={handleScrollToPricing}
            className="bg-white text-[#71b8bc] px-3 py-1 rounded text-xs sm:text-sm font-bold hover:bg-gray-100 transition-colors"
          >
            Vai al piano
          </button>
        </div>
      </div>
      
      {timeLeft <= 60 && (
        <div className="bg-red-600 text-center py-1">
          <span className="text-xs font-bold animate-pulse">
            ⚠️ ULTIMI 60 SECONDI! ⚠️
          </span>
        </div>
      )}
    </div>
  );
};

export default CountdownOffer;
