
import React, { useEffect } from 'react';

const UniversityLogos: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`max-w-2xl mx-auto my-8 transition-opacity duration-1000 px-4 pt-20 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <h2 className="text-2xl font-bold text-center mb-8">
        Il tuo piano è stato validato dalle <span className="text-[#71b8bc]">migliori università del mondo</span>
      </h2>
      
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg p-4 shadow-md flex items-center justify-center border border-gray-100">
          <img 
            src="https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400&auto=format&fit=crop&q=80"
            alt="Harvard University" 
            className="h-12 w-auto object-contain"
          />
        </div>
        <div className="bg-white rounded-lg p-4 shadow-md flex items-center justify-center border border-gray-100">
          <img 
            src="https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=400&auto=format&fit=crop&q=80"
            alt="Stanford University" 
            className="h-12 w-auto object-contain"
          />
        </div>
        <div className="bg-white rounded-lg p-4 shadow-md flex items-center justify-center border border-gray-100">
          <img 
            src="https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400&auto=format&fit=crop&q=80"
            alt="MIT" 
            className="h-12 w-auto object-contain"
          />
        </div>
        <div className="bg-white rounded-lg p-4 shadow-md flex items-center justify-center border border-gray-100">
          <img 
            src="https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=400&auto=format&fit=crop&q=80"
            alt="Oxford University" 
            className="h-12 w-auto object-contain"
          />
        </div>
      </div>
      
      <div className="bg-blue-50 rounded-lg p-6 text-center border border-blue-100">
        <h3 className="font-bold text-lg mb-2 text-blue-800">Ricerca Scientifica Validata</h3>
        <p className="text-blue-700">
          Oltre 1.200 studi scientifici confermano l'efficacia di questo approccio per migliorare la postura e ridurre il dolore lombare.
        </p>
      </div>
    </div>
  );
};

export default UniversityLogos;
