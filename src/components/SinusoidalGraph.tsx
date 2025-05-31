
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
      // Start wave animation after 1s
      const timer = setTimeout(() => {
        setAnimationStep(2);
      }, 1000);
      return () => clearTimeout(timer);
    }
    
    if (animationStep === 2) {
      // Show summary text after 2s
      const timer = setTimeout(() => {
        setAnimationStep(3);
      }, 2000);
      return () => clearTimeout(timer);
    }
    
    if (animationStep === 3) {
      // Show button after 3s
      const timer = setTimeout(() => {
        setAnimationStep(4);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [animationStep]);

  return (
    <div className="max-w-3xl mx-auto px-4 pt-16 min-h-screen flex flex-col justify-center">
      <div className={`transition-opacity duration-500 ${animationStep > 0 ? 'opacity-100' : 'opacity-0'}`}>
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Il nostro algoritmo ha analizzato il tuo profilo
        </h2>
        
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold mb-2 text-[#71b8bc]">Analisi del ciclo emotivo</h3>
            <p className="text-gray-600">Questa è una rappresentazione del tuo ciclo emotivo attuale</p>
          </div>
          
          <div className="relative h-64 mb-12 overflow-hidden">
            {/* Static Graph */}
            <svg
              viewBox="0 0 1000 300"
              width="100%"
              height="300"
              preserveAspectRatio="none"
              className="absolute inset-0"
            >
              {/* Grid lines - horizontal */}
              {[0, 1, 2, 3, 4].map((i) => (
                <line
                  key={`h-${i}`}
                  x1="0"
                  y1={60 * i}
                  x2="1000"
                  y2={60 * i}
                  stroke="#e0e0e0"
                  strokeWidth="1"
                />
              ))}
              
              {/* Grid lines - vertical */}
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <line
                  key={`v-${i}`}
                  x1={100 * i}
                  y1="0"
                  x2={100 * i}
                  y2="240"
                  stroke="#e0e0e0"
                  strokeWidth="1"
                />
              ))}
              
              {/* Non-optimized curve path */}
              <path
                d="M0,120 C100,180 200,60 300,60 S400,180 500,180 S600,60 700,60 S800,180 900,120 S1000,60 1000,120"
                fill="none"
                stroke="#e0e0e0"
                strokeWidth="3"
                strokeDasharray="5,5"
              />
              
              {/* Optimized curve path - appears with animation */}
              <path
                d="M0,120 C100,150 200,90 300,90 S400,150 500,150 S600,90 700,90 S800,150 900,120 S1000,90 1000,120"
                fill="none"
                stroke="#71b8bc"
                strokeWidth="3"
                strokeDasharray={animationStep >= 2 ? "0" : "1000,1000"}
                strokeDashoffset={animationStep >= 2 ? "0" : "1000"}
                style={{ transition: "stroke-dashoffset 2s ease" }}
              />
              
              {/* Labels */}
              <text x="0" y="270" className="text-xs" fill="#666">Lun</text>
              <text x="200" y="270" className="text-xs" fill="#666">Mer</text>
              <text x="400" y="270" className="text-xs" fill="#666">Ven</text>
              <text x="600" y="270" className="text-xs" fill="#666">Dom</text>
              <text x="800" y="270" className="text-xs" fill="#666">Mar</text>
              <text x="980" y="270" className="text-xs" fill="#666">Mer</text>
              
              {/* Points on optimized curve */}
              {animationStep >= 2 && [
                { x: 0, y: 120 },
                { x: 200, y: 90 },
                { x: 400, y: 150 },
                { x: 600, y: 90 },
                { x: 800, y: 150 },
                { x: 1000, y: 120 }
              ].map((point, i) => (
                <circle
                  key={i}
                  cx={point.x}
                  cy={point.y}
                  r="6"
                  fill="#71b8bc"
                  className={`animate-pulse`}
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </svg>
            
            {/* Legend */}
            <div className="absolute top-0 right-0 bg-white p-2 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-1">
                <div className="w-4 h-1 bg-[#e0e0e0] mr-2"></div>
                <span className="text-xs text-gray-500">Ciclo attuale</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-1 bg-[#71b8bc] mr-2"></div>
                <span className="text-xs text-gray-500">Ciclo ottimizzato</span>
              </div>
            </div>
            
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between py-4">
              <span className="text-xs text-gray-500">Alto</span>
              <span className="text-xs text-gray-500">Medio</span>
              <span className="text-xs text-gray-500">Basso</span>
            </div>
          </div>
          
          {/* Result explanation */}
          <div 
            className={`bg-[#88c2aa]/10 p-4 rounded-lg border border-[#71b8bc]/20 mb-6 transition-all duration-500 ${
              animationStep >= 3 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
            }`}
          >
            <h4 className="font-semibold text-[#71b8bc] mb-2">La tua analisi:</h4>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-[#71b8bc] mt-1">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>Il tuo ciclo emotivo attuale mostra <strong>picchi di stress</strong> seguiti da periodi di affaticamento</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-[#71b8bc] mt-1">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>Con il nostro piano personalizzato, equilibreremo il tuo ciclo per <strong>ridurre i picchi di stress</strong></span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-[#71b8bc] mt-1">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>Questa stabilità ti porterà a <strong>migliori livelli di energia</strong> e una postura più sana</span>
              </li>
            </ul>
          </div>
          
          <div 
            className={`text-center mt-8 transition-opacity duration-500 ${
              animationStep >= 4 ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Button 
              onClick={onContinue} 
              size="lg"
              className="bg-[#71b8bc] hover:bg-[#5da0a4] text-white px-8"
            >
              Scopri il tuo piano personalizzato
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinusoidalGraph;
