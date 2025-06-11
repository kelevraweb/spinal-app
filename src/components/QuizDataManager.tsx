
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/integrations/supabase/client';

// Function to generate a unique session ID
export const getSessionId = (): string => {
  let sessionId = localStorage.getItem('userSessionId');
  if (!sessionId) {
    sessionId = uuidv4();
    localStorage.setItem('userSessionId', sessionId);
  }
  return sessionId;
};

// Function to save user profile data (name and email)
export const saveUserProfile = (name: string, email: string) => {
  localStorage.setItem('userName', name);
  localStorage.setItem('userEmail', email);
};

// Function to save user's gender
export const saveUserGender = (gender: string) => {
  localStorage.setItem('userGender', gender);
};

// Function to get user's gender
export const getUserGender = (): string | null => {
  return localStorage.getItem('userGender');
};

// Function to save quiz response to local storage
export const saveQuizResponseLocal = (questionId: string, answer: string) => {
  const sessionId = getSessionId();
  localStorage.setItem(`quizResponse_${sessionId}_${questionId}`, answer);
};

// Function to get quiz response from local storage
export const getQuizResponseLocal = (questionId: string): string | null => {
  const sessionId = getSessionId();
  return localStorage.getItem(`quizResponse_${sessionId}_${questionId}`);
};

// Function to save quiz answer (used by Quiz.tsx)
export const saveQuizAnswer = async (questionId: string, answer: string | string[] | number, allAnswers: any[]) => {
  const sessionId = getSessionId();
  const ipAddress = localStorage.getItem('userIPAddress') || 'N/A';
  const userName = localStorage.getItem('userName') || '';
  const userEmail = localStorage.getItem('userEmail') || '';
  const gender = localStorage.getItem('userGender') || 'Femmina';

  try {
    const { error } = await supabase.from('quiz_responses').insert([
      {
        user_session_id: sessionId,
        question_id: questionId,
        answer: String(answer),
        ip_address: ipAddress,
        user_name: userName,
        user_email: userEmail,
        gender: gender,
      },
    ]);

    if (error) {
      console.error('Error saving quiz answer:', error);
    }
  } catch (error) {
    console.error('Error saving quiz answer:', error);
  }
};

// Function to load quiz answers (used by Quiz.tsx)
export const loadQuizAnswers = async () => {
  const sessionId = getSessionId();
  try {
    const { data, error } = await supabase
      .from('quiz_responses')
      .select('question_id, answer')
      .eq('user_session_id', sessionId);

    if (error) {
      console.error('Error loading quiz answers:', error);
      return [];
    }

    return data?.map(item => ({
      questionId: item.question_id,
      answer: item.answer
    })) || [];
  } catch (error) {
    console.error('Error loading quiz answers:', error);
    return [];
  }
};

// Function to check if existing session exists (used by Quiz.tsx)
export const hasExistingSession = (): boolean => {
  const sessionId = localStorage.getItem('userSessionId');
  return !!sessionId;
};

// Function to clear quiz session (used by Quiz.tsx)
export const clearQuizSession = async () => {
  const sessionId = localStorage.getItem('userSessionId');
  if (sessionId) {
    try {
      // Delete from database
      await supabase
        .from('quiz_responses')
        .delete()
        .eq('user_session_id', sessionId);
    } catch (error) {
      console.error('Error clearing quiz session from database:', error);
    }
  }
  
  // Clear from localStorage
  localStorage.removeItem('userSessionId');
  localStorage.removeItem('userName');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userGender');
};

// Function to save quiz response to Supabase
export const saveQuizResponse = async (
  questionId: string,
  answer: string,
  questionType: string,
  options: string[] | null = null
) => {
  const sessionId = getSessionId();
  const ipAddress = localStorage.getItem('userIPAddress') || 'N/A';
  const userName = localStorage.getItem('userName') || '';
  const userEmail = localStorage.getItem('userEmail') || '';
  const gender = localStorage.getItem('userGender') || 'Femmina';

  try {
    const { error } = await supabase.from('quiz_responses').insert([
      {
        user_session_id: sessionId,
        question_id: questionId,
        answer: answer,
        ip_address: ipAddress,
        user_name: userName,
        user_email: userEmail,
        gender: gender,
      },
    ]);

    if (error) {
      console.error('Error saving quiz response:', error);
    }
  } catch (error) {
    console.error('Error saving quiz response:', error);
  }
};

