import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { QuizQuestion, QuizAnswer, QuizState } from '../types/quiz';
import { quizQuestions } from '../data/quizQuestions';

import SingleChoice from '../components/QuestionTypes/SingleChoice';
import MultipleChoice from '../components/QuestionTypes/MultipleChoice';
import TextInput from '../components/QuestionTypes/TextInput';
import ScaleInput from '../components/QuestionTypes/ScaleInput';
import ColorSelection from '../components/QuestionTypes/ColorSelection';

import TrustMapAnimation from '../components/TrustMapAnimation';
import UniversityLogos from '../components/UniversityLogos';
import ExpertReview from '../components/ExpertReview';
import ProgressChart from '../components/ProgressChart';
import WellbeingLevelIndicator from '../components/WellbeingLevelIndicator';
import EmailCapture from '../components/EmailCapture';
import SinusoidalGraph from '../components/SinusoidalGraph';
import Checkout from '../components/Checkout';
import WorldCommunity from '../components/WorldCommunity';
import LoadingAnalysis from '../components/LoadingAnalysis';
import NameCapture from '../components/NameCapture';
import QuizSessionModal from '../components/QuizSessionModal';

import { 
  saveQuizAnswer, 
  loadQuizAnswers, 
  getUserGender, 
  hasExistingSession,
  clearQuizSession,
  markQuizCompleted,
  initializeQuizSession
} from '../components/QuizDataManager';

