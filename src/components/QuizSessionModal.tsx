
import React from 'react';
import { Button } from './ui/button';

interface QuizSessionModalProps {
  isOpen: boolean;
  onContinue: () => void;
  onRestart: () => void;
}

const QuizSessionModal: React.FC<QuizSessionModalProps> = ({
  isOpen,
  onContinue,
  onRestart
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Quiz già iniziato
          </h3>
          <p className="text-gray-600">
            Hai già iniziato questo quiz in precedenza. Vuoi continuare da dove avevi lasciato o ricominciare da capo?
          </p>
        </div>
        
        <div className="space-y-3">
          <Button
            onClick={onContinue}
            className="w-full bg-[#71b8bc] hover:bg-[#5da0a4] text-white py-3"
          >
            Continua il quiz
          </Button>
          
          <Button
            onClick={onRestart}
            variant="outline"
            className="w-full border-[#71b8bc] text-[#71b8bc] hover:bg-[#71b8bc] hover:text-white py-3"
          >
            Ricomincia da capo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizSessionModal;
