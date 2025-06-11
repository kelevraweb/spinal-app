
-- Add RLS policies for admin_settings table to allow admin operations
CREATE POLICY "Allow admin settings operations" ON public.admin_settings
FOR ALL
USING (true)
WITH CHECK (true);

-- Insert the missing show_test_product setting
INSERT INTO public.admin_settings (setting_key, setting_value)
VALUES ('show_test_product', 'false')
ON CONFLICT (setting_key) DO NOTHING;

-- Ensure stripe_mode setting exists
INSERT INTO public.admin_settings (setting_key, setting_value)
VALUES ('stripe_mode', 'live')
ON CONFLICT (setting_key) DO NOTHING;
