
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faSignOutAlt, faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';

interface AdminData {
  id: string;
  session_id: string;
  nome_email: string;
  ip: string | null;
  stato: string;
  domande: number;
  ultima_domanda: string | null;
  tempo: number;
  data_inizio: string;
  created_at: string;
  updated_at: string;
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [data, setData] = useState<AdminData[]>([]);
  const [filteredData, setFilteredData] = useState<AdminData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [stripeMode, setStripeMode] = useState('live');
  const [showTestProduct, setShowTestProduct] = useState(false);
  const [dropOffStats, setDropOffStats] = useState<Record<string, number>>({});

  useEffect(() => {
    // Check if admin is logged in
    const isLoggedIn = sessionStorage.getItem('admin_logged_in');
    if (!isLoggedIn) {
      navigate('/admin/login');
      return;
    }

    fetchData();
    fetchSettings();
  }, [navigate]);

  useEffect(() => {
    filterData();
  }, [data, searchTerm, statusFilter]);

  const fetchData = async () => {
    try {
      const { data: adminData, error } = await supabase
        .from('admin_dashboard_data')
        .select('*')
        .order('data_inizio', { ascending: false });

      if (error) throw error;

      // Transform the data to match our interface
      const transformedData = (adminData || []).map(item => ({
        id: item.id,
        session_id: item.session_id,
        nome_email: item.nome_email || '',
        ip: item.ip ? String(item.ip) : null,
        stato: item.stato || 'in corso',
        domande: item.domande || 0,
        ultima_domanda: item.ultima_domanda || '',
        tempo: item.tempo || 0,
        data_inizio: item.data_inizio || '',
        created_at: item.created_at || '',
        updated_at: item.updated_at || ''
      }));

      setData(transformedData);
      calculateDropOffStats(transformedData);
    } catch (error) {
      console.error('Error fetching admin data:', error);
      toast({
        title: "Errore",
        description: "Errore nel caricamento dei dati",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchSettings = async () => {
    try {
      // Fetch both Stripe mode and test product setting
      const { data, error } = await supabase
        .from('admin_settings')
        .select('setting_key, setting_value')
        .in('setting_key', ['stripe_mode', 'show_test_product']);

      if (error) throw error;
      
      if (data) {
        data.forEach(setting => {
          if (setting.setting_key === 'stripe_mode') {
            setStripeMode(setting.setting_value);
          } else if (setting.setting_key === 'show_test_product') {
            setShowTestProduct(setting.setting_value === 'true');
          }
        });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const calculateDropOffStats = (adminData: AdminData[]) => {
    const stats: Record<string, number> = {};
    adminData.forEach(session => {
      if (session.stato === 'incompleto' && session.ultima_domanda) {
        stats[session.ultima_domanda] = (stats[session.ultima_domanda] || 0) + 1;
      }
    });
    setDropOffStats(stats);
  };

  const filterData = () => {
    let filtered = data;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.nome_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.session_id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(item => item.stato === statusFilter);
    }

    setFilteredData(filtered);
  };

  const toggleStripeMode = async () => {
    const newMode = stripeMode === 'live' ? 'test' : 'live';
    try {
      const { error } = await supabase
        .from('admin_settings')
        .upsert({
          setting_key: 'stripe_mode',
          setting_value: newMode
        }, { 
          onConflict: 'setting_key' 
        });

      if (error) throw error;

      setStripeMode(newMode);
      toast({
        title: "Modalità Stripe aggiornata",
        description: `Modalità cambiata a: ${newMode}`,
      });
    } catch (error) {
      console.error('Error updating Stripe mode:', error);
      toast({
        title: "Errore",
        description: "Errore nell'aggiornamento della modalità Stripe",
        variant: "destructive"
      });
    }
  };

  const toggleTestProduct = async () => {
    const newValue = !showTestProduct;
    try {
      const { error } = await supabase
        .from('admin_settings')
        .upsert({
          setting_key: 'show_test_product',
          setting_value: newValue.toString()
        }, { 
          onConflict: 'setting_key' 
        });

      if (error) throw error;

      setShowTestProduct(newValue);
      toast({
        title: "Prodotto TEST aggiornato",
        description: `Prodotto TEST ${newValue ? 'attivato' : 'disattivato'}`,
      });
    } catch (error) {
      console.error('Error updating test product setting:', error);
      toast({
        title: "Errore",
        description: "Errore nell'aggiornamento del prodotto TEST",
        variant: "destructive"
      });
    }
  };

  const exportData = () => {
    const csvContent = [
      'Session ID,Nome/Email,IP,Stato,Domande,Ultima Domanda,Tempo (sec),Data Inizio',
      ...filteredData.map(row => [
        row.session_id,
        row.nome_email || '',
        row.ip || '',
        row.stato,
        row.domande,
        row.ultima_domanda || '',
        row.tempo,
        row.data_inizio
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sessioni-quiz-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const logout = () => {
    sessionStorage.removeItem('admin_logged_in');
    navigate('/');
  };

  const getStatusBadge = (stato: string) => {
    switch (stato) {
      case 'completato':
        return <Badge className="bg-green-500">Completato</Badge>;
      case 'incompleto':
        return <Badge variant="destructive">Incompleto</Badge>;
      case 'in corso':
        return <Badge variant="secondary">In corso</Badge>;
      default:
        return <Badge variant="outline">{stato}</Badge>;
    }
  };

  const formatTime = (seconds: number) => {
    if (!seconds) return '-';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4">Caricamento dati...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard Amministratore - Tracciamento Sessioni</h1>
          <div className="flex items-center space-x-4">
            <Button onClick={toggleTestProduct} variant="outline">
              <FontAwesomeIcon 
                icon={showTestProduct ? faToggleOn : faToggleOff} 
                className={`mr-2 ${showTestProduct ? 'text-blue-500' : 'text-gray-400'}`}
              />
              Prodotto TEST: {showTestProduct ? 'ON' : 'OFF'}
            </Button>
            <Button onClick={toggleStripeMode} variant="outline">
              <FontAwesomeIcon 
                icon={stripeMode === 'live' ? faToggleOn : faToggleOff} 
                className={`mr-2 ${stripeMode === 'live' ? 'text-green-500' : 'text-gray-400'}`}
              />
              Stripe: {stripeMode === 'live' ? 'LIVE' : 'TEST'}
            </Button>
            <Button onClick={logout} variant="outline">
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Totale Sessioni</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Completate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {data.filter(d => d.stato === 'completato').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Incomplete</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {data.filter(d => d.stato === 'incompleto').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Tasso Completamento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {data.length > 0 ? ((data.filter(d => d.stato === 'completato').length / data.length) * 100).toFixed(1) : 0}%
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Drop-off Stats */}
        {Object.keys(dropOffStats).length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Statistiche Drop-off per Domanda</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(dropOffStats)
                  .sort(([,a], [,b]) => b - a)
                  .slice(0, 8)
                  .map(([questionId, count]) => (
                    <div key={questionId} className="bg-red-50 p-3 rounded">
                      <div className="font-medium text-sm">{questionId}</div>
                      <div className="text-2xl font-bold text-red-600">{count}</div>
                      <div className="text-xs text-gray-500">abbandoni</div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                placeholder="Cerca per nome, email o session ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="md:w-1/3"
              />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="md:w-48">
                  <SelectValue placeholder="Filtra per stato" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tutti</SelectItem>
                  <SelectItem value="completato">Completato</SelectItem>
                  <SelectItem value="incompleto">Incompleto</SelectItem>
                  <SelectItem value="in corso">In corso</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={exportData}>
                <FontAwesomeIcon icon={faDownload} className="mr-2" />
                Esporta CSV
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Data Table */}
        <Card>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Utente</TableHead>
                    <TableHead>IP</TableHead>
                    <TableHead>Stato</TableHead>
                    <TableHead>Domande</TableHead>
                    <TableHead>Ultima Domanda</TableHead>
                    <TableHead>Tempo</TableHead>
                    <TableHead>Data Inizio</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{session.nome_email || 'N/A'}</div>
                          <div className="text-xs text-gray-400">{session.session_id.slice(0, 12)}...</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{session.ip || 'N/A'}</TableCell>
                      <TableCell>{getStatusBadge(session.stato)}</TableCell>
                      <TableCell>{session.domande}</TableCell>
                      <TableCell className="text-sm">{session.ultima_domanda || 'N/A'}</TableCell>
                      <TableCell>{formatTime(session.tempo)}</TableCell>
                      <TableCell className="text-sm">
                        {session.data_inizio ? new Date(session.data_inizio).toLocaleDateString('it-IT') : 'N/A'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
