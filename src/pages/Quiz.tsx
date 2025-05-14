
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizState, QuizAnswer } from '../types/quiz';
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
import Checkout from '../components/Checkout';
import LoadingAnalysis from '../components/LoadingAnalysis';

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
          // Move to next question
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
    
    // Dopo domanda 2 (dati demografici) mostra trust map
    if (state.currentStep === 1) {
      showSpecialPage = 'trustMap';
    }
    
    // Dopo domanda 23 mostra università
    if (state.currentStep === 22) {
      showSpecialPage = 'universities';
    }
    
    // Dopo domanda 25 mostra l'esperto
    if (state.currentStep === 24) {
      showSpecialPage = 'expert';
    }

    // Dopo la schermata dell'esperto mostra la mappa mondiale
    if (state.showSpecialPage === 'expert') {
      showSpecialPage = 'worldMap';
    }
    
    // Dopo domanda 26 mostra livello benessere
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
        showSpecialPage: 'wellbeingLevel'
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

  const handleSpecialPageComplete = () => {
    // Move to the next step after a special page is shown
    const nextStep = state.currentStep + 1;
    
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
    setState({
      ...state,
      showSpecialPage: 'checkout'
    });
  };

  const handlePurchase = () => {
    // Here you would integrate with Stripe
    console.log('Elaborazione acquisto...');
    navigate('/thank-you');
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
        
      case 'checkout':
        return (
          <>
            <TopNavBar 
              currentStep={state.currentStep} 
              totalSteps={state.totalSteps}
              onBack={handleBack}
              canGoBack={true}
            />
            <Checkout onPurchase={handlePurchase} />
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
      <div className={`quiz-container pt-16 ${isAnimating ? 'opacity-50' : ''}`}>
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
                Indietro
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
              {state.currentStep === state.totalSteps - 1 ? 'Completa' : 'Avanti'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Quiz;
