
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
    <div className="max-w-4xl mx-auto px-6 pt-24 pb-16 min-h-screen flex flex-col justify-center bg-white">
      <div className={`transition-opacity duration-500 ${animationStep > 0 ? 'opacity-100' : 'opacity-0'}`}>
        {/* Main Title with proper spacing */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
            Ecco, il tuo Piano di Gestione del 
            <span className="text-[#71b8bc]"> Benessere Personalizzato</span> è pronto!
          </h1>
        </div>
        
        {/* Chart Container - Much larger and professional */}
        <div className="bg-white rounded-3xl shadow-2xl p-10 mb-12">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Il tuo progresso nelle prossime settimane
            </h2>
            <p className="text-lg text-gray-600">Ecco come migliorerà il tuo benessere seguendo il piano</p>
          </div>
          
          {/* Large Professional Progress Chart */}
          <div className="relative h-96 mb-10">
            <svg
              viewBox="0 0 1000 400"
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
              
              {/* Grid lines - horizontal (more subtle) */}
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <line
                  key={`h-${i}`}
                  x1="100"
                  y1={60 + i * 60}
                  x2="900"
                  y2={60 + i * 60}
                  stroke="#f5f5f5"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                />
              ))}
              
              {/* Grid lines - vertical (more subtle) */}
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <line
                  key={`v-${i}`}
                  x1={100 + i * 133.33}
                  y1="60"
                  x2={100 + i * 133.33}
                  y2="360"
                  stroke="#f5f5f5"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                />
              ))}
              
              {/* Area under curve */}
              <path
                d="M100,300 Q200,280 300,240 T500,180 T700,140 T900,100 L900,360 L100,360 Z"
                fill="url(#areaGradient)"
                opacity={animationStep >= 2 ? "1" : "0"}
                style={{ transition: "opacity 1s ease" }}
              />
              
              {/* Main progress curve - much more pronounced */}
              <path
                d="M100,300 Q200,280 300,240 T500,180 T700,140 T900,100"
                fill="none"
                stroke="url(#curveGradient)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={animationStep >= 2 ? "0" : "2000,2000"}
                strokeDashoffset={animationStep >= 2 ? "0" : "2000"}
                style={{ 
                  transition: "stroke-dashoffset 2.5s ease-in-out",
                  filter: "drop-shadow(0 4px 8px rgba(113, 184, 188, 0.3))"
                }}
              />
              
              {/* Data points with animation */}
              {animationStep >= 2 && [
                { x: 100, y: 300, week: "Today", value: "20%" },
                { x: 300, y: 240, week: "Week 1", value: "40%" },
                { x: 500, y: 180, week: "Week 2", value: "60%" },
                { x: 700, y: 140, week: "Week 3", value: "75%" },
                { x: 900, y: 100, week: "After using Liven", value: "90%" }
              ].map((point, i) => (
                <g key={i}>
                  {/* Point glow effect */}
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="12"
                    fill="#71b8bc"
                    opacity="0.3"
                    className="animate-pulse"
                    style={{ animationDelay: `${i * 0.4}s` }}
                  />
                  {/* Main point */}
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="8"
                    fill="white"
                    stroke="#71b8bc"
                    strokeWidth="3"
                    className="animate-bounce-slow"
                    style={{ 
                      animationDelay: `${i * 0.4}s`,
                      filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))"
                    }}
                  />
                  {/* Value labels */}
                  <text
                    x={point.x}
                    y={point.y - 25}
                    textAnchor="middle"
                    className="text-sm fill-gray-700 font-bold"
                    style={{ fontSize: '16px' }}
                  >
                    {point.value}
                  </text>
                </g>
              ))}
              
              {/* Week labels - larger and better positioned */}
              <text x="100" y="390" textAnchor="middle" className="text-sm fill-gray-600 font-medium" style={{ fontSize: '14px' }}>Today</text>
              <text x="300" y="390" textAnchor="middle" className="text-sm fill-gray-600 font-medium" style={{ fontSize: '14px' }}>Week 1</text>
              <text x="500" y="390" textAnchor="middle" className="text-sm fill-gray-600 font-medium" style={{ fontSize: '14px' }}>Week 2</text>
              <text x="700" y="390" textAnchor="middle" className="text-sm fill-gray-600 font-medium" style={{ fontSize: '14px' }}>Week 3</text>
              <text x="900" y="390" textAnchor="middle" className="text-sm fill-[#71b8bc] font-bold" style={{ fontSize: '14px' }}>After using Liven</text>
              
              {/* Y-axis labels */}
              <text x="85" y="365" textAnchor="end" className="text-sm fill-gray-500" style={{ fontSize: '12px' }}>0%</text>
              <text x="85" y="305" textAnchor="end" className="text-sm fill-gray-500" style={{ fontSize: '12px' }}>20%</text>
              <text x="85" y="245" textAnchor="end" className="text-sm fill-gray-500" style={{ fontSize: '12px' }}>40%</text>
              <text x="85" y="185" textAnchor="end" className="text-sm fill-gray-500" style={{ fontSize: '12px' }}>60%</text>
              <text x="85" y="125" textAnchor="end" className="text-sm fill-gray-500" style={{ fontSize: '12px' }}>80%</text>
              <text x="85" y="65" textAnchor="end" className="text-sm fill-gray-500" style={{ fontSize: '12px' }}>100%</text>
            </svg>
          </div>
          
          {/* Chart Legend */}
          <div className="text-center text-base text-gray-600 mb-8">
            <div className="flex items-center justify-center gap-3">
              <div className="w-6 h-2 rounded-full" style={{ background: 'linear-gradient(90deg, #ff6b6b 0%, #ffa726 25%, #42a5f5 75%, #66bb6a 100%)' }}></div>
              <span className="font-medium">Miglioramento del benessere fisico</span>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div 
          className={`bg-gradient-to-r from-[#71b8bc]/10 to-[#88c2aa]/10 rounded-3xl p-8 mb-12 transition-all duration-500 ${
            animationStep >= 3 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
          }`}
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            Cosa otterrai con il tuo piano personalizzato:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="w-3 h-3 bg-[#71b8bc] rounded-full mt-2 mr-4 flex-shrink-0"></div>
              <span className="text-gray-700 text-lg">Riduzione significativa del dolore lombare</span>
            </div>
            <div className="flex items-start">
              <div className="w-3 h-3 bg-[#71b8bc] rounded-full mt-2 mr-4 flex-shrink-0"></div>
              <span className="text-gray-700 text-lg">Miglioramento della postura quotidiana</span>
            </div>
            <div className="flex items-start">
              <div className="w-3 h-3 bg-[#71b8bc] rounded-full mt-2 mr-4 flex-shrink-0"></div>
              <span className="text-gray-700 text-lg">Maggiore mobilità e flessibilità</span>
            </div>
            <div className="flex items-start">
              <div className="w-3 h-3 bg-[#71b8bc] rounded-full mt-2 mr-4 flex-shrink-0"></div>
              <span className="text-gray-700 text-lg">Aumento dei livelli di energia</span>
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
            className="bg-[#71b8bc] hover:bg-[#5da0a4] text-white px-16 py-6 text-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            Inizia il tuo percorso di benessere
          </Button>
          
          <p className="text-base text-gray-600 mt-6 max-w-md mx-auto">
            Il tuo piano ti aspetta. Inizia oggi stesso il tuo viaggio verso il benessere!
          </p>
        </div>
      </div>
    </div>
  );
};

export default SinusoidalGraph;