// Function to update quiz session status
export const updateQuizSessionStatus = async (status: 'in_progress' | 'completed' | 'abandoned') => {
  const sessionId = getSessionId();
  try {
    const { error } = await supabase
      .from('quiz_responses')
      .update({ session_status: status, last_activity_at: new Date().toISOString() })
      .eq('user_session_id', sessionId);

    if (error) {
      console.error('Error updating quiz session status:', error);
    }
  } catch (error) {
    console.error('Error updating quiz session status:', error);
  }
};

// Function to mark quiz as completed
export const markQuizCompleted = async () => {
  await updateQuizSessionStatus('completed');
};

// Function to track quiz completion time
export const trackQuizCompletionTime = async (startTime: Date) => {
  const endTime = new Date();
  const completionTimeSeconds = Math.round((endTime.getTime() - startTime.getTime()) / 1000);
  const sessionId = getSessionId();

  try {
    const { error } = await supabase
      .from('quiz_responses')
      .update({ completion_time_seconds: completionTimeSeconds })
      .eq('user_session_id', sessionId);

    if (error) {
      console.error('Error tracking quiz completion time:', error);
    }
  } catch (error) {
    console.error('Error tracking quiz completion time:', error);
  }
};

export const getUserDataFromQuiz = async (): Promise<{
  name: string;
  email: string;
  gender: string;
  sessionId: string | null;
}> => {
  try {
    const sessionId = getSessionId();
    
    // Priorità 1: localStorage (da EmailCapture)
    const savedEmail = localStorage.getItem('userEmail');
    const savedName = localStorage.getItem('userName');
    const savedGender = localStorage.getItem('userGender');
    
    console.log('getUserDataFromQuiz - localStorage data:', { savedEmail, savedName, savedGender });
    
    // Se abbiamo tutto in localStorage, usiamo quello
    if (savedEmail && savedName && savedGender) {
      return {
        email: savedEmail,
        name: savedName,
        gender: savedGender,
        sessionId
      };
    }
    
    // Priorità 2: database
    if (sessionId) {
      const { data, error } = await supabase
        .from('quiz_responses')
        .select('user_name, user_email, gender')
        .eq('user_session_id', sessionId)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (data && !error) {
        console.log('getUserDataFromQuiz - database data:', data);
        return {
          name: data.user_name || savedName || '',
          email: data.user_email || savedEmail || '',
          gender: data.gender || savedGender || 'Femmina',
          sessionId
        };
      }
    }
    
    // Fallback
    return {
      name: savedName || '',
      email: savedEmail || '',
      gender: savedGender || 'Femmina',
      sessionId
    };
  } catch (error) {
    console.error('Error in getUserDataFromQuiz:', error);
    
    // Fallback finale su localStorage
    return {
      name: localStorage.getItem('userName') || '',
      email: localStorage.getItem('userEmail') || '',
      gender: localStorage.getItem('userGender') || 'Femmina',
      sessionId: getSessionId()
    };
  }
};

// Function to start tracking user activity (timestamp)
export const startTrackingUserActivity = async () => {
  const sessionId = getSessionId();
  const ipAddress = localStorage.getItem('userIPAddress') || 'N/A';

  try {
    // Check if a session already exists
    const { data: existingSession, error: selectError } = await supabase
      .from('quiz_responses')
      .select('*')
      .eq('user_session_id', sessionId)
      .limit(1);

    if (selectError) {
      console.error('Error checking existing session:', selectError);
      return;
    }

    if (existingSession && existingSession.length > 0) {
      // Session exists, update the last_activity_at timestamp
      const { error: updateError } = await supabase
        .from('quiz_responses')
        .update({ last_activity_at: new Date().toISOString() })
        .eq('user_session_id', sessionId);

      if (updateError) {
        console.error('Error updating session timestamp:', updateError);
      }
    } else {
      // No session exists, create a new one with required fields
      const { error: insertError } = await supabase.from('quiz_responses').insert([
        {
          user_session_id: sessionId,
          question_id: 'session_start', // Required field
          answer: 'session_started', // Required field
          ip_address: ipAddress,
          started_at: new Date().toISOString(),
          last_activity_at: new Date().toISOString(),
          session_status: 'in_progress',
        },
      ]);

      if (insertError) {
        console.error('Error starting user activity tracking:', insertError);
      }
    }
  } catch (error) {
    console.error('Error starting/updating user activity tracking:', error);
  }
};

// Function to update the last question ID answered by the user
export const updateLastQuestionId = async (questionId: string) => {
  const sessionId = getSessionId();

  try {
    const { error } = await supabase
      .from('quiz_responses')
      .update({ last_question_id: questionId })
      .eq('user_session_id', sessionId);

    if (error) {
      console.error('Error updating last question ID:', error);
    }
  } catch (error) {
    console.error('Error updating last question ID:', error);
  }
};