import { useFacebookPixel } from '../hooks/useFacebookPixel';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const { trackViewContent, trackInitiateCheckout, trackCompleteRegistration } = useFacebookPixel();

  const [state, setState] = useState<QuizState>({
    currentStep: 0,
    totalSteps: quizQuestions.length,
    answers: [],
    currentQuestion: quizQuestions[0],
    isSubmitting: false,
    isCompleted: false,
    userProfile: { answers: [] },
    showSpecialPage: undefined
  });

  const [showSessionModal, setShowSessionModal] = useState(false);

  useEffect(() => {
    // Initialize quiz session when component mounts
    const initSession = async () => {
      try {
        await initializeQuizSession();
        console.log('Quiz session initialized successfully');
      } catch (error) {
        console.error('Error initializing quiz session:', error);
      }
    };

    initSession();

    // Check for existing session
    if (hasExistingSession()) {
      setShowSessionModal(true);
    }

    // Track page view
    trackViewContent({
      content_name: 'Quiz Start',
      content_category: 'quiz',
      content_ids: ['quiz_start']
    });
  }, [trackViewContent]);

  const handleSessionChoice = async (choice: 'continue' | 'restart') => {
    if (choice === 'continue') {
      const savedAnswers = await loadQuizAnswers();
      setState(prev => ({
        ...prev,
        answers: savedAnswers,
        currentStep: savedAnswers.length,
        currentQuestion: quizQuestions[savedAnswers.length] || quizQuestions[quizQuestions.length - 1]
      }));
    } else {
      await clearQuizSession();
      await initializeQuizSession();
    }
    setShowSessionModal(false);
  };

  const handleNext = async () => {
    if (state.currentStep < state.totalSteps) {
      const nextStep = state.currentStep + 1;
      const nextQuestion = quizQuestions[nextStep];
      
      setState(prev => ({
        ...prev,
        currentStep: nextStep,
        currentQuestion: nextQuestion
      }));

      // Save current answer
      if (state.currentQuestion) {
        const currentAnswer = state.answers.find(a => a.questionId === state.currentQuestion!.id);
        if (currentAnswer) {
          await saveQuizAnswer(state.currentQuestion.id, currentAnswer.answer, state.answers);
        }
      }

      // Check for special pages to show
      if (nextStep === 3) {
        setState(prev => ({ ...prev, showSpecialPage: 'trustMap' }));
      } else if (nextStep === 6) {
        setState(prev => ({ ...prev, showSpecialPage: 'universities' }));
      } else if (nextStep === 9) {
        setState(prev => ({ ...prev, showSpecialPage: 'expert' }));
      } else if (nextStep === 12) {
        setState(prev => ({ ...prev, showSpecialPage: 'progressChart' }));
      } else if (nextStep === 15) {
        setState(prev => ({ ...prev, showSpecialPage: 'wellbeingLevel' }));
      } else if (nextStep === 18) {
        setState(prev => ({ ...prev, showSpecialPage: 'emailCapture' }));
      } else if (nextStep === 20) {
        setState(prev => ({ ...prev, showSpecialPage: 'sinusoidalGraph' }));
      } else if (nextStep === 22) {
        setState(prev => ({ ...prev, showSpecialPage: 'worldCommunity' }));
      } else if (nextStep === 24) {
        setState(prev => ({ ...prev, showSpecialPage: 'loadingAnalysis' }));
      } else if (nextStep === 26) {
        setState(prev => ({ ...prev, showSpecialPage: 'nameCapture' }));
      } else if (nextStep >= state.totalSteps) {
        await markQuizCompleted();
        setState(prev => ({ ...prev, showSpecialPage: 'checkout' }));
      }
    }
  };

  const handleBack = () => {
    if (state.currentStep > 0) {
      const prevStep = state.currentStep - 1;
      const prevQuestion = quizQuestions[prevStep];
      
      setState(prev => ({
        ...prev,
        currentStep: prevStep,
        currentQuestion: prevQuestion,
        showSpecialPage: undefined
      }));
    }
  };

  const handleAnswer = (questionId: string, answer: string | string[] | number) => {
    setState(prev => {
      const newAnswers = prev.answers.filter(a => a.questionId !== questionId);
      newAnswers.push({ questionId, answer });
      
      return {
        ...prev,
        answers: newAnswers,
        userProfile: {
          ...prev.userProfile,
          answers: newAnswers
        }
      };
    });
  };

  const calculateWellbeingScore = (): number => {
    let score = 50;

    state.answers.forEach(answer => {
      const questionId = answer.questionId;
      const question = quizQuestions.find(q => q.id === questionId);

      if (questionId === 'optimism') {
        const scaleAnswer = Number(answer.answer);
        score += (scaleAnswer - 5) * 2;
      } else if (questionId === 'socialSupport') {
        const scaleAnswer = Number(answer.answer);
        score += (scaleAnswer - 5) * 2;
      } else if (questionId === 'resilience') {
        const scaleAnswer = Number(answer.answer);
        score += (scaleAnswer - 5) * 2;
      } else if (questionId === 'mindfulness') {
        const scaleAnswer = Number(answer.answer);
        score += (scaleAnswer - 5) * 2;
      } else if (questionId === 'purpose') {
        const scaleAnswer = Number(answer.answer);
        score += (scaleAnswer - 5) * 2;
      }
    });
    
    return Math.min(100, Math.max(0, Math.floor(score)));
  };

  const handleSpecialPageComplete = () => {
    setState(prev => ({ ...prev, showSpecialPage: undefined }));
  };

  const handleEmailCapture = (email: string) => {
    setState(prev => ({
      ...prev,
      userProfile: { ...prev.userProfile, email },
      showSpecialPage: undefined
    }));

    trackCompleteRegistration({
      content_name: 'Email Capture',
      content_category: 'registration'
    });
  };

  const handleNameCapture = (name: string) => {
    setState(prev => ({
      ...prev,
      userProfile: { ...prev.userProfile, name },
      showSpecialPage: undefined
    }));
  };

  const getCurrentAnswer = () => {
    if (!state.currentQuestion) return undefined;
    const answer = state.answers.find(a => a.questionId === state.currentQuestion!.id);
    return answer?.answer;
  };

  const isAnswerValid = () => {
    const currentAnswer = getCurrentAnswer();
    if (!state.currentQuestion?.required) return true;
    
    if (Array.isArray(currentAnswer)) {
      return currentAnswer.length > 0;
    }
    
    return currentAnswer !== undefined && currentAnswer !== '';
  };

  const renderQuestion = () => {
    if (!state.currentQuestion) return null;

    const currentAnswer = getCurrentAnswer();

    const questionProps = {
      question: state.currentQuestion,
      answer: currentAnswer,
      onAnswer: handleAnswer
    };

    switch (state.currentQuestion.type) {
      case 'single':
        return <SingleChoice {...questionProps} />;
      case 'multiple':
        return <MultipleChoice {...questionProps} />;
      case 'text':
      case 'email':
        return <TextInput {...questionProps} />;
      case 'scale':
        return <ScaleInput {...questionProps} />;
      case 'color':
        return <ColorSelection {...questionProps} />;
      default:
        return <div>Tipo di domanda non supportato</div>;
    }
  };

  const renderSpecialPage = () => {
    const gender = getUserGender();
    
    switch (state.showSpecialPage) {
      case 'trustMap':
        return <TrustMapAnimation onComplete={handleSpecialPageComplete} />;
      case 'universities':
        return <UniversityLogos onComplete={handleSpecialPageComplete} />;
      case 'expert':
        return <ExpertReview onComplete={handleSpecialPageComplete} />;
      case 'progressChart':
        return <ProgressChart onComplete={handleSpecialPageComplete} />;
      case 'wellbeingLevel':
        return <WellbeingLevelIndicator 
          score={calculateWellbeingScore()} 
          onComplete={handleSpecialPageComplete} 
        />;
      case 'emailCapture':
        return <EmailCapture onComplete={handleEmailCapture} />;
      case 'sinusoidalGraph':
        return <SinusoidalGraph onComplete={handleSpecialPageComplete} />;
      case 'worldCommunity':
        return <WorldCommunity onComplete={handleSpecialPageComplete} />;
      case 'loadingAnalysis':
        return <LoadingAnalysis onComplete={handleSpecialPageComplete} />;
      case 'nameCapture':
        return <NameCapture onComplete={handleNameCapture} />;
      case 'checkout':
        return <Checkout 
          userProfile={state.userProfile} 
          wellbeingScore={calculateWellbeingScore()}
          gender={gender}
        />;
      default:
        return null;
    }
  };

  if (showSessionModal) {
    return <QuizSessionModal onChoice={handleSessionChoice} />;
  }

  if (state.showSpecialPage) {
    return (
      <div className="min-h-screen">
        {renderSpecialPage()}
      </div>
    );
  }

  const progressPercentage = (state.currentStep / state.totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="shadow-xl">
          <CardContent className="p-8">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">
                  Domanda {state.currentStep + 1} di {state.totalSteps}
                </span>
                <span className="text-sm text-gray-600">
                  {Math.round(progressPercentage)}%
                </span>
              </div>
              <Progress value={progressPercentage} className="w-full" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={state.currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderQuestion()}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={state.currentStep === 0}
              >
                Indietro
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={!isAnswerValid() || state.isSubmitting}
              >
                {state.currentStep === state.totalSteps - 1 ? 'Completa' : 'Avanti'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Quiz;
