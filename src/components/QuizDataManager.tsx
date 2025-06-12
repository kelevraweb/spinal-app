
import { supabase } from '@/integrations/supabase/client';
import { QuizAnswer } from '../types/quiz';

// Generate a unique session ID for this quiz session
const generateSessionId = () => {
  return `quiz_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Get user's IP address
const getUserIP = async (): Promise<string | null> => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Error getting IP:', error);
    return null;
  }
};

// Check if there's an existing session for this IP and user combination
const getOrCreateSessionForIP = async (): Promise<string> => {
  const ipAddress = await getUserIP();
  const userName = localStorage.getItem('userName');
  const userEmail = localStorage.getItem('userEmail');
  const userIdentifier = userEmail || userName || '';
  
  if (!ipAddress) {
    // Fallback to localStorage if IP not available
    let sessionId = localStorage.getItem('quiz_session_id');
    if (!sessionId) {
      sessionId = generateSessionId();
      localStorage.setItem('quiz_session_id', sessionId);
    }
    return sessionId;
  }

  // Check if there's an existing "in corso" session for this IP + user combination
  try {
    const { data: existingSessions, error } = await supabase
      .from('admin_dashboard_data')
      .select('session_id')
      .eq('ip', ipAddress)
      .eq('stato', 'in corso')
      .order('data_inizio', { ascending: false })
      .limit(1);

    if (error) {
      console.error('Error checking existing sessions:', error);
    } else if (existingSessions && existingSessions.length > 0) {
      // Use existing session for this IP
      const sessionId = existingSessions[0].session_id;
      localStorage.setItem('quiz_session_id', sessionId);
      console.log('Using existing session for IP:', sessionId);
      return sessionId;
    }
  } catch (error) {
    console.error('Error checking existing sessions:', error);
  }

  // Create new session
  const newSessionId = generateSessionId();
  localStorage.setItem('quiz_session_id', newSessionId);
  console.log('Created new session:', newSessionId);
  return newSessionId;
};

// Initialize session in admin_dashboard_data
const initializeSession = async (sessionId: string): Promise<void> => {
  const ipAddress = await getUserIP();
  const userName = localStorage.getItem('userName');
  const userEmail = localStorage.getItem('userEmail');
  const userIdentifier = userEmail || userName || '';
  
  try {
    const { error } = await supabase
      .from('admin_dashboard_data')
      .upsert({
        session_id: sessionId,
        nome_email: userIdentifier,
        ip: ipAddress,
        stato: 'in corso',
        domande: 0,
        ultima_domanda: null,
        tempo: 0,
        data_inizio: new Date().toISOString()
      }, {
        onConflict: 'session_id'
      });

    if (error) {
      console.error('Error initializing session:', error);
    } else {
      console.log('Session initialized successfully:', sessionId);
    }
  } catch (error) {
    console.error('Error initializing session:', error);
  }
};

// Clear all quiz session data
export const clearQuizSession = async () => {
  const sessionId = localStorage.getItem('quiz_session_id');
  
  // Clear localStorage
  localStorage.removeItem('quiz_session_id');
  localStorage.removeItem('quizAnswers');
  localStorage.removeItem('userGender');
  localStorage.removeItem('userName');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('quiz_start_time');
  
  // Mark session as incompleto if session exists
  if (sessionId) {
    try {
      await supabase
        .from('admin_dashboard_data')
        .update({
          stato: 'incompleto'
        })
        .eq('session_id', sessionId);
    } catch (error) {
      console.error('Error updating session status:', error);
    }
  }
};

// Check if there's an existing quiz session
export const hasExistingSession = () => {
  const sessionId = localStorage.getItem('quiz_session_id');
  const answers = localStorage.getItem('quizAnswers');
  return !!(sessionId && answers);
};

export const saveQuizAnswer = async (questionId: string, answer: string | string[] | number, allAnswers: QuizAnswer[]) => {
  const sessionId = await getOrCreateSessionForIP();
  
  // Initialize session if it's the first question
  if (allAnswers.length === 1) {
    await initializeSession(sessionId);
    localStorage.setItem('quiz_start_time', Date.now().toString());
  }
  
  // Convert answer to string for storage
  const answerString = Array.isArray(answer) ? answer.join(',') : String(answer);
  
  // Get gender from current answers
  const genderAnswer = allAnswers.find(a => a.questionId === 'gender');
  const gender = genderAnswer ? String(genderAnswer.answer) : null;
  
  // Get name and email if available
  const userName = localStorage.getItem('userName');
  const userEmail = localStorage.getItem('userEmail');
  const userIdentifier = userEmail || userName || '';
  
  // Get IP address
  const ipAddress = await getUserIP();
  
  // Calculate completion time
  const startTime = localStorage.getItem('quiz_start_time');
  const completionTime = startTime ? Math.floor((Date.now() - parseInt(startTime)) / 1000) : 0;
  
  // Save to localStorage
  localStorage.setItem('quizAnswers', JSON.stringify(allAnswers));
  if (gender) {
    localStorage.setItem('userGender', gender);
  }
  
  // Update session in admin_dashboard_data
  try {
    console.log('Updating session data:', { sessionId, questionId, allAnswers: allAnswers.length, completionTime });
    
    const { error } = await supabase
      .from('admin_dashboard_data')
      .update({
        nome_email: userIdentifier,
        ip: ipAddress,
        domande: allAnswers.length,
        ultima_domanda: questionId,
        tempo: completionTime
      })
      .eq('session_id', sessionId);
    
    if (error) {
      console.error('Database update error:', error);
    } else {
      console.log('Session data updated successfully');
    }
  } catch (error) {
    console.error('Error updating session data:', error);
  }
};

// Mark quiz as completed
export const markQuizCompleted = async () => {
  const sessionId = localStorage.getItem('quiz_session_id');
  if (!sessionId) return;
  
  const startTime = localStorage.getItem('quiz_start_time');
  const completionTime = startTime ? Math.floor((Date.now() - parseInt(startTime)) / 1000) : 0;
  
  try {
    await supabase
      .from('admin_dashboard_data')
      .update({
        stato: 'completato',
        tempo: completionTime
      })
      .eq('session_id', sessionId);
    
    console.log('Quiz marked as completed');
  } catch (error) {
    console.error('Error marking quiz as completed:', error);
  }
};

// Mark quiz as abandoned
export const markQuizAbandoned = async () => {
  const sessionId = localStorage.getItem('quiz_session_id');
  if (!sessionId) return;
  
  try {
    await supabase
      .from('admin_dashboard_data')
      .update({
        stato: 'incompleto'
      })
      .eq('session_id', sessionId);
    
    console.log('Quiz marked as abandoned');
  } catch (error) {
    console.error('Error marking quiz as abandoned:', error);
  }
};

export const loadQuizAnswers = async (): Promise<QuizAnswer[]> => {
  // First try localStorage
  const localAnswers = localStorage.getItem('quizAnswers');
  if (localAnswers) {
    try {
      return JSON.parse(localAnswers);
    } catch (error) {
      console.error('Error parsing local answers:', error);
    }
  }
  
  // For now, we don't store individual answers in admin_dashboard_data
  // We only track session progress, so return empty array if no local data
  return [];
};

export const getUserGender = (): string => {
  // First check localStorage
  const storedGender = localStorage.getItem('userGender');
  if (storedGender) {
    return storedGender;
  }
  
  // Then check quiz answers
  const localAnswers = localStorage.getItem('quizAnswers');
  if (localAnswers) {
    try {
      const answers = JSON.parse(localAnswers);
      const genderAnswer = answers.find((answer: QuizAnswer) => answer.questionId === 'gender');
      if (genderAnswer) {
        const gender = String(genderAnswer.answer);
        localStorage.setItem('userGender', gender);
        return gender;
      }
    } catch (error) {
      console.error('Error parsing quiz answers:', error);
    }
  }
  
  return 'Femmina'; // Default fallback
};

// New function to get user data from quiz
export const getUserDataFromQuiz = async (): Promise<{
  name: string;
  email: string;
  gender: string;
  sessionId: string | null;
}> => {
  const sessionId = localStorage.getItem('quiz_session_id');
  
  // Try to get stored name and email from localStorage first
  const storedName = localStorage.getItem('userName');
  const storedEmail = localStorage.getItem('userEmail');
  const storedGender = localStorage.getItem('userGender');
  
  if (storedName && storedEmail && storedGender) {
    return {
      name: storedName,
      email: storedEmail,
      gender: storedGender,
      sessionId
    };
  }
  
  // If not in localStorage, try to get from session data
  if (sessionId) {
    try {
      const { data, error } = await supabase
        .from('admin_dashboard_data')
        .select('nome_email')
        .eq('session_id', sessionId)
        .single();
      
      if (error) {
        console.error('Error loading user data from database:', error);
      } else if (data) {
        // Extract what we can from nome_email field
        const userIdentifier = data.nome_email || '';
        return {
          name: userIdentifier,
          email: userIdentifier.includes('@') ? userIdentifier : '',
          gender: storedGender || 'Femmina',
          sessionId
        };
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
  
  return {
    name: '',
    email: '',
    gender: 'Femmina',
    sessionId
  };
};

// Function to save user profile data (name, email)
export const saveUserProfile = async (name: string, email: string) => {
  localStorage.setItem('userName', name);
  localStorage.setItem('userEmail', email);
  
  // Also update the session data
  const sessionId = localStorage.getItem('quiz_session_id');
  if (sessionId) {
    try {
      const userIdentifier = email || name;
      await supabase
        .from('admin_dashboard_data')
        .update({
          nome_email: userIdentifier
        })
        .eq('session_id', sessionId);
      
      console.log('User profile updated in session');
    } catch (error) {
      console.error('Error updating user profile in session:', error);
    }
  }
};
