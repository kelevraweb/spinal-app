import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizState, QuizAnswer, QuizOption } from '../types/quiz';
import { quizQuestions, additionalQuestions } from '../data/quizQuestions';
import TopNavBar from '../components/TopNavBar';

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
import LoadingAnalysis from '../components/LoadingAnalysis';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

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
  const [transitionDirection, setTransitionDirection] = useState<'next' | 'prev'>('next');
  const [debugMessage, setDebugMessage] = useState<string>('');
  const [shouldAutoAdvance, setShouldAutoAdvance] = useState(false); // Set to false by default

  // Helper function to get the text value of an option
  const getOptionText = (option: string | QuizOption): string => {
    return typeof option === 'string' ? option : option.text;
  };

  // Handle automatic transitions between special pages
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    
    // Handle automatic transitions based on current special page
    if (state.showSpecialPage === 'trustMap' || state.showSpecialPage === 'universities' || 
        state.showSpecialPage === 'expert' || state.showSpecialPage === 'worldMap') {
      // Create a timer to auto-advance these screens after 5 seconds
      timer = setTimeout(() => {
        if (state.showSpecialPage === 'trustMap' || state.showSpecialPage === 'universities' || 
            state.showSpecialPage === 'expert') {
          // Move to next question - use handleSpecialPageComplete to ensure proper state updates
          handleSpecialPageComplete();
        } else if (state.showSpecialPage === 'worldMap') {
          // After world map go to wellbeing level
          setState(prevState => ({
            ...prevState,
            showSpecialPage: 'wellbeingLevel'
          }));
        }
      }, 5000);
    }
    
    // Cleanup function to clear any timers when the component unmounts or state changes
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [state.showSpecialPage]);

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
    
    // Auto advance is disabled by default
    setShouldAutoAdvance(false);

    // For debug purposes - add information about current step and question
    if (state.currentQuestion) {
      setDebugMessage(`Step: ${state.currentStep}, Question ID: ${state.currentQuestion.id}`);
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
    
    // Set transition direction
    setTransitionDirection('next');
    
    // Special pages triggers
    let showSpecialPage = undefined;
    
    // After question 2 (demographic data) show trust map
    if (state.currentStep === 1) {
      showSpecialPage = 'trustMap';
    }
    
    // After question 23 show universities
    if (state.currentStep === 23) {
      showSpecialPage = 'universities';
    }
    
    // After question 26 show expert
    if (state.currentStep === 26) {
      showSpecialPage = 'expert';
    }

    // After expert screen show world map
    if (state.showSpecialPage === 'expert') {
      showSpecialPage = 'worldMap';
    }
    
    // After question 30 show wellbeing level
    if (state.currentStep === 29) {
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
        showSpecialPage: 'wellbeingLevel'
      });
      return;
    }
    
    setIsAnimating(true);
    
    // First update answers
    setState(prevState => ({
      ...prevState,
      answers: updatedAnswers,
      // Only update special page status but keep other state intact
      showSpecialPage
    }));
    
    // If showing a special page, don't immediately change the current question
    // Instead, let the special page complete and trigger handleSpecialPageComplete
    if (!showSpecialPage) {
      // For normal transitions, change to next question after animation
      setTimeout(() => {
        setState(prevState => ({
          ...prevState,
          currentStep: nextStep,
          currentQuestion: quizQuestions[nextStep],
        }));
        
        setIsAnimating(false);
      }, 200);
    } else {
      // For special pages, just finish the animation for current question
      // The special page transition will be handled in handleSpecialPageComplete
      setTimeout(() => {
        setIsAnimating(false);
      }, 200);
    }
  };

  const handleBack = () => {
    if (state.currentStep <= 0 || isAnimating) return;
    
    setIsAnimating(true);
    setTransitionDirection('prev');
    
    setTimeout(() => {
      const prevStep = state.currentStep - 1;
      setState({
        ...state,
        currentStep: prevStep,
        currentQuestion: quizQuestions[prevStep],
        showSpecialPage: undefined
      });
      
      setIsAnimating(false);
    }, 200);
  };

  const handleSpecialPageComplete = () => {
    // Move to the next step after a special page is shown
    const nextStep = state.currentStep + 1;
    
    // Ensure we're not animating when transitioning from special page
    setIsAnimating(false);
    
    // Use the functional setState to ensure we have the latest state
    setState(prevState => ({
      ...prevState,
      currentStep: nextStep,
      currentQuestion: quizQuestions[nextStep],
      showSpecialPage: undefined
    }));
  };

  const handleWellbeingLevelComplete = () => {
    // After wellbeingLevel is shown, show loadingAnalysis
    setState({
      ...state,
      showSpecialPage: 'loadingAnalysis'
    });
  };

  const handleLoadingAnalysisComplete = () => {
    // Dopo il caricamento mostra il grafico di progresso
    setState({
      ...state,
      showSpecialPage: 'progressChart'
    });
  };

  const handleProgressChartComplete = () => {
    // After progress chart is shown, show email capture
    setState({
      ...state,
      showSpecialPage: 'emailCapture'
    });
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
  };

  const handleSinusoidalComplete = () => {
    // Navigate to the Pricing page instead of showing the checkout component
    navigate('/pricing');
  };

  // Render special pages based on current state
  if (state.showSpecialPage) {
    switch(state.showSpecialPage) {
      case 'trustMap':
        return (
          <>
            <TopNavBar 
              currentStep={state.currentStep} 
              totalSteps={state.totalSteps}
              onBack={handleBack}
              canGoBack={false}
            />
            <TrustMapAnimation onContinue={handleSpecialPageComplete} />
          </>
        );
        
      case 'universities':
        return (
          <>
            <TopNavBar 
              currentStep={state.currentStep} 
              totalSteps={state.totalSteps}
              onBack={handleBack}
              canGoBack={false}
            />
            <UniversityLogos />
          </>
        );
        
      case 'expert':
        return (
          <>
            <TopNavBar 
              currentStep={state.currentStep} 
              totalSteps={state.totalSteps}
              onBack={handleBack}
              canGoBack={false}
            />
            <ExpertReview />
          </>
        );

      case 'worldMap':
        return (
          <>
            <TopNavBar 
              currentStep={state.currentStep} 
              totalSteps={state.totalSteps}
              onBack={handleBack}
              canGoBack={false}
            />
            <TrustMapAnimation worldMap={true} onContinue={() => {
              setState(prevState => ({
                ...prevState,
                showSpecialPage: 'wellbeingLevel'
              }));
            }} />
          </>
        );
        
      case 'wellbeingLevel':
        return (
          <>
            <TopNavBar 
              currentStep={state.currentStep} 
              totalSteps={state.totalSteps}
              onBack={handleBack}
              canGoBack={false}
            />
            <WellbeingLevelIndicator 
              level="Medium" 
              onContinue={handleWellbeingLevelComplete}
            />
          </>
        );
        
      case 'loadingAnalysis':
        return (
          <>
            <TopNavBar 
              currentStep={state.currentStep} 
              totalSteps={state.totalSteps}
              onBack={handleBack}
              canGoBack={false}
            />
            <LoadingAnalysis onComplete={handleLoadingAnalysisComplete} />
          </>
        );
        
      case 'progressChart':
        return (
          <>
            <TopNavBar 
              currentStep={state.currentStep} 
              totalSteps={state.totalSteps}
              onBack={handleBack}
              canGoBack={false}
            />
            <ProgressChart onContinue={handleProgressChartComplete} />
          </>
        );
        
      case 'emailCapture':
        return (
          <>
            <TopNavBar 
              currentStep={state.currentStep} 
              totalSteps={state.totalSteps}
              onBack={handleBack}
              canGoBack={false}
            />
            <EmailCapture onSubmit={handleEmailCapture} />
          </>
        );
        
      case 'sinusoidalGraph':
        return (
          <>
            <TopNavBar 
              currentStep={state.currentStep} 
              totalSteps={state.totalSteps}
              onBack={handleBack}
              canGoBack={false}
            />
            <SinusoidalGraph onContinue={handleSinusoidalComplete} />
          </>
        );
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
            useImages={state.currentQuestion.id === 'gender'}
            questionId={state.currentQuestion.id}
            autoAdvance={false} // Always disable auto-advance
          />
        );
        
      case 'multiple':
        return (
          <MultipleChoice
            options={state.currentQuestion.options || []}
            value={currentAnswer as string[]}
            onChange={handleAnswerChange}
            maxSelections={state.currentQuestion.maxSelections}
            onNextClick={handleNext} // Add Next button functionality
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
        return <p>Tipo di domanda non supportato</p>;
    }
  };

  return (
    <>
      <TopNavBar 
        currentStep={state.currentStep} 
        totalSteps={state.totalSteps} 
        onBack={handleBack}
        canGoBack={state.currentStep > 0}
      />
      <div className="quiz-container pt-24">
        <div 
          className={`quiz-card transform transition-all duration-200 ${
            isAnimating 
              ? transitionDirection === 'next' 
                ? 'translate-x-4 opacity-0' 
                : '-translate-x-4 opacity-0' 
              : 'translate-x-0 opacity-100'
          }`}
        >
          {/* Progress bar */}
          <div className="progress-container">
            <div 
              className="progress-bar"
              style={{ width: `${(state.currentStep / state.totalSteps) * 100}%` }}
            ></div>
          </div>
          
          {/* Question */}
          <h2 className="question-title">
            {state.currentQuestion?.question || 'Loading...'}
          </h2>
          
          {/* Question content based on type */}
          {renderQuestionContent()}
          
          {/* Show next button for single choice questions */}
          {state.currentQuestion && state.currentQuestion.type === 'single' && (
            <div className="mt-8">
              <button
                onClick={handleNext}
                disabled={!isNextEnabled}
                className={`w-full py-3 rounded-lg flex items-center justify-center font-medium ${
                  isNextEnabled 
                    ? 'bg-[#71b8bc] text-white' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <span>Avanti</span>
                <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Quiz;
