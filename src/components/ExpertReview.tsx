
import React, { useEffect } from 'react';

const ExpertReview: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`max-w-2xl mx-auto my-8 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <h2 className="text-2xl font-bold text-center mb-6">
        Il tuo piano è stato valutato da <span className="text-brand-primary">esperti in psicologia</span>
      </h2>
      
      <div className="bg-green-50 rounded-lg p-6 mt-6">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
          <div className="relative w-32 h-32">
            <div className="w-32 h-32 bg-brand-primary rounded-full overflow-hidden flex items-center justify-center">
              <img 
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgZmlsbD0iI2RkZCIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iMzgiIHI9IjEyIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTI1LDY4IGE0MCw0MCAwIDAsMCA1MCwwIHoiIGZpbGw9IiNmZmYiLz48L3N2Zz4=" 
                alt="Dott.ssa Anieta Dixon" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-full border-4 border-green-50 flex items-center justify-center animate-bounce-slow">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
          </div>
          
          <div className="text-center md:text-left">
            <h3 className="font-bold text-xl mb-1">Dott.ssa Anieta Dixon</h3>
            <p className="text-sm text-gray-600 mb-3">Coach e consulente in psicologia relazionale</p>
            
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100 relative mb-4">
              <div className="absolute -top-2 left-4 px-2 bg-white text-sm font-semibold text-green-600">
                Verificato
              </div>
              <p className="text-gray-700 italic">
                "La Dott.ssa Anieta Dixon, coach e consulente in psicologia relazionale, ha supervisionato questo quiz per garantirne la qualità e la validità scientifica."
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center my-8">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-around mx-auto w-64 mb-8">
            <div className="text-center">
              <div className="mb-2">Pensieri</div>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-gray-600">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
              </svg>
            </div>
            
            <div className="relative text-center">
              <div className="mb-2">Sentimenti</div>
              <div className="w-32 h-32 rounded-full border-2 border-gray-300 flex items-center justify-center">
                <img 
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTAgMTBoODB2ODBIMTB6IiBmaWxsPSJub25lIiBzdHJva2U9IiNjY2MiIHN0cm9rZS13aWR0aD0iMiIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjMwIiBmaWxsPSIjZWNlY2VjIiBzdHJva2U9IiM5OTkiIHN0cm9rZS13aWR0aD0iMiIvPjxwYXRoIGQ9Ik0zMCA0MGM1LTggMTUtOCAyMCAwbTIwIDBjNS04IDE1LTggMjAgME0zMCA2MGMxMCAxMCAzMCAxMCA0MCAwIiBmaWxsPSJub25lIiBzdHJva2U9IiM2NjYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9zdmc+" 
                  alt="Cervello" 
                  className="w-16 h-16 opacity-70"
                />
              </div>
            </div>
            
            <div className="text-center">
              <div className="mb-2">Comportamento</div>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-gray-600">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertReview;
