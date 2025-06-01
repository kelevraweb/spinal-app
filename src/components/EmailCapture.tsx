
import React, { useState } from 'react';

interface EmailCaptureProps {
  onSubmit: (email: string) => void;
}

const EmailCapture: React.FC<EmailCaptureProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !validateEmail(email)) {
      setIsValid(false);
      return;
    }
    
    onSubmit(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (!isValid) {
      setIsValid(validateEmail(e.target.value) || e.target.value === '');
    }
  };

  return (
    <div className="max-w-xl mx-auto my-12 px-6 animate-fade-in pt-16">
      <h2 className="text-2xl font-bold text-center mb-2">
        Inserisci la tua email per
      </h2>
      <h2 className="text-2xl font-bold text-center mb-6">
        ricevere il tuo <span className="text-brand-primary">Piano di Gestione del Benessere!</span>
      </h2>
      
      <form onSubmit={handleSubmit} className="mt-8">
        <div className="relative mb-4">
          <div className="flex border-2 rounded-lg overflow-hidden focus-within:border-[#71b8bc] transition-colors">
            <input
              type="email"
              className={`flex-1 px-4 py-3 text-lg outline-none ${
                !isValid ? 'border-red-500' : ''
              }`}
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <button 
              type="submit" 
              className="bg-[#71b8bc] hover:bg-[#619da0] text-white px-6 py-3 transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
          {!isValid && (
            <p className="text-red-500 text-sm mt-1">Inserisci un indirizzo email valido</p>
          )}
        </div>

        <div className="flex items-center justify-center mt-6 text-gray-500 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          <p>
            Rispettiamo la tua privacy e ci impegniamo a proteggere i tuoi dati personali. I tuoi dati saranno trattati secondo la nostra Informativa sulla privacy.
          </p>
        </div>
        
        <div className="mt-6">
          <button 
            type="submit" 
            className="w-full bg-[#71b8bc] hover:bg-[#619da0] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            Continua
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmailCapture;
