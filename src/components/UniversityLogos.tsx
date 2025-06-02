
import React from 'react';

const UniversityLogos: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-light to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-12 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Validato dalle migliori università al mondo
          </h1>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            I nostri metodi sono basati su ricerche scientifiche condotte dalle istituzioni accademiche più prestigiose
          </p>
        </div>
      </div>

      {/* Universities Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center justify-items-center">
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-serif text-black font-medium tracking-wide">
                  HARVARD<br />UNIVERSITY
                </h2>
              </div>
              
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-serif text-black font-medium tracking-wide">
                  UNIVERSITY<br />OF OXFORD
                </h2>
              </div>
              
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-serif text-black font-medium tracking-wide">
                  UNIVERSITY<br />OF CAMBRIDGE
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scientific Validation Section */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Ricerca scientifica consolidata
            </h2>
            <p className="text-lg text-gray-600 mb-12 leading-relaxed">
              I nostri algoritmi di valutazione del benessere sono basati su oltre 20 anni di ricerche 
              in psicologia positiva e neuroscienze cognitive, validate da pubblicazioni peer-reviewed 
              delle università più prestigiose al mondo.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#71b8bc] mb-2">500+</div>
                <p className="text-gray-600">Studi pubblicati</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-[#71b8bc] mb-2">20+</div>
                <p className="text-gray-600">Anni di ricerca</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-[#71b8bc] mb-2">95%</div>
                <p className="text-gray-600">Accuratezza predittiva</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Affidabilità scientifica garantita
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Ogni aspetto del nostro quiz è stato sviluppato seguendo rigorosi standard scientifici 
              e validato attraverso studi longitudinali che coinvolgono migliaia di partecipanti. 
              La nostra metodologia è riconosciuta e utilizzata da ricercatori di tutto il mondo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityLogos;
