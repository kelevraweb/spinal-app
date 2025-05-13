
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

  return (
    <div className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm px-4 py-3 flex items-center justify-between">
      <div className="w-1/3 flex justify-start">
        {canGoBack && (
          <button 
            onClick={handleBack}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            <span className="hidden sm:inline">Indietro</span>
          </button>
        )}
      </div>
      
      <div className="w-1/3 flex justify-center">
        <div className="font-bold text-lg text-center">LoveCoach</div>
      </div>
      
      <div className="w-1/3 flex justify-end text-sm text-gray-600">
        Domanda {currentStep + 1} di {totalSteps}
      </div>
    </div>
  );
};

export default TopNavBar;
