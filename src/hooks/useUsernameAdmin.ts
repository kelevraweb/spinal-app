
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AdminSession {
  userId: string;
  username: string;
  loginTime: number;
  isAdmin: boolean;
}

export const useUsernameAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [adminSession, setAdminSession] = useState<AdminSession | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminStatus = () => {
      try {
        const sessionData = localStorage.getItem('admin_session');
        
        if (!sessionData) {
          setIsAdmin(false);
          setIsLoading(false);
          return;
        }

        const session: AdminSession = JSON.parse(sessionData);
        
        // Verifica se la sessione non è scaduta (24 ore)
        const sessionAge = Date.now() - session.loginTime;
        const maxAge = 24 * 60 * 60 * 1000; // 24 ore
        
        if (sessionAge > maxAge || !session.isAdmin) {
          localStorage.removeItem('admin_session');
          setIsAdmin(false);
          navigate('/admin/login');
        } else {
          setIsAdmin(true);
          setAdminSession(session);
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
        localStorage.removeItem('admin_session');
        navigate('/admin/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminStatus();
  }, [navigate]);

  const logout = () => {
    try {
      localStorage.removeItem('admin_session');
      setIsAdmin(false);
      setAdminSession(null);
      navigate('/admin/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return { isAdmin, isLoading, logout, adminSession };
};
