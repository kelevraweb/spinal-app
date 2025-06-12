
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

export const useSecureAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          setIsAdmin(false);
          setIsLoading(false);
          return;
        }

        // Check if user has admin role
        const { data: profile, error } = await supabase
          .from('user_profiles')
          .select('plan_type')
          .eq('user_id', session.user.id)
          .single();

        if (error || profile?.plan_type !== 'admin') {
          setIsAdmin(false);
          // Redirect to login if not admin
          navigate('/admin-login');
        } else {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
        navigate('/admin-login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminStatus();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        setIsAdmin(false);
        navigate('/admin-login');
      } else if (event === 'SIGNED_IN') {
        checkAdminStatus();
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setIsAdmin(false);
      navigate('/admin-login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return { isAdmin, isLoading, logout };
};
