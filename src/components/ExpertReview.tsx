
import React, { useEffect } from 'react';
import OptimizedImage from './OptimizedImage';

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
        Il tuo piano è stato valutato da <span className="text-[#71b8bc]">esperti in fisioterapia e posturologia</span>
      </h2>
      
      <div className="bg-green-50 rounded-lg p-6 mt-6 shadow-md border border-green-100">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
          <div className="relative w-32 h-32 flex-shrink-0">
            <div className="w-32 h-32 bg-white rounded-full overflow-hidden flex items-center justify-center border-4 border-[#88c2aa]/50 shadow-inner">
              <OptimizedImage 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80"
                alt="Dott.ssa Federica Sabbatini" 
                className="w-full h-full object-cover"
                width={128}
                height={128}
                loading="eager"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-full border-4 border-green-50 flex items-center justify-center animate-bounce-slow">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#71b8bc]">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
          </div>
          
          <div className="text-center md:text-left flex-grow">
            <h3 className="font-bold text-xl mb-1">Dott.ssa Federica Sabbatini</h3>
            <p className="text-sm text-gray-600 mb-3">Fisioterapista e specialista in posturologia</p>
            
            <div className="bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-100 relative mb-4">
              <div className="absolute -top-2 left-4 px-2 bg-white text-sm font-semibold text-[#71b8bc] border border-[#88c2aa]/30 rounded-full flex items-center">
                <span className="mr-1 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </span>
                Verificato
              </div>
              <p className="text-gray-700">
                "La Dott.ssa Federica Sabbatini, specialista in posturologia, ha supervisionato questo quiz per garantirne la qualità e la validità scientifica."
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center my-8 max-w-md mx-auto">
        <div className="w-full">
          <div className="flex items-center justify-around mx-auto w-64 mb-8">
            <div className="text-center">
              <div className="mb-2 text-sm font-medium">Postura</div>
              <div className="w-16 h-16 bg-[#71b8bc]/10 rounded-full flex items-center justify-center">
                <span className="text-2xl">🧍</span>
              </div>
            </div>
            
            <div className="relative text-center">
              <div className="mb-2 text-sm font-medium">Movimento</div>
              <div className="w-24 h-24 rounded-full border-2 border-[#71b8bc] flex items-center justify-center bg-white shadow-md">
                <span className="text-3xl">🏃</span>
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#88c2aa] rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold animate-pulse">
                +
              </div>
            </div>
            
            <div className="text-center">
              <div className="mb-2 text-sm font-medium">Benessere</div>
              <div className="w-16 h-16 bg-[#88c2aa]/10 rounded-full flex items-center justify-center">
                <span className="text-2xl">💚</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-100 text-center">
            <p className="text-sm text-gray-600">
              La nostra metodologia integra il benessere posturale con tecniche scientificamente validate per raggiungere risultati duraturi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertReview;
