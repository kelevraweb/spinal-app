
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
    <div className={`max-w-2xl mx-auto my-8 transition-opacity duration-1000 px-4 pt-8 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* App Icon */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-black rounded-2xl mx-auto flex items-center justify-center mb-6">
          <div className="text-white text-2xl">✨</div>
        </div>
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-gray-900">
        Liven was developed using scientific practices
      </h2>
      
      <p className="text-center text-gray-600 mb-12 text-lg">
        Your journey is based on decades of research
      </p>
      
      <div className="space-y-8">
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900 mb-2">HARVARD</div>
          <div className="text-lg text-gray-600 tracking-wider">UNIVERSITY</div>
        </div>
        
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900 mb-2">UNIVERSITY OF</div>
          <div className="text-4xl font-bold text-gray-900 tracking-wider">OXFORD</div>
        </div>
        
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900 mb-2">UNIVERSITY OF</div>
          <div className="text-4xl font-bold text-gray-900 tracking-wider">CAMBRIDGE</div>
        </div>
      </div>
    </div>
  );
};

export default UniversityLogos;
