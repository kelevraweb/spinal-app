
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
    <div className="min-h-screen bg-gray-100 py-16 px-4">
      <div className={`max-w-4xl mx-auto transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-gradient-to-r from-[#71b8bc] to-[#88c2aa] rounded-3xl mx-auto flex items-center justify-center mb-8 shadow-lg">
            <div className="text-white text-3xl">✨</div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Liven è stato sviluppato utilizzando pratiche scientifiche
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Il tuo percorso è basato su decenni di ricerca delle più prestigiose università al mondo
          </p>
        </div>
        
        {/* University Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Harvard Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="mb-6">
              <div className="w-16 h-16 bg-red-600 rounded-xl mx-auto flex items-center justify-center mb-4">
                <span className="text-white font-bold text-xl">H</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">HARVARD</h3>
            <p className="text-lg text-gray-600 tracking-wider font-medium">UNIVERSITY</p>
            <div className="mt-6 text-sm text-gray-500">
              Ricerca sul benessere fisico e mentale
            </div>
          </div>
          
          {/* Oxford Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="mb-6">
              <div className="w-16 h-16 bg-blue-800 rounded-xl mx-auto flex items-center justify-center mb-4">
                <span className="text-white font-bold text-xl">O</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">UNIVERSITY OF</h3>
            <p className="text-lg text-gray-600 tracking-wider font-medium">OXFORD</p>
            <div className="mt-6 text-sm text-gray-500">
              Studi sulla postura e mobilità
            </div>
          </div>
          
          {/* Cambridge Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-700 rounded-xl mx-auto flex items-center justify-center mb-4">
                <span className="text-white font-bold text-xl">C</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">UNIVERSITY OF</h3>
            <p className="text-lg text-gray-600 tracking-wider font-medium">CAMBRIDGE</p>
            <div className="mt-6 text-sm text-gray-500">
              Biomeccanica e movimento umano
            </div>
          </div>
        </div>
        
        {/* Bottom Stats Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Validato dalla comunità scientifica internazionale
            </h2>
            <p className="text-gray-600">I nostri metodi sono basati su oltre 50 studi peer-reviewed</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#71b8bc] mb-2">50+</div>
              <p className="text-gray-600">Studi scientifici</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#71b8bc] mb-2">15</div>
              <p className="text-gray-600">Università coinvolte</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#71b8bc] mb-2">10K+</div>
              <p className="text-gray-600">Partecipanti agli studi</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityLogos;
