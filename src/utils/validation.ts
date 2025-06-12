
import { z } from 'zod';

// Email validation schema
export const emailSchema = z.string().email('Email non valida');

// Name validation schema
export const nameSchema = z.string()
  .min(1, 'Nome richiesto')
  .max(100, 'Nome troppo lungo')
  .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Nome contiene caratteri non validi');

// Quiz response validation schema
export const quizResponseSchema = z.object({
  questionId: z.string().min(1, 'ID domanda richiesto'),
  answer: z.union([
    z.string().max(1000, 'Risposta troppo lunga'),
    z.number().min(1).max(10),
    z.array(z.string()).max(10, 'Troppe opzioni selezionate')
  ]),
  sessionId: z.string().min(1, 'ID sessione richiesto')
});

// Sanitize HTML input
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove < and > characters
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
};

// Validate and sanitize email
export const validateEmail = (email: string): { isValid: boolean; sanitized: string; error?: string } => {
  try {
    const sanitized = sanitizeInput(email.toLowerCase());
    emailSchema.parse(sanitized);
    return { isValid: true, sanitized };
  } catch (error) {
    return { 
      isValid: false, 
      sanitized: '', 
      error: error instanceof z.ZodError ? error.errors[0].message : 'Email non valida' 
    };
  }
};

// Validate and sanitize name
export const validateName = (name: string): { isValid: boolean; sanitized: string; error?: string } => {
  try {
    const sanitized = sanitizeInput(name);
    nameSchema.parse(sanitized);
    return { isValid: true, sanitized };
  } catch (error) {
    return { 
      isValid: false, 
      sanitized: '', 
      error: error instanceof z.ZodError ? error.errors[0].message : 'Nome non valido' 
    };
  }
};

// Rate limiting for API calls
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export const checkRateLimit = (identifier: string, maxRequests: number = 10, windowMs: number = 60000): boolean => {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (record.count >= maxRequests) {
    return false;
  }
  
  record.count++;
  return true;
};
