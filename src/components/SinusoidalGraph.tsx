
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';

interface CompoundGrowthGraphProps {
  onContinue?: () => void;
}

const CompoundGrowthGraph: React.FC<CompoundGrowthGraphProps> = ({ onContinue }) => {
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
            <h3 className="text-xl font-semibold mb-2 text-[#71b8bc]">Analisi della crescita del benessere</h3>
            <p className="text-gray-600">Questo è il tuo potenziale di miglioramento nel tempo</p>
          </div>
          
          <div className="relative h-64 mb-12 overflow-hidden">
            {/* Compound Growth Graph */}
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
              
              {/* Non-optimized flat line */}
              <path
                d="M0,180 L1000,180"
                fill="none"
                stroke="#e0e0e0"
                strokeWidth="3"
                strokeDasharray="5,5"
              />
              
              {/* Compound growth curve - exponential growth */}
              <path
                d="M0,200 Q200,190 400,160 T800,80 Q900,50 1000,30"
                fill="none"
                stroke="#71b8bc"
                strokeWidth="3"
                strokeDasharray={animationStep >= 2 ? "0" : "1000,1000"}
                strokeDashoffset={animationStep >= 2 ? "0" : "1000"}
                style={{ transition: "stroke-dashoffset 2s ease" }}
              />
              
              {/* Labels */}
              <text x="0" y="270" className="text-xs" fill="#666">Settimana 1</text>
              <text x="200" y="270" className="text-xs" fill="#666">Settimana 4</text>
              <text x="400" y="270" className="text-xs" fill="#666">Settimana 8</text>
              <text x="600" y="270" className="text-xs" fill="#666">Settimana 12</text>
              <text x="800" y="270" className="text-xs" fill="#666">Settimana 16</text>
              <text x="950" y="270" className="text-xs" fill="#666">Settimana 20</text>
              
              {/* Points on compound growth curve */}
              {animationStep >= 2 && [
                { x: 0, y: 200, week: 1, improvement: "0%" },
                { x: 200, y: 190, week: 4, improvement: "15%" },
                { x: 400, y: 160, week: 8, improvement: "35%" },
                { x: 600, y: 120, week: 12, improvement: "60%" },
                { x: 800, y: 80, week: 16, improvement: "80%" },
                { x: 1000, y: 30, week: 20, improvement: "95%" }
              ].map((point, i) => (
                <g key={i}>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="6"
                    fill="#71b8bc"
                    className={`animate-pulse`}
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                  <text 
                    x={point.x} 
                    y={point.y - 15} 
                    className="text-xs font-semibold" 
                    fill="#71b8bc"
                    textAnchor="middle"
                    style={{ opacity: animationStep >= 2 ? 1 : 0, transition: `opacity 0.5s ease ${i * 0.2 + 0.5}s` }}
                  >
                    {point.improvement}
                  </text>
                </g>
              ))}
            </svg>
            
            {/* Legend */}
            <div className="absolute top-0 right-0 bg-white p-2 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-1">
                <div className="w-4 h-1 bg-[#e0e0e0] mr-2"></div>
                <span className="text-xs text-gray-500">Senza programma</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-1 bg-[#71b8bc] mr-2"></div>
                <span className="text-xs text-gray-500">Con il nostro programma</span>
              </div>
            </div>
            
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between py-4">
              <span className="text-xs text-gray-500">Benessere Max</span>
              <span className="text-xs text-gray-500">Benessere Medio</span>
              <span className="text-xs text-gray-500">Benessere Basso</span>
            </div>
          </div>
          
          {/* Result explanation */}
          <div 
            className={`bg-[#88c2aa]/10 p-4 rounded-lg border border-[#71b8bc]/20 mb-6 transition-all duration-500 ${
              animationStep >= 3 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
            }`}
          >
            <h4 className="font-semibold text-[#71b8bc] mb-2">La tua crescita prevista:</h4>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-[#71b8bc] mt-1">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>Il <strong>compound effect</strong> del nostro programma ti porterà a miglioramenti crescenti</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-[#71b8bc] mt-1">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>Ogni settimana costruisce sui progressi precedenti per <strong>risultati duraturi</strong></span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-[#71b8bc] mt-1">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>In 20 settimane raggiungerai il <strong>95% del tuo potenziale</strong> di benessere posturale</span>
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
              style={{ background: '#71b8bc !important', color: 'white !important' }}
            >
              Scopri il tuo piano personalizzato
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompoundGrowthGraph;
