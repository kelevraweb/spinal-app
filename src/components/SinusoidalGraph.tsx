
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
      }, 1500);
      return () => clearTimeout(timer);
    }
    
    if (animationStep === 2) {
      const timer = setTimeout(() => {
        setAnimationStep(3);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [animationStep]);

  return (
    <div className="pt-24 pb-8 min-h-screen flex flex-col justify-between bg-gradient-to-br from-gray-50 to-white">
      <div className={`transition-opacity duration-500 ${animationStep > 0 ? 'opacity-100' : 'opacity-0'}`}>
        {/* Main Title */}
        <div className="text-center mb-12 px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 leading-tight">
            Your personal 
            <span className="text-[#71b8bc]"> Well-being Management Plan</span> is ready!
          </h1>
        </div>
        
        {/* Chart Container */}
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 mb-8 mx-4 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
              Your progress in the upcoming weeks
            </h2>
            <p className="text-gray-600">Here's how your well-being will improve by following the plan</p>
          </div>
          
          {/* Progress Chart */}
          <div className="relative h-64 md:h-80 mb-8">
            <svg
              viewBox="0 0 900 300"
              width="100%"
              height="100%"
              className="overflow-visible"
            >
              {/* Gradient definitions */}
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ff6b6b" />
                  <stop offset="30%" stopColor="#ffa726" />
                  <stop offset="70%" stopColor="#42a5f5" />
                  <stop offset="100%" stopColor="#71b8bc" />
                </linearGradient>
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#71b8bc" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#71b8bc" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              
              {/* Grid lines */}
              {[0, 1, 2, 3, 4].map((i) => (
                <line
                  key={`grid-${i}`}
                  x1="80"
                  y1={50 + i * 50}
                  x2="820"
                  y2={50 + i * 50}
                  stroke="#f0f0f0"
                  strokeWidth="1"
                  strokeDasharray="3,3"
                />
              ))}
              
              {/* Vertical grid lines */}
              {[0, 1, 2, 3, 4].map((i) => (
                <line
                  key={`vgrid-${i}`}
                  x1={80 + i * 185}
                  y1="50"
                  x2={80 + i * 185}
                  y2="250"
                  stroke="#f8f8f8"
                  strokeWidth="1"
                />
              ))}
              
              {/* Area under curve */}
              <path
                d="M80,220 Q265,200 450,150 T820,80 L820,250 L80,250 Z"
                fill="url(#areaGradient)"
                opacity={animationStep >= 2 ? "1" : "0"}
                style={{ transition: "opacity 1.5s ease" }}
              />
              
              {/* Main progress curve */}
              <path
                d="M80,220 Q265,200 450,150 T820,80"
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={animationStep >= 2 ? "0" : "2000,2000"}
                strokeDashoffset={animationStep >= 2 ? "0" : "2000"}
                style={{ 
                  transition: "stroke-dashoffset 2.5s ease-in-out",
                  filter: "drop-shadow(0 3px 6px rgba(113, 184, 188, 0.3))"
                }}
              />
              
              {/* Progress points */}
              {animationStep >= 2 && [
                { x: 80, y: 220, label: "Today", sublabel: "Starting point", value: "20%" },
                { x: 265, y: 200, label: "Week 1", sublabel: "First improvements", value: "40%" },
                { x: 450, y: 150, label: "Week 2", sublabel: "Noticeable changes", value: "65%" },
                { x: 635, y: 110, label: "Week 3", sublabel: "Significant progress", value: "80%" },
                { x: 820, y: 80, label: "Week 4", sublabel: "Target reached", value: "95%" }
              ].map((point, i) => (
                <g key={i}>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="8"
                    fill="white"
                    stroke="#71b8bc"
                    strokeWidth="3"
                    style={{ 
                      animationDelay: `${i * 0.3}s`,
                      filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15))"
                    }}
                    className="animate-scale-in"
                  />
                  <text
                    x={point.x}
                    y={point.y - 20}
                    textAnchor="middle"
                    className="text-sm font-bold fill-[#71b8bc]"
                  >
                    {point.value}
                  </text>
                </g>
              ))}
              
              {/* Time labels */}
              <text x="80" y="280" textAnchor="middle" className="text-sm fill-gray-600 font-medium">Today</text>
              <text x="265" y="280" textAnchor="middle" className="text-sm fill-gray-600 font-medium">Week 1</text>
              <text x="450" y="280" textAnchor="middle" className="text-sm fill-gray-600 font-medium">Week 2</text>
              <text x="635" y="280" textAnchor="middle" className="text-sm fill-gray-600 font-medium">Week 3</text>
              <text x="820" y="280" textAnchor="middle" className="text-sm fill-[#71b8bc] font-bold">Week 4</text>
              
              {/* Y-axis labels */}
              <text x="60" y="225" textAnchor="end" className="text-xs fill-gray-500">0%</text>
              <text x="60" y="175" textAnchor="end" className="text-xs fill-gray-500">25%</text>
              <text x="60" y="125" textAnchor="end" className="text-xs fill-gray-500">50%</text>
              <text x="60" y="75" textAnchor="end" className="text-xs fill-gray-500">75%</text>
              <text x="60" y="55" textAnchor="end" className="text-xs fill-gray-500">100%</text>
            </svg>
          </div>

          {/* Chart Legend */}
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">Well-being improvement progress</p>
            <div className="flex items-center justify-center space-x-6 text-xs text-gray-600">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gradient-to-r from-red-400 to-orange-400 rounded-full mr-2"></div>
                <span>Starting phase</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-[#71b8bc] rounded-full mr-2"></div>
                <span>Optimization phase</span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Benefits Section */}
        <div 
          className={`px-4 mb-8 transition-all duration-700 ${
            animationStep >= 3 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
          }`}
        >
          <div className="bg-gradient-to-r from-[#71b8bc]/10 to-[#88c2aa]/10 rounded-3xl p-6 md:p-8 max-w-4xl mx-auto">
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 text-center">
              What you'll achieve with your personalized plan:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Significant reduction in back pain",
                "Improved daily posture",
                "Greater mobility and flexibility", 
                "Increased energy levels",
                "Better sleep quality",
                "Enhanced overall well-being"
              ].map((benefit, index) => (
                <div key={index} className="flex items-start bg-white rounded-xl p-4 shadow-sm">
                  <div className="w-2 h-2 bg-[#71b8bc] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Fixed bottom button */}
      <div 
        className={`px-4 transition-opacity duration-500 ${
          animationStep >= 3 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="text-center mb-6 max-w-md mx-auto">
          <Button 
            onClick={onContinue} 
            size="lg"
            className="w-full bg-gradient-to-r from-[#71b8bc] to-[#88c2aa] hover:from-[#5da0a4] hover:to-[#72a089] text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Start your wellness journey
          </Button>
        </div>
        
        <p className="text-sm text-gray-600 text-center px-4 max-w-lg mx-auto">
          Your personalized plan is waiting. Begin your journey to better health today!
        </p>
      </div>
    </div>
  );
};

export default SinusoidalGraph;
