
-- Add unique constraint to prevent duplicate sessions per IP
-- This will help us implement one session per IP logic
ALTER TABLE public.quiz_responses 
ADD CONSTRAINT unique_ip_session UNIQUE (ip_address, user_session_id);

-- Create index for better performance on IP lookups
CREATE INDEX IF NOT EXISTS idx_quiz_responses_ip_address 
ON public.quiz_responses (ip_address);

-- Create index for session lookups
CREATE INDEX IF NOT EXISTS idx_quiz_responses_session_id 
ON public.quiz_responses (user_session_id);
