
-- STEP 1: Disabilita Row Level Security (RLS) sulla tabella admin_dashboard_data 
-- così tutti gli utenti autenticati tramite il backend possono vedere i dati 
-- (l'accesso alla dashboard è già protetto in frontend).

ALTER TABLE public.admin_dashboard_data DISABLE ROW LEVEL SECURITY;
