
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const UserAuth: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'setPassword' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { signIn, signUp, setPassword: updatePassword } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let result;
      
      if (mode === 'login') {
        result = await signIn(email, password);
      } else if (mode === 'signup') {
        if (password !== confirmPassword) {
          throw new Error('Le password non corrispondono');
        }
        result = await signUp(email, password, name);
      } else if (mode === 'setPassword') {
        if (password !== confirmPassword) {
          throw new Error('Le password non corrispondono');
        }
        result = await updatePassword(email, password);
      }

      if (result?.error) {
        throw new Error(result.error.message);
      }

      toast({
        title: mode === 'login' ? 'Accesso effettuato!' : 'Password impostata!',
        description: mode === 'login' ? 'Benvenuto nel tuo account.' : 'Ora puoi accedere al tuo account.',
      });

      // Reset form
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setName('');
      if (mode === 'setPassword') {
        setMode('login');
      }

    } catch (error: any) {
      toast({
        title: 'Errore',
        description: error.message || 'Si è verificato un errore. Riprova.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-[#71b8bc] to-[#88c2aa] rounded-full flex items-center justify-center mx-auto mb-4">
          <FontAwesomeIcon icon={faUser} className="text-white text-xl" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">
          {mode === 'login' && 'Accedi al tuo account'}
          {mode === 'signup' && 'Crea il tuo account'}
          {mode === 'setPassword' && 'Imposta la tua password'}
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          {mode === 'login' && 'Inserisci le tue credenziali per accedere'}
          {mode === 'signup' && 'Crea un nuovo account per iniziare'}
          {mode === 'setPassword' && 'Hai ricevuto un account dopo l\'acquisto? Imposta la tua password'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'signup' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome completo
            </label>
            <div className="relative">
              <FontAwesomeIcon icon={faUser} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#71b8bc] focus:border-transparent"
                placeholder="Il tuo nome"
                required
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <div className="relative">
            <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#71b8bc] focus:border-transparent"
              placeholder="la-tua-email@esempio.com"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#71b8bc] focus:border-transparent"
              placeholder="La tua password"
              required
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
        </div>

        {(mode === 'signup' || mode === 'setPassword') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Conferma password
            </label>
            <div className="relative">
              <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#71b8bc] focus:border-transparent"
                placeholder="Conferma la tua password"
                required
                minLength={6}
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded-md font-medium text-white transition-all duration-200 ${
            isLoading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-[#71b8bc] to-[#88c2aa] hover:from-[#5da0a4] hover:to-[#7bb399] transform hover:scale-105'
          }`}
        >
          {isLoading ? 'Caricamento...' : (
            mode === 'login' ? 'Accedi' : 
            mode === 'signup' ? 'Crea account' : 
            'Imposta password'
          )}
        </button>
      </form>

      <div className="mt-4 text-center text-sm">
        {mode === 'login' && (
          <div className="space-y-2">
            <button
              onClick={() => setMode('setPassword')}
              className="text-[#71b8bc] hover:underline block w-full"
            >
              Ho un account dal quiz ma non ho ancora una password
            </button>
            <button
              onClick={() => setMode('signup')}
              className="text-gray-600 hover:underline block w-full"
            >
              Non hai un account? Registrati
            </button>
          </div>
        )}
        
        {mode === 'signup' && (
          <button
            onClick={() => setMode('login')}
            className="text-[#71b8bc] hover:underline"
          >
            Hai già un account? Accedi
          </button>
        )}
        
        {mode === 'setPassword' && (
          <button
            onClick={() => setMode('login')}
            className="text-[#71b8bc] hover:underline"
          >
            Torna al login
          </button>
        )}
      </div>
    </div>
  );
};

export default UserAuth;
