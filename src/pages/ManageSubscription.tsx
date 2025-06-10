
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Mail, Key, CreditCard, X } from 'lucide-react';

const ManageSubscription: React.FC = () => {
  const [step, setStep] = useState<'email' | 'password' | 'dashboard'>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState<any>(null);
  const { toast } = useToast();

  const handleSendPassword = async () => {
    if (!email) {
      toast({
        title: "Errore",
        description: "Inserisci un indirizzo email valido",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-temp-password', {
        body: { email }
      });

      if (error) throw error;

      toast({
        title: "Password inviata",
        description: "Controlla la tua email per la password temporanea",
      });
      setStep('password');
    } catch (error) {
      console.error('Error sending password:', error);
      toast({
        title: "Errore",
        description: "Errore nell'invio della password. Riprova.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!password) {
      toast({
        title: "Errore",
        description: "Inserisci la password ricevuta via email",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('verify-temp-password', {
        body: { email, password }
      });

      if (error) throw error;

      if (data.success) {
        setSubscriptionData(data.subscription);
        setStep('dashboard');
        toast({
          title: "Accesso effettuato",
          description: "Benvenuto nel tuo pannello di gestione",
        });
      } else {
        toast({
          title: "Errore",
          description: "Password non valida o scaduta",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error verifying password:', error);
      toast({
        title: "Errore",
        description: "Errore nella verifica. Riprova.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('cancel-subscription', {
        body: { email }
      });

      if (error) throw error;

      toast({
        title: "Sottoscrizione cancellata",
        description: "La tua sottoscrizione è stata cancellata con successo",
      });
      
      setSubscriptionData({ ...subscriptionData, status: 'canceled' });
    } catch (error) {
      console.error('Error canceling subscription:', error);
      toast({
        title: "Errore",
        description: "Errore nella cancellazione. Riprova.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBackToEmail = () => {
    setStep('email');
    setEmail('');
    setPassword('');
    setSubscriptionData(null);
  };

  const renderEmailStep = () => (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Mail className="h-6 w-6" />
          Gestione Piano
        </CardTitle>
        <p className="text-gray-600">
          Inserisci l'email utilizzata per l'acquisto
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="email"
          placeholder="La tua email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendPassword()}
        />
        <Button 
          onClick={handleSendPassword} 
          disabled={loading}
          className="w-full bg-[#71b8bc] hover:bg-[#5da0a4]"
        >
          {loading ? "Invio in corso..." : "Ricevi Password"}
        </Button>
      </CardContent>
    </Card>
  );

  const renderPasswordStep = () => (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Key className="h-6 w-6" />
          Inserisci Password
        </CardTitle>
        <p className="text-gray-600">
          Inserisci la password ricevuta via email per {email}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="password"
          placeholder="Password temporanea"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
        />
        <div className="space-y-2">
          <Button 
            onClick={handleLogin} 
            disabled={loading}
            className="w-full bg-[#71b8bc] hover:bg-[#5da0a4]"
          >
            {loading ? "Verifica in corso..." : "Accedi"}
          </Button>
          <Button 
            onClick={handleBackToEmail} 
            variant="outline"
            className="w-full"
          >
            Cambia Email
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderDashboard = () => (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <CreditCard className="h-6 w-6" />
            Il Tuo Piano
          </CardTitle>
          <p className="text-gray-600">Email: {email}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {subscriptionData ? (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Dettagli Sottoscrizione</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Piano:</span>
                    <p className="font-medium capitalize">{subscriptionData.plan_type}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Stato:</span>
                    <p className={`font-medium ${subscriptionData.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                      {subscriptionData.status === 'active' ? 'Attivo' : 'Cancellato'}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Data Acquisto:</span>
                    <p className="font-medium">
                      {new Date(subscriptionData.created_at).toLocaleDateString('it-IT')}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Importo:</span>
                    <p className="font-medium">{subscriptionData.amount / 100}€</p>
                  </div>
                </div>
              </div>

              {subscriptionData.status === 'active' && (
                <div className="space-y-3">
                  <Button 
                    onClick={handleCancelSubscription}
                    disabled={loading}
                    variant="destructive"
                    className="w-full"
                  >
                    {loading ? "Cancellazione in corso..." : "Cancella Sottoscrizione"}
                  </Button>
                  <p className="text-xs text-gray-500 text-center">
                    La cancellazione sarà effettiva immediatamente
                  </p>
                </div>
              )}
            </div>
          ) : (
            <p className="text-center text-gray-600">
              Nessuna sottoscrizione trovata per questa email
            </p>
          )}
          
          <Button 
            onClick={handleBackToEmail} 
            variant="outline"
            className="w-full"
          >
            Esci
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto">
        {step === 'email' && renderEmailStep()}
        {step === 'password' && renderPasswordStep()}
        {step === 'dashboard' && renderDashboard()}
      </div>
    </div>
  );
};

export default ManageSubscription;
