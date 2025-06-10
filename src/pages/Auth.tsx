
import React from 'react';
import UserAuth from '@/components/UserAuth';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const Auth: React.FC = () => {
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

  // Redirect to dashboard if already logged in
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-[#fbfaf8]">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Accedi al tuo account
          </h1>
          <p className="text-lg text-gray-600">
            Entra nella tua area personale per accedere al programma
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <UserAuth />
        </div>

        <div className="text-center mt-8">
          <a
            href="/"
            className="text-[#71b8bc] hover:underline"
          >
            ← Torna alla homepage
          </a>
        </div>
      </div>
    </div>
  );
};

export default Auth;
