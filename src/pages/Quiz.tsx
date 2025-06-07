import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizState, QuizAnswer, QuizOption } from '../types/quiz';
import { quizQuestions, additionalQuestions } from '../data/quizQuestions';
import TopNavBar from '../components/TopNavBar';
import { saveQuizAnswer, loadQuizAnswers, hasExistingSession, clearQuizSession } from '../components/QuizDataManager';
import QuizSessionModal from '../components/QuizSessionModal';
import { useToast } from '@/hooks/use-toast';

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
import WorldCommunity from '../components/WorldCommunity';
import ProgressChart from '../components/ProgressChart';
import WellbeingLevelIndicator from '../components/WellbeingLevelIndicator';
import EmailCapture from '../components/EmailCapture';
import NameCapture from '../components/NameCapture';
import SinusoidalGraph from '../components/SinusoidalGraph';
import LoadingAnalysis from '../components/LoadingAnalysis';

const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
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
  const [shouldAutoAdvance, setShouldAutoAdvance] = useState(false);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [sessionChecked, setSessionChecked] = useState(false);
  const [quizData, setQuizData] = useState({
    name: '',
    email: ''
  });

  // Check for existing session on component mount
  useEffect(() => {
    if (hasExistingSession() && !sessionChecked) {
      setShowSessionModal(true);
    } else {
      setSessionChecked(true);
    }
  }, [sessionChecked]);
  const handleContinueSession = async () => {
    const existingAnswers = await loadQuizAnswers();
    if (existingAnswers.length > 0) {
      setState(prevState => ({
        ...prevState,
        answers: existingAnswers,
        currentStep: existingAnswers.length < quizQuestions.length ? existingAnswers.length : 0
      }));
    }
    setShowSessionModal(false);
    setSessionChecked(true);
  };
  const handleRestartSession = async () => {
    await clearQuizSession();
    setState(prevState => ({
      ...prevState,
      currentStep: 0,
      answers: [],
      currentQuestion: quizQuestions[0]
    }));
    setShowSessionModal(false);
    setSessionChecked(true);
  };

  // Load existing answers only after session check is complete
  useEffect(() => {
    if (sessionChecked && !showSessionModal) {
      const loadExistingAnswers = async () => {
        const existingAnswers = await loadQuizAnswers();
        if (existingAnswers.length > 0) {
          setState(prevState => ({
            ...prevState,
            answers: existingAnswers
          }));
        }
      };
      loadExistingAnswers();
    }
  }, [sessionChecked, showSessionModal]);

  // Helper function to get the text value of an option
  const getOptionText = (option: string | QuizOption): string => {
    return typeof option === 'string' ? option : option.text;
  };

  // Helper function to get the gender from answers
  const getSelectedGender = () => {
    const genderAnswer = state.answers.find(answer => answer.questionId === 'gender');
    return genderAnswer ? genderAnswer.answer as string : 'Femmina'; // Default to female
  };

  // Handle automatic transitions between special pages
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (state.showSpecialPage === 'trustMap' || state.showSpecialPage === 'universities' || state.showSpecialPage === 'expert' || state.showSpecialPage === 'worldMap') {
      timer = setTimeout(() => {
        if (state.showSpecialPage === 'trustMap' || state.showSpecialPage === 'universities' || state.showSpecialPage === 'expert') {
          handleSpecialPageComplete();
        } else if (state.showSpecialPage === 'worldMap') {
          setState(prevState => ({
            ...prevState,
            showSpecialPage: 'wellbeingLevel'
          }));
        }
      }, 5000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [state.showSpecialPage]);
  useEffect(() => {
    const existingAnswer = state.answers.find(answer => answer.questionId === state.currentQuestion?.id);
    if (existingAnswer) {
      setCurrentAnswer(existingAnswer.answer);
      setIsNextEnabled(true);
    } else {
      setCurrentAnswer('');
      setIsNextEnabled(false);
    }

    // Only enable auto-advance for single choice questions if session is checked
    setShouldAutoAdvance(state.currentQuestion?.type === 'single' && sessionChecked);
  }, [state.currentStep, state.currentQuestion, sessionChecked]);

  // Auto-advance for single choice questions
  useEffect(() => {
    if (shouldAutoAdvance && currentAnswer && state.currentQuestion?.type === 'single') {
      const timer = setTimeout(() => {
        handleNext();
      }, 800); // Small delay for better UX

      return () => clearTimeout(timer);
    }
  }, [currentAnswer, shouldAutoAdvance]);
  const handleAnswerChange = (answer: string | string[] | number) => {
    setCurrentAnswer(answer);
    if (Array.isArray(answer) && answer.length === 0 || typeof answer === 'string' && answer.trim() === '' || answer === undefined) {
      setIsNextEnabled(false);
    } else {
      setIsNextEnabled(true);
    }
  };
  const handleNext = async () => {
    if (!isNextEnabled || isAnimating) return;
    const updatedAnswers = [...state.answers];
    const existingAnswerIndex = updatedAnswers.findIndex(answer => answer.questionId === state.currentQuestion?.id);
    const newAnswer: QuizAnswer = {
      questionId: state.currentQuestion?.id || '',
      answer: currentAnswer
    };
    if (existingAnswerIndex >= 0) {
      updatedAnswers[existingAnswerIndex] = newAnswer;
    } else {
      updatedAnswers.push(newAnswer);
    }

    // Save answer immediately
    if (state.currentQuestion?.id) {
      await saveQuizAnswer(state.currentQuestion.id, currentAnswer, updatedAnswers);
    }
    setTransitionDirection('next');
    let showSpecialPage = undefined;
    if (state.currentStep === 1) {
      showSpecialPage = 'trustMap';
    }
    if (state.currentStep === 23) {
      showSpecialPage = 'universities';
    }
    if (state.currentStep === 26) {
      showSpecialPage = 'expert';
    }
    if (state.showSpecialPage === 'expert') {
      showSpecialPage = 'worldCommunity';
    }
    if (state.currentStep === 29) {
      showSpecialPage = 'wellbeingLevel';
    }
    let nextStep = state.currentStep + 1;
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
    setState(prevState => ({
      ...prevState,
      answers: updatedAnswers,
      showSpecialPage
    }));
    if (!showSpecialPage) {
      setTimeout(() => {
        setState(prevState => ({
          ...prevState,
          currentStep: nextStep,
          currentQuestion: quizQuestions[nextStep]
        }));
        setIsAnimating(false);
      }, 200);
    } else {
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
    const nextStep = state.currentStep + 1;
    setIsAnimating(false);
    setState(prevState => ({
      ...prevState,
      currentStep: nextStep,
      currentQuestion: quizQuestions[nextStep],
      showSpecialPage: undefined
    }));
  };
  const handleWorldCommunityComplete = () => {
    setState(prevState => ({
      ...prevState,
      showSpecialPage: 'wellbeingLevel'
    }));
  };
  const handleWellbeingLevelComplete = () => {
    setState({
      ...state,
      showSpecialPage: 'loadingAnalysis'
    });
  };
  const handleLoadingAnalysisComplete = () => {
    setState({
      ...state,
      showSpecialPage: 'progressChart'
    });
  };
  const handleProgressChartComplete = () => {
    setState({
      ...state,
      showSpecialPage: 'emailCapture'
    });
  };
  const handleEmailCapture = (email: string) => {
    const updatedProfile = {
      ...state.userProfile,
      email
    };
    setState({
      ...state,
      userProfile: updatedProfile,
      showSpecialPage: 'nameCapture'
    });
  };
  const handleNameCapture = (name: string) => {
    const updatedProfile = {
      ...state.userProfile,
      name
    };
    setState({
      ...state,
      userProfile: updatedProfile,
      showSpecialPage: 'sinusoidalGraph'
    });
  };
  const handleSinusoidalComplete = async () => {
    // Clear the quiz session when completed
    await clearQuizSession();

    // Pass the name to pricing page via URL params and scroll to top
    const userName = state.userProfile.name || '';
    navigate(`/pricing-discounted?name=${encodeURIComponent(userName)}`);
    // Ensure page starts from top
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  };

  // Show session modal if needed
  if (showSessionModal) {
    return <div className="max-w-[580px] mx-auto px-4">
        <TopNavBar currentStep={state.currentStep} totalSteps={state.totalSteps} onBack={() => {}} canGoBack={false} />
        <QuizSessionModal isOpen={showSessionModal} onContinue={handleContinueSession} onRestart={handleRestartSession} />
      </div>;
  }

  // Don't render quiz content until session is checked
  if (!sessionChecked) {
    return <div className="max-w-[580px] mx-auto px-4">
        <TopNavBar currentStep={state.currentStep} totalSteps={state.totalSteps} onBack={() => {}} canGoBack={false} />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-[#71b8bc] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Caricamento...</p>
          </div>
        </div>
      </div>;
  }

  // Render special pages based on current state
  if (state.showSpecialPage) {
    switch (state.showSpecialPage) {
      case 'trustMap':
        return <div className="max-w-[580px] mx-auto px-4">
            <TopNavBar currentStep={state.currentStep} totalSteps={state.totalSteps} onBack={handleBack} canGoBack={false} />
            <TrustMapAnimation onContinue={handleSpecialPageComplete} />
          </div>;
      case 'universities':
        return <div className="max-w-[580px] mx-auto px-4">
            <TopNavBar currentStep={state.currentStep} totalSteps={state.totalSteps} onBack={handleBack} canGoBack={false} />
            <UniversityLogos />
          </div>;
      case 'expert':
        return <div className="max-w-[580px] mx-auto px-4">
            <TopNavBar currentStep={state.currentStep} totalSteps={state.totalSteps} onBack={handleBack} canGoBack={false} />
            <ExpertReview />
          </div>;
      case 'worldCommunity':
        return <div className="max-w-[580px] mx-auto px-4">
            <TopNavBar currentStep={state.currentStep} totalSteps={state.totalSteps} onBack={handleBack} canGoBack={false} />
            <WorldCommunity onContinue={handleWorldCommunityComplete} />
          </div>;
      case 'wellbeingLevel':
        return <div className="max-w-[580px] mx-auto px-4">
            <TopNavBar currentStep={state.currentStep} totalSteps={state.totalSteps} onBack={handleBack} canGoBack={false} />
            <WellbeingLevelIndicator level="Medium" onContinue={handleWellbeingLevelComplete} gender={getSelectedGender()} />
          </div>;
      case 'loadingAnalysis':
        return <div className="max-w-[580px] mx-auto px-4 min-h-screen bg-[#fbfaf8]">
            <TopNavBar currentStep={state.currentStep} totalSteps={state.totalSteps} onBack={handleBack} canGoBack={false} />
            <LoadingAnalysis onComplete={handleLoadingAnalysisComplete} />
          </div>;
      case 'progressChart':
        return <div className="max-w-[580px] mx-auto px-4">
            <TopNavBar currentStep={state.currentStep} totalSteps={state.totalSteps} onBack={handleBack} canGoBack={false} />
            <ProgressChart onContinue={handleProgressChartComplete} />
          </div>;
      case 'emailCapture':
        return <div className="max-w-[580px] mx-auto px-4">
            <TopNavBar currentStep={state.currentStep} totalSteps={state.totalSteps} onBack={handleBack} canGoBack={false} />
            <EmailCapture onSubmit={handleEmailCapture} />
          </div>;
      case 'nameCapture':
        return <div className="max-w-[580px] mx-auto px-4">
            <TopNavBar currentStep={state.currentStep} totalSteps={state.totalSteps} onBack={handleBack} canGoBack={false} />
            <NameCapture onSubmit={handleNameCapture} />
          </div>;
      case 'sinusoidalGraph':
        return <div className="max-w-[580px] mx-auto px-4 bg-[#fbfaf8]">
            <TopNavBar currentStep={state.currentStep} totalSteps={state.totalSteps} onBack={handleBack} canGoBack={false} />
            <SinusoidalGraph onContinue={handleSinusoidalComplete} />
          </div>;
    }
  }

  // Render current quiz question
  const renderQuestionContent = () => {
    if (!state.currentQuestion) return null;
    switch (state.currentQuestion.type) {
      case 'single':
        return <SingleChoice options={state.currentQuestion.options || []} value={currentAnswer as string} onChange={handleAnswerChange} useImages={state.currentQuestion.id === 'gender'} questionId={state.currentQuestion.id} autoAdvance={true} question={state.currentQuestion.question} />;
      case 'multiple':
        return <MultipleChoice options={state.currentQuestion.options || []} value={currentAnswer as string[]} onChange={handleAnswerChange} maxSelections={state.currentQuestion.maxSelections} onNextClick={handleNext} />;
      case 'text':
        return <TextInput value={currentAnswer as string} onChange={handleAnswerChange} />;
      case 'scale':
        return <ScaleInput value={currentAnswer as number || 5} onChange={handleAnswerChange} />;
      case 'color':
        return <ColorSelection value={currentAnswer as string[]} onChange={handleAnswerChange} />;
      default:
        return <p>Tipo di domanda non supportato</p>;
    }
  };

  const handleSubmit = () => {
    if (!quizData.name || !quizData.email) {
      toast({
        title: "Informazioni mancanti",
        description: "Per favore inserisci nome e email per continuare",
        variant: "destructive",
      });
      return;
    }

    // Navigate to pricing with both name and email
    navigate(`/pricing-discounted?name=${encodeURIComponent(quizData.name)}&email=${encodeURIComponent(quizData.email)}`);
  };

  return <div className="max-w-[580px] mx-auto px-4">
      <TopNavBar currentStep={state.currentStep} totalSteps={state.totalSteps} onBack={handleBack} canGoBack={state.currentStep > 0} />
      <div className="quiz-container pt-24">
        <div className="">
          {/* Quiz di tre minuti header */}
          <div className="text-center mb-4">
            
          </div>
          
          {/* Question title - only show for non-gender questions */}
          {state.currentQuestion?.id !== 'gender' && <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 leading-tight">
              {state.currentQuestion?.question || 'Loading...'}
            </h2>}
          
          {/* Question content based on type */}
          {renderQuestionContent()}
          
          {/* Show next button only for non-single choice questions */}
          {state.currentQuestion && state.currentQuestion.type !== 'single' && state.currentQuestion.type !== 'multiple' && <div className="mt-8">
              <button onClick={handleNext} disabled={!isNextEnabled} className={`w-full py-3 rounded-lg flex items-center justify-center font-medium ${isNextEnabled ? 'bg-[#71b8bc] text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
                <span>Avanti</span>
              </button>
            </div>}
        </div>
      </div>
    </div>;
};

export default Quiz;
