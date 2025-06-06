
import React from 'react';

const UniversityLogos: React.FC = () => {
  return (
    <div className="pt-24 pb-16">
      {/* Title positioned under TopNavBar */}
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
          Validato dalle migliori università al mondo
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          I nostri metodi sono basati su ricerche scientifiche condotte dalle istituzioni accademiche più prestigiose
        </p>
      </div>

      {/* Universities Section - 2x2 Grid */}
      <div className="mb-12">
        <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto px-4">
          <div className="text-center">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-lg md:text-xl font-serif text-black font-medium tracking-wide">
                HARVARD<br />UNIVERSITY
              </h2>
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-lg md:text-xl font-serif text-black font-medium tracking-wide">
                UNIVERSITY<br />OF OXFORD
              </h2>
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-lg md:text-xl font-serif text-black font-medium tracking-wide">
                UNIVERSITY<br />OF CAMBRIDGE
              </h2>
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-lg md:text-xl font-serif text-black font-medium tracking-wide">
                STANFORD<br />UNIVERSITY
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Scientific Validation Section */}
      <div className="bg-gray-50 rounded-xl p-6 mb-8 mx-4">
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
            Ricerca scientifica consolidata
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            I nostri algoritmi di valutazione del benessere sono basati su oltre 20 anni di ricerche 
            in psicologia positiva e neuroscienze cognitive, validate da pubblicazioni peer-reviewed 
            delle università più prestigiose al mondo.
          </p>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[#71b8bc] mb-1">500+</div>
              <p className="text-sm text-gray-600">Studi pubblicati</p>
            </div>
            
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[#71b8bc] mb-1">20+</div>
              <p className="text-sm text-gray-600">Anni di ricerca</p>
            </div>
            
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[#71b8bc] mb-1">95%</div>
              <p className="text-sm text-gray-600">Accuratezza predittiva</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Section */}
      <div className="text-center px-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
          Affidabilità scientifica garantita
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Ogni aspetto del nostro quiz è stato sviluppato seguendo rigorosi standard scientifici 
          e validato attraverso studi longitudinali che coinvolgono migliaia di partecipanti. 
          La nostra metodologia è riconosciuta e utilizzata da ricercatori di tutto il mondo.
        </p>
      </div>
    </div>
  );
};

export default UniversityLogos;
