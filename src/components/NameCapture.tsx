
import React, { useState } from 'react';
import { Button } from './ui/button';

interface NameCaptureProps {
  onSubmit: (name: string) => void;
}

const NameCapture: React.FC<NameCaptureProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Small delay for UX
    onSubmit(name.trim());
  };

  return (
    <div className="max-w-2xl mx-auto my-12 px-4 pt-16">
      <div className="bg-gradient-to-br from-[#71b8bc]/5 to-[#88c2aa]/5 rounded-3xl p-8 shadow-lg">
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-[#71b8bc] to-[#88c2aa] text-white px-6 py-2 rounded-full text-sm font-medium mb-4">
            ✨ Personalizzazione Finale
          </div>
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Come possiamo chiamarti?
          </h2>
          <p className="text-gray-600 text-lg">
            Vogliamo personalizzare la tua esperienza con il tuo nome
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Il tuo nome
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Inserisci il tuo nome"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#71b8bc] focus:border-transparent outline-none transition-all duration-200"
              required
              autoFocus
            />
          </div>

          <Button
            type="submit"
            disabled={!name.trim() || isSubmitting}
            className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${
              name.trim() && !isSubmitting
                ? 'bg-[#71b8bc] hover:bg-[#5da0a4] text-white'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Elaborazione...
              </div>
            ) : (
              'Continua'
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            🔒 Il tuo nome verrà utilizzato solo per personalizzare la tua esperienza
          </p>
        </div>
      </div>
    </div>
  );
};

export default NameCapture;
