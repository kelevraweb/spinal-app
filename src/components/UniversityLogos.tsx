
import React, { useEffect, useState } from 'react';

const UniversityLogos: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const universities = [
    {
      name: 'HARVARD UNIVERSITY',
      logo: 'HARVARD\nUNIVERSITY'
    },
    {
      name: 'UNIVERSITY OF OXFORD',
      logo: 'UNIVERSITY OF\nOXFORD'
    },
    {
      name: 'UNIVERSITY OF CAMBRIDGE',
      logo: 'UNIVERSITY OF\nCAMBRIDGE'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % universities.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [universities.length]);

  return (
    <div className="my-10 py-6 max-w-2xl mx-auto animate-fade-in">
      <h2 className="text-2xl font-bold text-center mb-3">
        Metodo ispirato dalle ricerche delle università più autorevoli al mondo
      </h2>
      <p className="text-center mb-10 text-gray-600">
        Il tuo percorso si basa su decenni di ricerca scientifica
      </p>

      <div className="flex flex-col items-center space-y-5">
        {universities.map((uni, idx) => (
          <div
            key={idx}
            className={`university-logo w-64 h-16 flex items-center justify-center transition-all duration-500 ${
              idx === activeIndex ? 'scale-110 shadow-lg animate-pulse-glow' : 'opacity-70'
            }`}
            style={{
              boxShadow: idx === activeIndex ? '0 0 15px rgba(66, 153, 225, 0.6)' : 'none',
              animation: idx === activeIndex ? 'pulse 2s infinite' : 'none'
            }}
          >
            <div className="text-center font-serif">
              {uni.logo.split('\n').map((line, i) => (
                <div key={i} className={`${i === 0 ? 'text-sm' : 'text-xl font-bold'}`}>
                  {line}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UniversityLogos;
