
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
    <div className="max-w-2xl mx-auto px-4 pt-16 min-h-screen flex flex-col justify-center bg-white">
      <div className={`transition-opacity duration-500 ${animationStep > 0 ? 'opacity-100' : 'opacity-0'}`}>
        {/* Main Title */}
        <div className="text-center mb-12">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Ecco, il tuo Piano di Gestione del 
            <span className="text-[#71b8bc]"> Benessere Personalizzato</span> è pronto!
          </h1>
        </div>
        
        {/* Chart Container */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Il tuo progresso nelle prossime settimane
            </h2>
            <p className="text-gray-600">Ecco come migliorerà il tuo benessere seguendo il piano</p>
          </div>
          
          {/* Progress Chart */}
          <div className="relative h-64 mb-8">
            <svg
              viewBox="0 0 800 200"
              width="100%"
              height="100%"
              className="overflow-visible"
            >
              {/* Grid lines - horizontal */}
              {[0, 1, 2, 3, 4].map((i) => (
                <line
                  key={`h-${i}`}
                  x1="80"
                  y1={40 + i * 30}
                  x2="720"
                  y2={40 + i * 30}
                  stroke="#f0f0f0"
                  strokeWidth="1"
                />
              ))}
              
              {/* Grid lines - vertical */}
              {[0, 1, 2, 3, 4].map((i) => (
                <line
                  key={`v-${i}`}
                  x1={80 + i * 160}
                  y1="40"
                  x2={80 + i * 160}
                  y2="160"
                  stroke="#f0f0f0"
                  strokeWidth="1"
                />
              ))}
              
              {/* Progress curve */}
              <path
                d="M80,140 Q240,120 240,100 T400,80 T560,70 T720,60"
                fill="none"
                stroke="#71b8bc"
                strokeWidth="4"
                strokeDasharray={animationStep >= 2 ? "0" : "1000,1000"}
                strokeDashoffset={animationStep >= 2 ? "0" : "1000"}
                style={{ transition: "stroke-dashoffset 2s ease" }}
              />
              
              {/* Data points */}
              {animationStep >= 2 && [
                { x: 80, y: 140, week: "Inizio" },
                { x: 240, y: 100, week: "Settimana 1" },
                { x: 400, y: 80, week: "Settimana 2" },
                { x: 560, y: 70, week: "Settimana 3" },
                { x: 720, y: 60, week: "Settimana 4" }
              ].map((point, i) => (
                <g key={i}>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="6"
                    fill="#71b8bc"
                    className="animate-pulse"
                    style={{ animationDelay: `${i * 0.3}s` }}
                  />
                  <text
                    x={point.x}
                    y={point.y - 15}
                    textAnchor="middle"
                    className="text-xs fill-gray-600 font-medium"
                  >
                    {Math.round(((160 - point.y) / 120) * 100)}%
                  </text>
                </g>
              ))}
              
              {/* Week labels */}
              <text x="80" y="180" textAnchor="middle" className="text-xs fill-gray-500">Inizio</text>
              <text x="240" y="180" textAnchor="middle" className="text-xs fill-gray-500">Sett. 1</text>
              <text x="400" y="180" textAnchor="middle" className="text-xs fill-gray-500">Sett. 2</text>
              <text x="560" y="180" textAnchor="middle" className="text-xs fill-gray-500">Sett. 3</text>
              <text x="720" y="180" textAnchor="middle" className="text-xs fill-gray-500">Sett. 4</text>
              
              {/* Y-axis labels */}
              <text x="70" y="160" textAnchor="end" className="text-xs fill-gray-500">0%</text>
              <text x="70" y="130" textAnchor="end" className="text-xs fill-gray-500">25%</text>
              <text x="70" y="100" textAnchor="end" className="text-xs fill-gray-500">50%</text>
              <text x="70" y="70" textAnchor="end" className="text-xs fill-gray-500">75%</text>
              <text x="70" y="40" textAnchor="end" className="text-xs fill-gray-500">100%</text>
            </svg>
          </div>
          
          {/* Chart Legend */}
          <div className="text-center text-sm text-gray-600 mb-6">
            <span className="inline-block w-4 h-1 bg-[#71b8bc] mr-2 rounded"></span>
            Miglioramento del benessere fisico
          </div>
        </div>

        {/* Benefits Section */}
        <div 
          className={`bg-gradient-to-r from-[#71b8bc]/10 to-[#88c2aa]/10 rounded-2xl p-6 mb-8 transition-all duration-500 ${
            animationStep >= 3 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
          }`}
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            Cosa otterrai con il tuo piano personalizzato:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-[#71b8bc] rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="text-gray-700">Riduzione significativa del dolore lombare</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-[#71b8bc] rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="text-gray-700">Miglioramento della postura quotidiana</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-[#71b8bc] rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="text-gray-700">Maggiore mobilità e flessibilità</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-[#71b8bc] rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="text-gray-700">Aumento dei livelli di energia</span>
            </div>
          </div>
        </div>
        
        {/* CTA Button */}
        <div 
          className={`text-center transition-opacity duration-500 ${
            animationStep >= 3 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Button 
            onClick={onContinue} 
            size="lg"
            className="bg-[#71b8bc] hover:bg-[#5da0a4] text-white px-12 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Inizia il tuo percorso di benessere
          </Button>
          
          <p className="text-sm text-gray-600 mt-4">
            Il tuo piano ti aspetta. Inizia oggi stesso il tuo viaggio verso il benessere!
          </p>
        </div>
      </div>
    </div>
  );
};

export default SinusoidalGraph;
