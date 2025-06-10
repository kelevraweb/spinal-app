
-- Extend quiz_responses table to track more detailed information
ALTER TABLE public.quiz_responses 
ADD COLUMN IF NOT EXISTS ip_address inet,
ADD COLUMN IF NOT EXISTS started_at timestamp with time zone DEFAULT now(),
ADD COLUMN IF NOT EXISTS last_activity_at timestamp with time zone DEFAULT now(),
ADD COLUMN IF NOT EXISTS session_status text DEFAULT 'in_progress',
ADD COLUMN IF NOT EXISTS user_name text,
ADD COLUMN IF NOT EXISTS user_email text,
ADD COLUMN IF NOT EXISTS last_question_id text,
ADD COLUMN IF NOT EXISTS completion_time_seconds integer;

-- Add session_id to orders table to link with quiz responses
ALTER TABLE public.orders 
ADD COLUMN IF NOT EXISTS quiz_session_id text;

-- Create admin_settings table for storing configuration like Stripe mode
CREATE TABLE IF NOT EXISTS public.admin_settings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key text NOT NULL UNIQUE,
  setting_value text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Insert default Stripe mode setting (live mode by default)
INSERT INTO public.admin_settings (setting_key, setting_value) 
VALUES ('stripe_mode', 'live') 
ON CONFLICT (setting_key) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_quiz_responses_session_id ON public.quiz_responses(user_session_id);
CREATE INDEX IF NOT EXISTS idx_quiz_responses_status ON public.quiz_responses(session_status);
CREATE INDEX IF NOT EXISTS idx_orders_quiz_session ON public.orders(quiz_session_id);

-- Create a view for admin dashboard data
CREATE OR REPLACE VIEW public.admin_dashboard_data AS
SELECT DISTINCT
  qr.user_session_id,
  qr.ip_address,
  qr.started_at,
  qr.last_activity_at,
  qr.session_status,
  qr.user_name,
  qr.user_email,
  qr.last_question_id,
  qr.completion_time_seconds,
  o.plan_type as purchased_plan,
  o.amount as purchase_amount,
  o.status as payment_status,
  o.created_at as purchase_date,
  COUNT(qr.question_id) as questions_answered
FROM public.quiz_responses qr
LEFT JOIN public.orders o ON o.quiz_session_id = qr.user_session_id
GROUP BY qr.user_session_id, qr.ip_address, qr.started_at, qr.last_activity_at, 
         qr.session_status, qr.user_name, qr.user_email, qr.last_question_id, 
         qr.completion_time_seconds, o.plan_type, o.amount, o.status, o.created_at;
