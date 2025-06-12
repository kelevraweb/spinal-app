
// Security configuration and utilities

export const SECURITY_CONFIG = {
  // Session timeout (30 minutes)
  SESSION_TIMEOUT: 30 * 60 * 1000,
  
  // Rate limiting
  MAX_LOGIN_ATTEMPTS: 5,
  LOGIN_RATE_WINDOW: 15 * 60 * 1000, // 15 minutes
  
  // Input validation
  MAX_INPUT_LENGTH: 1000,
  MAX_NAME_LENGTH: 100,
  
  // Admin role identifier
  ADMIN_ROLE: 'admin'
};

// Clean up authentication state to prevent limbo states
export const cleanupAuthState = () => {
  try {
    // Remove all Supabase auth keys from localStorage
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        localStorage.removeItem(key);
      }
    });
    
    // Remove from sessionStorage if in use
    Object.keys(sessionStorage || {}).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-') || key === 'admin_logged_in') {
        sessionStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error('Error cleaning up auth state:', error);
  }
};

// Secure session management
export const isSessionValid = (sessionStart: number): boolean => {
  return Date.now() - sessionStart < SECURITY_CONFIG.SESSION_TIMEOUT;
};

// Generate secure session ID
export const generateSecureSessionId = (): string => {
  return crypto.randomUUID();
};

// Check if environment is secure (HTTPS)
export const isSecureEnvironment = (): boolean => {
  return window.location.protocol === 'https:' || 
         window.location.hostname === 'localhost' ||
         window.location.hostname === '127.0.0.1';
};

// Log security events for monitoring
export const logSecurityEvent = (event: string, details?: any) => {
  console.log(`[SECURITY] ${event}`, details);
  
  // In production, you might want to send this to a monitoring service
  if (import.meta.env.PROD) {
    // Send to monitoring service
  }
};
