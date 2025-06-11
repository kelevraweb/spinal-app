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
import { faDownload, faSignOutAlt, faToggleOn, faToggleOff, faRefresh } from '@fortawesome/free-solid-svg-icons';

interface AdminData {
  user_session_id: string;
  ip_address: string | null;
  started_at: string;
  last_activity_at: string;
  session_status: string;
  user_name: string;
  user_email: string;
  last_question_id: string;
  completion_time_seconds: number;
  purchased_plan: string;
  purchase_amount: number;
  payment_status: string;
  purchase_date: string;
  questions_answered: number;
}

interface DebugInfo {
  quizResponsesCount: number;
  ordersCount: number;
  viewResult: any[];
  rawQuizData: any[];
  rawOrdersData: any[];
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
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null);
  const [showDebug, setShowDebug] = useState(false);

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

  const fetchDebugData = async () => {
    try {
      console.log('=== INIZIO DEBUG DATI ===');
      
      // 1. Conta quiz_responses
      const { count: quizCount, error: quizCountError } = await supabase
        .from('quiz_responses')
        .select('*', { count: 'exact', head: true });
      
      console.log('Quiz responses count:', quizCount, 'Error:', quizCountError);

      // 2. Conta orders
      const { count: ordersCount, error: ordersCountError } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true });
      
      console.log('Orders count:', ordersCount, 'Error:', ordersCountError);

      // 3. Prendi alcuni dati raw da quiz_responses
      const { data: rawQuizData, error: rawQuizError } = await supabase
        .from('quiz_responses')
        .select('*')
        .limit(5);
      
      console.log('Raw quiz data:', rawQuizData, 'Error:', rawQuizError);

      // 4. Prendi alcuni dati raw da orders
      const { data: rawOrdersData, error: rawOrdersError } = await supabase
        .from('orders')
        .select('*')
        .limit(5);
      
      console.log('Raw orders data:', rawOrdersData, 'Error:', rawOrdersError);

      // 5. Prova la vista admin_dashboard_data
      const { data: viewData, error: viewError } = await supabase
        .from('admin_dashboard_data')
        .select('*')
        .limit(5);
      
      console.log('Admin dashboard view data:', viewData, 'Error:', viewError);

      setDebugInfo({
        quizResponsesCount: quizCount || 0,
        ordersCount: ordersCount || 0,
        viewResult: viewData || [],
        rawQuizData: rawQuizData || [],
        rawOrdersData: rawOrdersData || []
      });

      console.log('=== FINE DEBUG DATI ===');
    } catch (error) {
      console.error('Errore durante il debug:', error);
    }
  };

  const fetchData = async () => {
    try {
      console.log('Fetching admin dashboard data...');
      
      const { data: adminData, error } = await supabase
        .from('admin_dashboard_data')
        .select('*')
        .order('started_at', { ascending: false });

      console.log('Admin data result:', { adminData, error });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      // Transform the data to match our interface
      const transformedData = (adminData || []).map(item => ({
        ...item,
        ip_address: item.ip_address ? String(item.ip_address) : null,
        user_session_id: item.user_session_id || '',
        started_at: item.started_at || '',
        last_activity_at: item.last_activity_at || '',
        session_status: item.session_status || '',
        user_name: item.user_name || '',
        user_email: item.user_email || '',
        last_question_id: item.last_question_id || '',
        completion_time_seconds: item.completion_time_seconds || 0,
        purchased_plan: item.purchased_plan || '',
        purchase_amount: item.purchase_amount || 0,
        payment_status: item.payment_status || '',
        purchase_date: item.purchase_date || '',
        questions_answered: Number(item.questions_answered) || 0
      }));

      console.log('Transformed data:', transformedData);
      setData(transformedData);
      calculateDropOffStats(transformedData);

      // Se non ci sono dati, esegui debug automaticamente
      if (transformedData.length === 0) {
        console.log('Nessun dato trovato, eseguo debug...');
        await fetchDebugData();
        setShowDebug(true);
      }

    } catch (error) {
      console.error('Error fetching admin data:', error);
      toast({
        title: "Errore",
        description: "Errore nel caricamento dei dati: " + (error as Error).message,
        variant: "destructive"
      });
      
      // Esegui debug anche in caso di errore
      await fetchDebugData();
      setShowDebug(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchSettings = async () => {
    try {
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
      if (session.session_status === 'abandoned' && session.last_question_id) {
        stats[session.last_question_id] = (stats[session.last_question_id] || 0) + 1;
      }
    });
    setDropOffStats(stats);
  };

  const filterData = () => {
    let filtered = data;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.user_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.user_session_id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(item => {
        if (statusFilter === 'completed') return item.purchased_plan;
        if (statusFilter === 'abandoned') return !item.purchased_plan && item.session_status === 'abandoned';
        if (statusFilter === 'in_progress') return item.session_status === 'in_progress';
        return true;
      });
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
      'Session ID,Nome,Email,IP,Stato,Domande Risposte,Ultima Domanda,Tempo Completamento (sec),Piano Acquistato,Importo,Stato Pagamento,Data Inizio,Data Acquisto',
      ...filteredData.map(row => [
        row.user_session_id,
        row.user_name || '',
        row.user_email || '',
        row.ip_address || '',
        row.session_status,
        row.questions_answered,
        row.last_question_id || '',
        row.completion_time_seconds || '',
        row.purchased_plan || '',
        row.purchase_amount || '',
        row.payment_status || '',
        row.started_at,
        row.purchase_date || ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `admin-data-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const logout = () => {
    sessionStorage.removeItem('admin_logged_in');
    navigate('/');
  };

  const getStatusBadge = (session: AdminData) => {
    if (session.purchased_plan) {
      return <Badge className="bg-green-500">Acquistato: {session.purchased_plan}</Badge>;
    }
    if (session.session_status === 'abandoned') {
      return <Badge variant="destructive">Abbandonato</Badge>;
    }
    return <Badge variant="secondary">In corso</Badge>;
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
          <h1 className="text-3xl font-bold">Dashboard Amministratore</h1>
          <div className="flex items-center space-x-4">
            <Button onClick={() => { fetchData(); fetchDebugData(); }} variant="outline">
              <FontAwesomeIcon icon={faRefresh} className="mr-2" />
              Ricarica
            </Button>
            <Button onClick={() => setShowDebug(!showDebug)} variant="outline">
              {showDebug ? 'Nascondi Debug' : 'Mostra Debug'}
            </Button>
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

        {/* Debug Info */}
        {showDebug && debugInfo && (
          <Card className="mb-6 border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="text-yellow-800">🔍 Informazioni Debug</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-3 rounded">
                  <div className="text-sm font-medium">Quiz Responses</div>
                  <div className="text-2xl font-bold text-blue-600">{debugInfo.quizResponsesCount}</div>
                </div>
                <div className="bg-white p-3 rounded">
                  <div className="text-sm font-medium">Orders</div>
                  <div className="text-2xl font-bold text-green-600">{debugInfo.ordersCount}</div>
                </div>
                <div className="bg-white p-3 rounded">
                  <div className="text-sm font-medium">Vista Risultati</div>
                  <div className="text-2xl font-bold text-purple-600">{debugInfo.viewResult.length}</div>
                </div>
                <div className="bg-white p-3 rounded">
                  <div className="text-sm font-medium">Stato Database</div>
                  <div className="text-sm text-green-600">Connesso</div>
                </div>
              </div>
              
              {debugInfo.rawQuizData.length > 0 && (
                <div>
                  <h4 className="font-medium text-yellow-800 mb-2">Esempio Quiz Response:</h4>
                  <pre className="bg-white p-2 rounded text-xs overflow-x-auto">
                    {JSON.stringify(debugInfo.rawQuizData[0], null, 2)}
                  </pre>
                </div>
              )}
              
              {debugInfo.rawOrdersData.length > 0 && (
                <div>
                  <h4 className="font-medium text-yellow-800 mb-2">Esempio Order:</h4>
                  <pre className="bg-white p-2 rounded text-xs overflow-x-auto">
                    {JSON.stringify(debugInfo.rawOrdersData[0], null, 2)}
                  </pre>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Totale Sessioni</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.length}</div>
              {debugInfo && (
                <div className="text-xs text-gray-500">
                  DB: {debugInfo.quizResponsesCount} quiz responses
                </div>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Acquisti</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {data.filter(d => d.purchased_plan).length}
              </div>
              {debugInfo && (
                <div className="text-xs text-gray-500">
                  DB: {debugInfo.ordersCount} orders
                </div>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Abbandoni</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {data.filter(d => d.session_status === 'abandoned').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Tasso Conversione</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {data.length > 0 ? ((data.filter(d => d.purchased_plan).length / data.length) * 100).toFixed(1) : 0}%
              </div>
            </CardContent>
          </Card>
        </div>

        {/* No Data Message */}
        {data.length === 0 && (
          <Card className="mb-6 border-orange-200 bg-orange-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-lg font-semibold text-orange-800 mb-2">
                  Nessun dato disponibile
                </h3>
                <p className="text-orange-700 mb-4">
                  La dashboard non sta mostrando dati. Questo può accadere se:
                </p>
                <ul className="text-left text-orange-700 mb-4 space-y-1">
                  <li>• Non ci sono ancora utenti che hanno iniziato il quiz</li>
                  <li>• La vista del database non è configurata correttamente</li>
                  <li>• Ci sono problemi con la connessione al database</li>
                </ul>
                <div className="flex justify-center space-x-4">
                  <Button onClick={() => { fetchData(); fetchDebugData(); }} variant="outline">
                    <FontAwesomeIcon icon={faRefresh} className="mr-2" />
                    Ricarica Dati
                  </Button>
                  <Button onClick={() => setShowDebug(true)} variant="outline">
                    Mostra Debug
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

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

        {/* Filters - only show if we have data */}
        {data.length > 0 && (
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
                    <SelectItem value="completed">Acquistato</SelectItem>
                    <SelectItem value="abandoned">Abbandonato</SelectItem>
                    <SelectItem value="in_progress">In corso</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={exportData}>
                  <FontAwesomeIcon icon={faDownload} className="mr-2" />
                  Esporta CSV
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Data Table - only show if we have data */}
        {data.length > 0 && (
          <Card>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome/Email</TableHead>
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
                      <TableRow key={session.user_session_id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{session.user_name || 'N/A'}</div>
                            <div className="text-sm text-gray-500">{session.user_email || 'N/A'}</div>
                            <div className="text-xs text-gray-400">{session.user_session_id.slice(0, 8)}...</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">{session.ip_address || 'N/A'}</TableCell>
                        <TableCell>{getStatusBadge(session)}</TableCell>
                        <TableCell>{session.questions_answered}</TableCell>
                        <TableCell className="text-sm">{session.last_question_id || 'N/A'}</TableCell>
                        <TableCell>{formatTime(session.completion_time_seconds)}</TableCell>
                        <TableCell className="text-sm">
                          {session.started_at ? new Date(session.started_at).toLocaleDateString('it-IT') : 'N/A'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
