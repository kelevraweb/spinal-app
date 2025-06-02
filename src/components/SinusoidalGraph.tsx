
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';

interface SinusoidalGraphProps {
  onContinue?: () => void;
}

const SinusoidalGraph: React.FC<SinusoidalGraphProps> = ({ onContinue }) => {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationStep(1);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (animationStep === 1) {
      const timer = setTimeout(() => {
        setAnimationStep(2);
      }, 2000);
      return () => clearTimeout(timer);
    }
    
    if (animationStep === 2) {
      const timer = setTimeout(() => {
        setAnimationStep(3);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [animationStep]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pt-16 pb-8 min-h-screen flex flex-col justify-between bg-white">
      <div className={`transition-opacity duration-500 ${animationStep > 0 ? 'opacity-100' : 'opacity-0'}`}>
        {/* Main Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 leading-tight px-2">
            Ecco, il tuo Piano di Gestione del 
            <span className="text-[#71b8bc]"> Benessere Personalizzato</span> è pronto!
          </h1>
        </div>
        
        {/* Mobile-optimized Chart Container */}
        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8 mb-8">
          <div className="text-center mb-6">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
              Il tuo progresso nelle prossime settimane
            </h2>
            <p className="text-sm md:text-base text-gray-600">Ecco come migliorerà il tuo benessere seguendo il piano</p>
          </div>
          
          {/* Simplified Progress Chart for Mobile */}
          <div className="relative h-48 md:h-64 mb-6">
            <svg
              viewBox="0 0 800 200"
              width="100%"
              height="100%"
              className="overflow-visible"
            >
              {/* Gradient definitions */}
              <defs>
                <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ff6b6b" />
                  <stop offset="25%" stopColor="#ffa726" />
                  <stop offset="75%" stopColor="#42a5f5" />
                  <stop offset="100%" stopColor="#66bb6a" />
                </linearGradient>
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#71b8bc" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#71b8bc" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              
              {/* Grid lines */}
              {[0, 1, 2, 3, 4].map((i) => (
                <line
                  key={`h-${i}`}
                  x1="50"
                  y1={20 + i * 40}
                  x2="750"
                  y2={20 + i * 40}
                  stroke="#f5f5f5"
                  strokeWidth="1"
                  strokeDasharray="3,3"
                />
              ))}
              
              {/* Area under curve */}
              <path
                d="M50,160 Q200,140 350,100 T650,40 L650,180 L50,180 Z"
                fill="url(#areaGradient)"
                opacity={animationStep >= 2 ? "1" : "0"}
                style={{ transition: "opacity 1s ease" }}
              />
              
              {/* Main progress curve */}
              <path
                d="M50,160 Q200,140 350,100 T650,40"
                fill="none"
                stroke="url(#curveGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={animationStep >= 2 ? "0" : "1500,1500"}
                strokeDashoffset={animationStep >= 2 ? "0" : "1500"}
                style={{ 
                  transition: "stroke-dashoffset 2s ease-in-out",
                  filter: "drop-shadow(0 2px 4px rgba(113, 184, 188, 0.3))"
                }}
              />
              
              {/* Data points */}
              {animationStep >= 2 && [
                { x: 50, y: 160, week: "Oggi", value: "20%" },
                { x: 350, y: 100, week: "Settimana 2", value: "60%" },
                { x: 650, y: 40, week: "Con Liven", value: "90%" }
              ].map((point, i) => (
                <g key={i}>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="6"
                    fill="white"
                    stroke="#71b8bc"
                    strokeWidth="2"
                    style={{ 
                      animationDelay: `${i * 0.4}s`,
                      filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.2))"
                    }}
                  />
                  <text
                    x={point.x}
                    y={point.y - 15}
                    textAnchor="middle"
                    className="text-xs fill-gray-700 font-bold"
                  >
                    {point.value}
                  </text>
                </g>
              ))}
              
              {/* Labels */}
              <text x="50" y="195" textAnchor="middle" className="text-xs fill-gray-600">Oggi</text>
              <text x="350" y="195" textAnchor="middle" className="text-xs fill-gray-600">Settimana 2</text>
              <text x="650" y="195" textAnchor="middle" className="text-xs fill-[#71b8bc] font-bold">Con Liven</text>
            </svg>
          </div>
        </div>

        {/* Benefits Section */}
        <div 
          className={`bg-gradient-to-r from-[#71b8bc]/10 to-[#88c2aa]/10 rounded-2xl p-4 md:p-6 mb-8 transition-all duration-500 ${
            animationStep >= 3 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
          }`}
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            Cosa otterrai con il tuo piano personalizzato:
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {[
              "Riduzione significativa del dolore lombare",
              "Miglioramento della postura quotidiana",
              "Maggiore mobilità e flessibilità",
              "Aumento dei livelli di energia"
            ].map((benefit, index) => (
              <div key={index} className="flex items-start">
                <div className="w-2 h-2 bg-[#71b8bc] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-gray-700 text-sm md:text-base">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Fixed bottom button */}
      <div 
        className={`w-full transition-opacity duration-500 ${
          animationStep >= 3 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="text-center mb-4">
          <Button 
            onClick={onContinue} 
            size="lg"
            className="w-full max-w-md bg-[#71b8bc] hover:bg-[#5da0a4] text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Inizia il tuo percorso di benessere
          </Button>
        </div>
        
        <p className="text-sm text-gray-600 text-center max-w-md mx-auto px-4">
          Il tuo piano ti aspetta. Inizia oggi stesso il tuo viaggio verso il benessere!
        </p>
      </div>
    </div>
  );
};

export default SinusoidalGraph;
