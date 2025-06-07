
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';

interface TopNavBarProps {
  currentStep: number;
  totalSteps: number;
  onBack?: () => void;
  canGoBack?: boolean;
}

const TopNavBar: React.FC<TopNavBarProps> = ({
  currentStep,
  totalSteps,
  onBack,
  canGoBack = true
}) => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    if (onBack) {
      onBack();
    }
  };

  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-[#77bab8] to-[#82bfb0] z-50 shadow-sm">
      {/* Header content */}
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="w-1/3 flex justify-start">
          {canGoBack && (
            <button 
              onClick={handleBack} 
              className="flex items-center text-white hover:text-gray-100 transition-colors" 
              aria-label="Torna indietro"
            >
              <ArrowLeft className="w-5 h-5 mr-1" />
              <span className="hidden sm:inline">Indietro</span>
            </button>
          )}
        </div>
        
        <div className="w-1/3 flex justify-center">
          <img 
            alt="Spinal" 
            className="h-8 w-auto object-contain" 
            src="/lovable-uploads/4c503bbb-0aea-4ecb-9636-84204fc62ad6.png" 
          />
        </div>
        
        <div className="w-1/3 flex justify-end text-sm text-white">
          {currentStep + 1} di {totalSteps}
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="px-4 pb-3">
        <Progress 
          value={progressPercentage} 
          className="h-2 bg-white/20"
          indicatorClassName="bg-white"
        />
      </div>
    </div>
  );
};

export default TopNavBar;
