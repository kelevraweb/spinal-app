
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { saveUserProfile } from './QuizDataManager';

interface EmailCaptureProps {
  onSubmit: (email: string) => void;
}

const EmailCapture: React.FC<EmailCaptureProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && !isSubmitting) {
      setIsSubmitting(true);
      
      // Save email to localStorage
      const existingName = localStorage.getItem('userName') || '';
      saveUserProfile(existingName, email.trim());
      
      onSubmit(email.trim());
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="min-h-screen bg-[#fbfaf8] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-[#71b8bc] to-[#88c2aa] rounded-full flex items-center justify-center mx-auto mb-6">
            <FontAwesomeIcon icon={faEnvelope} className="text-white text-2xl" />
          </div>
          <h1 className="text-2xl font-bold mb-4 text-gray-800">
            Qual è la tua email?
          </h1>
          <p className="text-gray-600 mb-6">
            Ti invieremo il tuo piano personalizzato e aggiornamenti esclusivi.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="La tua email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#71b8bc] focus:border-transparent text-lg"
              required
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            disabled={!isValidEmail(email) || isSubmitting}
            className={`w-full py-3 rounded-lg font-medium text-white flex items-center justify-center space-x-2 transition-all duration-200 ${
              isValidEmail(email) && !isSubmitting
                ? 'bg-gradient-to-r from-[#71b8bc] to-[#88c2aa] hover:from-[#5da0a4] hover:to-[#7bb399] transform hover:scale-105'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            <span>{isSubmitting ? 'Salvando...' : 'Continua'}</span>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-4">
          Non invieremo spam. Puoi annullare l'iscrizione in qualsiasi momento.
        </p>
      </div>
    </div>
  );
};

export default EmailCapture;
