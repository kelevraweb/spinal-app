
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const UsernameAdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Verifica le credenziali admin dalla tabella admin_credentials
      const { data: adminCredentials, error: credError } = await supabase
        .from('admin_credentials')
        .select('*')
        .eq('username', username)
        .single();

      if (credError || !adminCredentials) {
        throw new Error('Username o password non validi');
      }

      // Verifica la password (per ora semplificata - in produzione dovresti usare bcrypt)
      if (password !== 'Spinal2025!?') {
        throw new Error('Username o password non validi');
      }

      // Crea una sessione admin fittizia nel localStorage
      localStorage.setItem('admin_session', JSON.stringify({
        userId: adminCredentials.user_profile_id,
        username: username,
        loginTime: Date.now(),
        isAdmin: true
      }));

      toast({
        title: "Login effettuato",
        description: "Benvenuto nell'area amministrativa",
      });
      
      // Naviga al dashboard admin
      navigate('/admin');
    } catch (error) {
      console.error('Admin login error:', error);
      toast({
        title: "Errore",
        description: error instanceof Error ? error.message : "Errore durante il login",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Accesso Amministratore
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-1">
                Username
              </label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                placeholder="admin"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Accesso in corso...' : 'Accedi'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsernameAdminLogin;
