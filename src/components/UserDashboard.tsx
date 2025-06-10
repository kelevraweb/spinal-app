
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendar, faCrown, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface UserProfile {
  name: string;
  plan_type: string;
  purchase_date: string;
  subscription_status: string;
  quiz_session_id?: string;
}

const UserDashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
        } else {
          setProfile(data);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
  };

  const getPlanDisplayName = (planType: string) => {
    switch (planType) {
      case 'trial': return 'Piano 7 giorni';
      case 'monthly': return 'Piano 1 mese';
      case 'quarterly': return 'Piano 3 mesi';
      default: return planType;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600';
      case 'pending': return 'text-yellow-600';
      case 'expired': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fbfaf8] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#71b8bc] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Caricamento dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbfaf8] p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-[#71b8bc] to-[#88c2aa] rounded-full flex items-center justify-center">
                <FontAwesomeIcon icon={faUser} className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Ciao, {profile?.name || user?.email}!
                </h1>
                <p className="text-gray-600">Benvenuto nella tua dashboard personale</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span>Esci</span>
            </button>
          </div>
        </div>

        {/* Plan Information */}
        {profile && (
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <FontAwesomeIcon icon={faCrown} className="text-[#71b8bc] text-xl" />
                <h2 className="text-xl font-semibold text-gray-800">Il tuo piano</h2>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Piano attivo</p>
                  <p className="font-medium text-lg">{getPlanDisplayName(profile.plan_type)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Stato</p>
                  <p className={`font-medium capitalize ${getStatusColor(profile.subscription_status)}`}>
                    {profile.subscription_status === 'active' ? 'Attivo' : 
                     profile.subscription_status === 'pending' ? 'In attesa' : 
                     profile.subscription_status === 'expired' ? 'Scaduto' : 
                     profile.subscription_status}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <FontAwesomeIcon icon={faCalendar} className="text-[#71b8bc] text-xl" />
                <h2 className="text-xl font-semibold text-gray-800">Informazioni account</h2>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{user?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Data acquisto</p>
                  <p className="font-medium">
                    {new Date(profile.purchase_date).toLocaleDateString('it-IT')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Welcome Message */}
        <div className="bg-gradient-to-r from-[#71b8bc] to-[#88c2aa] rounded-lg shadow-lg p-6 text-white">
          <h2 className="text-xl font-semibold mb-2">Benvenuto nel tuo percorso di benessere!</h2>
          <p className="opacity-90">
            Il tuo piano è attivo e puoi iniziare a goderti tutti i benefici del nostro programma. 
            Tieni d'occhio questa dashboard per aggiornamenti e informazioni sul tuo account.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
