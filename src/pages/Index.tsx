import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

const Index: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fbfaf8] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#71b8bc] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Caricamento...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbfaf8]">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Benvenuto su Spinal
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            La tua piattaforma per il benessere posturale
          </p>
        </div>

        {/* Show welcome message for logged users, but keep main content for everyone */}
        {user && (
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Ciao, {user.user_metadata?.name || user.email}!
            </h2>
            <p className="text-gray-600 mb-4">
              Bentornato nella tua area personale
            </p>
            <a
              href="/dashboard"
              className="bg-[#71b8bc] hover:bg-[#5da0a4] text-white font-medium py-2 px-4 rounded-lg transition-colors inline-block"
            >
              Vai alla Dashboard
            </a>
          </div>
        )}

        {/* Main content - always visible */}
        <div className="text-center">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Inizia il tuo percorso di benessere
            </h2>
            <p className="text-gray-600 mb-8">
              Scopri come migliorare la tua postura e ridurre i dolori con il nostro quiz personalizzato
            </p>
            <a
              href="/quiz"
              className="bg-[#71b8bc] hover:bg-[#5da0a4] text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg"
            >
              Inizia il Quiz
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
