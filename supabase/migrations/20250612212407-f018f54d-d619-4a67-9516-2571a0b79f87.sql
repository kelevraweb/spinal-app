
-- Elimina la vista admin_dashboard_data esistente
DROP VIEW IF EXISTS public.admin_dashboard_data;

-- Elimina la tabella quiz_responses
DROP TABLE IF EXISTS public.quiz_responses;

-- Crea la nuova tabella admin_dashboard_data per il tracciamento sessioni
CREATE TABLE public.admin_dashboard_data (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome_email text,
  ip inet,
  stato text NOT NULL DEFAULT 'in corso' CHECK (stato IN ('in corso', 'incompleto', 'completato')),
  domande integer NOT NULL DEFAULT 0,
  ultima_domanda text,
  tempo integer NOT NULL DEFAULT 0,
  data_inizio timestamp with time zone NOT NULL DEFAULT now(),
  session_id text NOT NULL UNIQUE,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Crea indici per migliorare le performance
CREATE INDEX IF NOT EXISTS idx_admin_dashboard_session_id ON public.admin_dashboard_data(session_id);
CREATE INDEX IF NOT EXISTS idx_admin_dashboard_ip ON public.admin_dashboard_data(ip);
CREATE INDEX IF NOT EXISTS idx_admin_dashboard_stato ON public.admin_dashboard_data(stato);
