
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { saveUserProfile } from './QuizDataManager';

interface NameCaptureProps {
  onSubmit: (name: string) => void;
}

const NameCapture: React.FC<NameCaptureProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && !isSubmitting) {
      setIsSubmitting(true);
      
      // Save name to localStorage and database
      const existingEmail = localStorage.getItem('userEmail') || '';
      saveUserProfile(name.trim(), existingEmail);
      
      // Also save directly to localStorage for immediate access
      localStorage.setItem('userName', name.trim());
      
      console.log('Name saved to localStorage and database:', name.trim());
      
      onSubmit(name.trim());
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfaf8] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-[#71b8bc] to-[#88c2aa] rounded-full flex items-center justify-center mx-auto mb-6">
            <FontAwesomeIcon icon={faUser} className="text-white text-2xl" />
          </div>
          <h1 className="text-2xl font-bold mb-4 text-gray-800">
            Come ti chiami?
          </h1>
          <p className="text-gray-600 mb-6">
            Vogliamo personalizzare la tua esperienza!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Il tuo nome"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#71b8bc] focus:border-transparent text-lg"
              required
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            disabled={!name.trim() || isSubmitting}
            className={`w-full py-3 rounded-lg font-medium text-white flex items-center justify-center space-x-2 transition-all duration-200 ${
              name.trim() && !isSubmitting
                ? 'bg-gradient-to-r from-[#71b8bc] to-[#88c2aa] hover:from-[#5da0a4] hover:to-[#7bb399] transform hover:scale-105'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            <span>{isSubmitting ? 'Salvando...' : 'Continua'}</span>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default NameCapture;
