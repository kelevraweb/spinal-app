
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

// Check if there's an existing session for this IP
const getOrCreateSessionForIP = async (): Promise<string> => {
  const ipAddress = await getUserIP();
  
  if (!ipAddress) {
    // Fallback to localStorage if IP not available
    let sessionId = localStorage.getItem('quiz_session_id');
    if (!sessionId) {
      sessionId = generateSessionId();
      localStorage.setItem('quiz_session_id', sessionId);
    }
    return sessionId;
  }

  // Check if there's an existing session for this IP
  try {
    const { data: existingSessions, error } = await supabase
      .from('quiz_responses')
      .select('user_session_id')
      .eq('ip_address', ipAddress)
      .order('created_at', { ascending: false })
      .limit(1);

    if (error) {
      console.error('Error checking existing sessions:', error);
    } else if (existingSessions && existingSessions.length > 0) {
      // Use existing session for this IP
      const sessionId = existingSessions[0].user_session_id;
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
  
  // Clear database records if session exists
  if (sessionId) {
    try {
      await supabase
        .from('quiz_responses')
        .delete()
        .eq('user_session_id', sessionId);
    } catch (error) {
      console.error('Error clearing database session:', error);
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
  
  // Convert answer to string for storage
  const answerString = Array.isArray(answer) ? answer.join(',') : String(answer);
  
  // Get gender from current answers
  const genderAnswer = allAnswers.find(a => a.questionId === 'gender');
  const gender = genderAnswer ? String(genderAnswer.answer) : null;
  
  // Get name and email if available
  const userName = localStorage.getItem('userName');
  const userEmail = localStorage.getItem('userEmail');
  
  // Get IP address
  const ipAddress = await getUserIP();
  
  // Calculate completion time
  let startTime = localStorage.getItem('quiz_start_time');
  if (!startTime) {
    startTime = Date.now().toString();
    localStorage.setItem('quiz_start_time', startTime);
  }
  
  const completionTime = Math.floor((Date.now() - parseInt(startTime)) / 1000);
  
  // Save to localStorage
  localStorage.setItem('quizAnswers', JSON.stringify(allAnswers));
  if (gender) {
    localStorage.setItem('userGender', gender);
  }
  
  // Save to database with enhanced tracking
  try {
    console.log('Saving quiz answer to database:', { sessionId, questionId, answerString, gender, ipAddress });
    
    const { data, error } = await supabase
      .from('quiz_responses')
      .upsert({
        user_session_id: sessionId,
        question_id: questionId,
        answer: answerString,
        gender: gender,
        user_name: userName,
        user_email: userEmail,
        ip_address: ipAddress,
        last_question_id: questionId,
        last_activity_at: new Date().toISOString(),
        session_status: 'in_progress',
        completion_time_seconds: completionTime,
        started_at: new Date(parseInt(startTime)).toISOString()
      }, {
        onConflict: 'user_session_id,question_id'
      });
    
    if (error) {
      console.error('Database save error:', error);
      // Try to sync to admin_dashboard_data table for reporting
      await syncToAdminDashboard(sessionId, allAnswers, ipAddress, userName, userEmail, gender);
    } else {
      console.log('Quiz response saved successfully to database');
      // Also sync to admin dashboard
      await syncToAdminDashboard(sessionId, allAnswers, ipAddress, userName, userEmail, gender);
    }
  } catch (error) {
    console.error('Error saving to database:', error);
  }
};

// Sync data to admin dashboard table
const syncToAdminDashboard = async (sessionId: string, allAnswers: QuizAnswer[], ipAddress: string | null, userName: string | null, userEmail: string | null, gender: string | null) => {
  try {
    const startTime = localStorage.getItem('quiz_start_time');
    const completionTime = startTime ? Math.floor((Date.now() - parseInt(startTime)) / 1000) : null;
    
    await supabase
      .from('admin_dashboard_data')
      .upsert({
        user_session_id: sessionId,
        ip_address: ipAddress,
        user_name: userName,
        user_email: userEmail,
        session_status: 'in_progress',
        questions_answered: allAnswers.length,
        last_question_id: allAnswers[allAnswers.length - 1]?.questionId,
        started_at: startTime ? new Date(parseInt(startTime)).toISOString() : new Date().toISOString(),
        last_activity_at: new Date().toISOString(),
        completion_time_seconds: completionTime
      }, {
        onConflict: 'user_session_id'
      });
    
    console.log('Admin dashboard data synced successfully');
  } catch (error) {
    console.error('Error syncing to admin dashboard:', error);
  }
};

// Mark quiz as completed
export const markQuizCompleted = async () => {
  const sessionId = localStorage.getItem('quiz_session_id');
  if (!sessionId) return;
  
  const startTime = localStorage.getItem('quiz_start_time');
  const completionTime = startTime ? Math.floor((Date.now() - parseInt(startTime)) / 1000) : null;
  
  try {
    // Update quiz_responses table
    await supabase
      .from('quiz_responses')
      .update({
        session_status: 'completed',
        completion_time_seconds: completionTime,
        last_activity_at: new Date().toISOString()
      })
      .eq('user_session_id', sessionId);
    
    // Update admin_dashboard_data table
    await supabase
      .from('admin_dashboard_data')
      .update({
        session_status: 'completed',
        completion_time_seconds: completionTime,
        last_activity_at: new Date().toISOString()
      })
      .eq('user_session_id', sessionId);
    
    console.log('Quiz marked as completed in both tables');
  } catch (error) {
    console.error('Error marking quiz as completed:', error);
  }
};

// Mark quiz as abandoned
export const markQuizAbandoned = async () => {
  const sessionId = localStorage.getItem('quiz_session_id');
  if (!sessionId) return;
  
  try {
    // Update quiz_responses table
    await supabase
      .from('quiz_responses')
      .update({
        session_status: 'abandoned',
        last_activity_at: new Date().toISOString()
      })
      .eq('user_session_id', sessionId);
    
    // Update admin_dashboard_data table
    await supabase
      .from('admin_dashboard_data')
      .update({
        session_status: 'abandoned',
        last_activity_at: new Date().toISOString()
      })
      .eq('user_session_id', sessionId);
    
    console.log('Quiz marked as abandoned in both tables');
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
  
  // Then try database
  const sessionId = localStorage.getItem('quiz_session_id');
  if (sessionId) {
    try {
      const { data, error } = await supabase
        .from('quiz_responses')
        .select('question_id, answer')
        .eq('user_session_id', sessionId);
      
      if (error) {
        console.error('Error loading from database:', error);
        return [];
      }
      
      if (data) {
        return data.map(item => ({
          questionId: item.question_id,
          answer: item.answer.includes(',') ? item.answer.split(',') : item.answer
        }));
      }
    } catch (error) {
      console.error('Error loading from database:', error);
    }
  }
  
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
  
  // If not in localStorage, try to get from database
  if (sessionId) {
    try {
      const { data, error } = await supabase
        .from('quiz_responses')
        .select('question_id, answer, gender')
        .eq('user_session_id', sessionId);
      
      if (error) {
        console.error('Error loading user data from database:', error);
      } else if (data && data.length > 0) {
        // Extract gender from any record
        const gender = data[0].gender || 'Femmina';
        
        // For now, we'll need to get name and email from URL params or user input
        // since they're not stored in quiz_responses table yet
        return {
          name: '',
          email: '',
          gender,
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
  
  // Also update the database records
  const sessionId = localStorage.getItem('quiz_session_id');
  if (sessionId) {
    try {
      // Update quiz_responses table
      await supabase
        .from('quiz_responses')
        .update({
          user_name: name,
          user_email: email,
          last_activity_at: new Date().toISOString()
        })
        .eq('user_session_id', sessionId);
      
      // Update admin_dashboard_data table
      await supabase
        .from('admin_dashboard_data')
        .update({
          user_name: name,
          user_email: email,
          last_activity_at: new Date().toISOString()
        })
        .eq('user_session_id', sessionId);
      
      console.log('User profile updated in both database tables');
    } catch (error) {
      console.error('Error updating user profile in database:', error);
    }
  }
};
