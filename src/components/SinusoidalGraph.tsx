
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
      }, 1000);
      return () => clearTimeout(timer);
    }
    
    if (animationStep === 2) {
      const timer = setTimeout(() => {
        setAnimationStep(3);
      }, 2000);
      return () => clearTimeout(timer);
    }
    
    if (animationStep === 3) {
      const timer = setTimeout(() => {
        setAnimationStep(4);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [animationStep]);

  return (
    <div className="max-w-4xl mx-auto px-4 pt-16 min-h-screen flex flex-col justify-center">
      <div className={`transition-opacity duration-500 ${animationStep > 0 ? 'opacity-100' : 'opacity-0'}`}>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          Il nostro algoritmo ha analizzato il tuo profilo
        </h2>
        
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold mb-3 text-[#71b8bc]">Analisi del ciclo emotivo</h3>
            <p className="text-gray-600 text-lg">Questa è una rappresentazione del tuo ciclo emotivo attuale</p>
          </div>
          
          <div className="relative h-80 mb-12 overflow-hidden bg-gray-50 rounded-xl p-6">
            <svg
              viewBox="0 0 1000 300"
              width="100%"
              height="300"
              preserveAspectRatio="none"
              className="absolute inset-0"
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <line
                  key={`h-${i}`}
                  x1="50"
                  y1={60 * i + 30}
                  x2="950"
                  y2={60 * i + 30}
                  stroke="#e5e7eb"
                  strokeWidth="1"
                />
              ))}
              
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <line
                  key={`v-${i}`}
                  x1={150 * i + 50}
                  y1="30"
                  x2={150 * i + 50}
                  y2="270"
                  stroke="#e5e7eb"
                  strokeWidth="1"
                />
              ))}
              
              <path
                d="M50,150 C150,210 250,90 350,90 S450,210 550,210 S650,90 750,90 S850,210 950,150"
                fill="none"
                stroke="#d1d5db"
                strokeWidth="3"
                strokeDasharray="8,4"
              />
              
              <path
                d="M50,150 C150,180 250,120 350,120 S450,180 550,180 S650,120 750,120 S850,180 950,150"
                fill="none"
                stroke="#71b8bc"
                strokeWidth="4"
                strokeDasharray={animationStep >= 2 ? "0" : "2000,2000"}
                strokeDashoffset={animationStep >= 2 ? "0" : "2000"}
                style={{ transition: "stroke-dashoffset 2.5s ease" }}
              />
              
              <text x="50" y="295" className="text-sm" fill="#6b7280" textAnchor="middle">Lun</text>
              <text x="200" y="295" className="text-sm" fill="#6b7280" textAnchor="middle">Mar</text>
              <text x="350" y="295" className="text-sm" fill="#6b7280" textAnchor="middle">Mer</text>
              <text x="500" y="295" className="text-sm" fill="#6b7280" textAnchor="middle">Gio</text>
              <text x="650" y="295" className="text-sm" fill="#6b7280" textAnchor="middle">Ven</text>
              <text x="800" y="295" className="text-sm" fill="#6b7280" textAnchor="middle">Sab</text>
              <text x="950" y="295" className="text-sm" fill="#6b7280" textAnchor="middle">Dom</text>
              
              {animationStep >= 2 && [
                { x: 50, y: 150 },
                { x: 200, y: 120 },
                { x: 350, y: 120 },
                { x: 500, y: 180 },
                { x: 650, y: 120 },
                { x: 800, y: 180 },
                { x: 950, y: 150 }
              ].map((point, i) => (
                <circle
                  key={i}
                  cx={point.x}
                  cy={point.y}
                  r="8"
                  fill="#71b8bc"
                  className="animate-pulse"
                  style={{ animationDelay: `${i * 0.3}s` }}
                />
              ))}
            </svg>
            
            <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-md border">
              <div className="flex items-center mb-2">
                <div className="w-6 h-1 bg-gray-400 mr-3"></div>
                <span className="text-sm text-gray-600">Ciclo attuale</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-1 bg-[#71b8bc] mr-3"></div>
                <span className="text-sm text-gray-600">Ciclo ottimizzato</span>
              </div>
            </div>
            
            <div className="absolute left-2 top-0 bottom-0 flex flex-col justify-between py-8">
              <span className="text-sm text-gray-500">Alto</span>
              <span className="text-sm text-gray-500">Medio</span>
              <span className="text-sm text-gray-500">Basso</span>
            </div>
          </div>
          
          <div 
            className={`bg-gradient-to-r from-[#71b8bc]/10 to-[#88c2aa]/10 p-6 rounded-xl border border-[#71b8bc]/20 mb-8 transition-all duration-700 ${
              animationStep >= 3 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-6'
            }`}
          >
            <h4 className="font-bold text-xl text-[#71b8bc] mb-4">🎯 La tua analisi personalizzata:</h4>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-[#71b8bc] flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span>Il tuo ciclo emotivo attuale mostra <strong>picchi di stress significativi</strong> seguiti da periodi di affaticamento</span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-[#71b8bc] flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span>Con il nostro piano personalizzato, <strong>stabilizzeremo il tuo ciclo</strong> per ridurre drasticamente i picchi di stress</span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-[#71b8bc] flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span>Questa stabilità ti porterà a <strong>livelli di energia costanti</strong> e una postura significativamente più sana</span>
              </li>
            </ul>
          </div>
          
          <div 
            className={`text-center mt-10 transition-opacity duration-500 ${
              animationStep >= 4 ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Button 
              onClick={onContinue} 
              size="lg"
              className="bg-[#71b8bc] hover:bg-[#5da0a4] text-white px-10 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Scopri il tuo piano personalizzato →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinusoidalGraph;
