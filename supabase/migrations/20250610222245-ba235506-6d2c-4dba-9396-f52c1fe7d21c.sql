
-- Create table for temporary passwords used in subscription management
CREATE TABLE public.temp_passwords (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add index for efficient lookups
CREATE INDEX idx_temp_passwords_email ON public.temp_passwords(email);
CREATE INDEX idx_temp_passwords_expires_at ON public.temp_passwords(expires_at);

-- Enable Row Level Security
ALTER TABLE public.temp_passwords ENABLE ROW LEVEL SECURITY;

-- Create policy for temp passwords (allow all operations for now since this is a temporary system)
CREATE POLICY "Allow temp password operations" ON public.temp_passwords
FOR ALL
USING (true);

-- Clean up expired passwords automatically (optional trigger)
CREATE OR REPLACE FUNCTION cleanup_expired_passwords()
RETURNS void AS $$
BEGIN
  DELETE FROM public.temp_passwords 
  WHERE expires_at < now() - INTERVAL '1 hour';
END;
$$ LANGUAGE plpgsql;
