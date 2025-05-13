
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
    <div className={`max-w-2xl mx-auto my-8 transition-opacity duration-1000 px-4 pt-16 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <h2 className="text-2xl font-bold text-center mb-6">
        Il tuo piano è stato valutato da <span className="text-brand-primary">esperti in psicologia</span>
      </h2>
      
      <div className="bg-green-50 rounded-lg p-6 mt-6 shadow-md border border-green-100">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
          <div className="relative w-32 h-32 flex-shrink-0">
            <div className="w-32 h-32 bg-white rounded-full overflow-hidden flex items-center justify-center border-4 border-green-200 shadow-inner">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80"
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
          
          <div className="text-center md:text-left flex-grow">
            <h3 className="font-bold text-xl mb-1">Dott.ssa Anieta Dixon</h3>
            <p className="text-sm text-gray-600 mb-3">Coach e consulente in psicologia relazionale</p>
            
            <div className="bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-100 relative mb-4">
              <div className="absolute -top-2 left-4 px-2 bg-white text-sm font-semibold text-green-600 border border-green-200 rounded-full flex items-center">
                <span className="mr-1 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </span>
                Verificato
              </div>
              <p className="text-gray-700">
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
              <div className="mb-2 text-sm font-medium">Pensieri</div>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-gray-600">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
              </svg>
            </div>
            
            <div className="relative text-center">
              <div className="mb-2 text-sm font-medium">Sentimenti</div>
              <div className="w-24 h-24 rounded-full border-2 border-brand-primary flex items-center justify-center bg-white shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-primary">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold animate-pulse">
                +
              </div>
            </div>
            
            <div className="text-center">
              <div className="mb-2 text-sm font-medium">Comportamento</div>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-gray-600">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
          </div>
          
          <div className="bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-100 text-center">
            <p className="text-sm text-gray-600">
              La nostra metodologia integra il benessere emotivo con tecniche scientificamente validate per raggiungere risultati duraturi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertReview;
