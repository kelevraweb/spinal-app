
-- Enable Row Level Security on all public tables that don't have it
ALTER TABLE public.admin_dashboard_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.temp_passwords ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check admin role
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_profiles 
    WHERE user_id = auth.uid() 
    AND plan_type = 'admin'
  );
$$;

-- Drop existing policies if they exist, then create new ones
DROP POLICY IF EXISTS "Admin only access to dashboard data" ON public.admin_dashboard_data;
CREATE POLICY "Admin only access to dashboard data" 
ON public.admin_dashboard_data 
FOR ALL 
USING (public.is_admin());

DROP POLICY IF EXISTS "Admin only access to settings" ON public.admin_settings;
CREATE POLICY "Admin only access to settings" 
ON public.admin_settings 
FOR ALL 
USING (public.is_admin());

-- Orders policies
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can insert their own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can update their own orders" ON public.orders;

CREATE POLICY "Users can view their own orders" 
ON public.orders 
FOR SELECT 
USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own orders" 
ON public.orders 
FOR INSERT 
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own orders" 
ON public.orders 
FOR UPDATE 
USING (user_id = auth.uid());

-- Temp passwords policy (service role only)
DROP POLICY IF EXISTS "Service role only access to temp passwords" ON public.temp_passwords;
CREATE POLICY "Service role only access to temp passwords" 
ON public.temp_passwords 
FOR ALL 
USING (false);

-- User profiles policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.user_profiles;

CREATE POLICY "Users can view their own profile" 
ON public.user_profiles 
FOR SELECT 
USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own profile" 
ON public.user_profiles 
FOR INSERT 
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own profile" 
ON public.user_profiles 
FOR UPDATE 
USING (user_id = auth.uid());

CREATE POLICY "Admins can view all profiles" 
ON public.user_profiles 
FOR SELECT 
USING (public.is_admin());

-- Add user_email column to orders table to support email-based lookups
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS user_email text;

-- Create index for email lookups
CREATE INDEX IF NOT EXISTS idx_orders_user_email ON public.orders(user_email);
