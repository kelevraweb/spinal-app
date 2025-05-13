
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizState, QuizAnswer } from '../types/quiz';
import { quizQuestions, additionalQuestions } from '../data/quizQuestions';

// Question type components
import SingleChoice from '../components/QuestionTypes/SingleChoice';
import MultipleChoice from '../components/QuestionTypes/MultipleChoice';
import TextInput from '../components/QuestionTypes/TextInput';
import ScaleInput from '../components/QuestionTypes/ScaleInput';
import ColorSelection from '../components/QuestionTypes/ColorSelection';

// Special pages
import TrustMapAnimation from '../components/TrustMapAnimation';
import UniversityLogos from '../components/UniversityLogos';
import ExpertReview from '../components/ExpertReview';
import ProgressChart from '../components/ProgressChart';
import WellbeingLevelIndicator from '../components/WellbeingLevelIndicator';
import EmailCapture from '../components/EmailCapture';
import SinusoidalGraph from '../components/SinusoidalGraph';
import Checkout from '../components/Checkout';

const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<QuizState>({
    currentStep: 0,
    totalSteps: quizQuestions.length,
    answers: [],
    currentQuestion: quizQuestions[0],
    isSubmitting: false,
    isCompleted: false,
    userProfile: {
      answers: []
    }
  });

  const [currentAnswer, setCurrentAnswer] = useState<string | string[] | number>('');
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Check if current question has been answered before
    const existingAnswer = state.answers.find(
      answer => answer.questionId === state.currentQuestion?.id
    );
    
    if (existingAnswer) {
      setCurrentAnswer(existingAnswer.answer);
      setIsNextEnabled(true);
    } else {
      setCurrentAnswer('');
      setIsNextEnabled(false);
    }
  }, [state.currentStep, state.currentQuestion]);

  const handleAnswerChange = (answer: string | string[] | number) => {
    setCurrentAnswer(answer);
    
    // Empty answers should not enable next button
    if (
      (Array.isArray(answer) && answer.length === 0) ||
      (typeof answer === 'string' && answer.trim() === '') ||
      answer === undefined
    ) {
      setIsNextEnabled(false);
    } else {
      setIsNextEnabled(true);
    }
  };

  const handleNext = () => {
    if (!isNextEnabled || isAnimating) return;
    
    // Save current answer
    const updatedAnswers = [...state.answers];
    const existingAnswerIndex = updatedAnswers.findIndex(
      answer => answer.questionId === state.currentQuestion?.id
    );
    
    const newAnswer: QuizAnswer = {
      questionId: state.currentQuestion?.id || '',
      answer: currentAnswer
    };
    
    if (existingAnswerIndex >= 0) {
      updatedAnswers[existingAnswerIndex] = newAnswer;
    } else {
      updatedAnswers.push(newAnswer);
    }
    
    // Special pages triggers
    let showSpecialPage = undefined;
    
    // After question 2 (demographic data) show trust map
    if (state.currentStep === 1) {
      showSpecialPage = 'trustMap';
    }
    
    // After question 23 show universities
    if (state.currentStep === 22) {
      showSpecialPage = 'universities';
    }
    
    // After question 25 show expert
    if (state.currentStep === 24) {
      showSpecialPage = 'expert';
    }
    
    // After question 26 show wellbeing level
    if (state.currentStep === 25) {
      showSpecialPage = 'wellbeingLevel';
    }
    
    // Calculate next step
    let nextStep = state.currentStep + 1;
    
    // Check if quiz is completed
    if (nextStep >= state.totalSteps) {
      setState({
        ...state,
        answers: updatedAnswers,
        isCompleted: true,
        showSpecialPage: 'progressChart'
      });
      return;
    }
    
    setIsAnimating(true);
    
    // Update state with new answers and next question
    setState({
      ...state,
      answers: updatedAnswers,
      showSpecialPage
    });
    
    // Wait for animation to complete before moving to next question
    setTimeout(() => {
      setState(prevState => ({
        ...prevState,
        currentStep: nextStep,
        currentQuestion: quizQuestions[nextStep],
        showSpecialPage: undefined
      }));
      
      setIsAnimating(false);
    }, showSpecialPage ? 5000 : 300);
  };

  const handleBack = () => {
    if (state.currentStep <= 0 || isAnimating) return;
    
    setIsAnimating(true);
    
    setTimeout(() => {
      const prevStep = state.currentStep - 1;
      setState({
        ...state,
        currentStep: prevStep,
        currentQuestion: quizQuestions[prevStep],
        showSpecialPage: undefined
      });
      
      setIsAnimating(false);
    }, 300);
  };

  const handleEmailCapture = (email: string) => {
    // Update user profile with email
    const updatedProfile = {
      ...state.userProfile,
      email
    };
    
    setState({
      ...state,
      userProfile: updatedProfile,
      showSpecialPage: 'sinusoidalGraph'
    });
    
    // After a delay, show checkout
    setTimeout(() => {
      setState(prevState => ({
        ...prevState,
        showSpecialPage: 'checkout'
      }));
    }, 5000);
  };

  const handlePurchase = () => {
    // Here you would integrate with Stripe
    console.log('Processing purchase...');
    navigate('/thank-you');
  };

  const handleProgressChartComplete = () => {
    // After progress chart is shown, show email capture
    setState({
      ...state,
      showSpecialPage: 'emailCapture'
    });
  };

  // Render special pages based on current state
  if (state.showSpecialPage) {
    switch(state.showSpecialPage) {
      case 'trustMap':
        return <TrustMapAnimation />;
        
      case 'universities':
        return <UniversityLogos />;
        
      case 'expert':
        return <ExpertReview />;
        
      case 'wellbeingLevel':
        return <WellbeingLevelIndicator level="Medium" />;
        
      case 'progressChart':
        setTimeout(handleProgressChartComplete, 5000);
        return <ProgressChart />;
        
      case 'emailCapture':
        return <EmailCapture onSubmit={handleEmailCapture} />;
        
      case 'sinusoidalGraph':
        return <SinusoidalGraph />;
        
      case 'checkout':
        return <Checkout onPurchase={handlePurchase} />;
    }
  }

  // Render current quiz question
  const renderQuestionContent = () => {
    if (!state.currentQuestion) return null;
    
    switch(state.currentQuestion.type) {
      case 'single':
        return (
          <SingleChoice
            options={state.currentQuestion.options || []}
            value={currentAnswer as string}
            onChange={handleAnswerChange}
          />
        );
        
      case 'multiple':
        return (
          <MultipleChoice
            options={state.currentQuestion.options || []}
            value={currentAnswer as string[]}
            onChange={handleAnswerChange}
            maxSelections={state.currentQuestion.maxSelections}
          />
        );
        
      case 'text':
        return (
          <TextInput
            value={currentAnswer as string}
            onChange={handleAnswerChange}
          />
        );
        
      case 'scale':
        return (
          <ScaleInput
            value={currentAnswer as number || 5}
            onChange={handleAnswerChange}
          />
        );
        
      case 'color':
        return (
          <ColorSelection
            value={currentAnswer as string[]}
            onChange={handleAnswerChange}
          />
        );
        
      default:
        return <p>Question type not supported</p>;
    }
  };

  return (
    <div className={`quiz-container ${isAnimating ? 'opacity-50' : ''}`}>
      <div className="quiz-card">
        {/* Progress bar */}
        <div className="progress-container">
          <div 
            className="progress-bar"
            style={{ width: `${(state.currentStep / state.totalSteps) * 100}%` }}
          ></div>
        </div>
        
        {/* Question */}
        <h2 className="question-title">
          {state.currentQuestion?.question}
        </h2>
        
        {/* Question content based on type */}
        {renderQuestionContent()}
        
        {/* Navigation buttons */}
        <div className="flex justify-between mt-8">
          {state.currentStep > 0 ? (
            <button 
              type="button"
              className="btn-secondary"
              onClick={handleBack}
              disabled={isAnimating}
            >
              Back
            </button>
          ) : (
            <div></div> /* Empty div to maintain layout */
          )}
          
          <button
            type="button"
            className="btn-primary"
            onClick={handleNext}
            disabled={!isNextEnabled || isAnimating}
          >
            {state.currentStep === state.totalSteps - 1 ? 'Complete' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
