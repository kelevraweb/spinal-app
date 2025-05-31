
export type QuizOption = {
  text: string;
  iconName?: string;
};

export type QuizQuestion = {
  id: string;
  question: string;
  type: 'single' | 'multiple' | 'text' | 'scale' | 'email' | 'color';
  options?: string[] | QuizOption[];
  required?: boolean;
  maxSelections?: number;
};

export type QuizAnswer = {
  questionId: string;
  answer: string | string[] | number;
};

export type UserProfile = {
  gender?: string;
  age?: string;
  answers: QuizAnswer[];
  email?: string;
  wellbeingScore?: number;
  completedAt?: Date;
};

export type QuizState = {
  currentStep: number;
  totalSteps: number;
  answers: QuizAnswer[];
  currentQuestion?: QuizQuestion;
  isSubmitting: boolean;
  isCompleted: boolean;
  userProfile: UserProfile;
  wellbeingScore?: number;
  showSpecialPage?: 'trustMap' | 'universities' | 'expert' | 'progressChart' | 'wellbeingLevel' | 'emailCapture' | 'sinusoidalGraph' | 'checkout' | 'worldMap' | 'loadingAnalysis' | 'nameCapture' | 'worldCommunity';
};

export type ProgressChartData = {
  month: string;
  value: number;
  color: string;
  isGoal?: boolean;
  label?: string;
};

export type Testimonial = {
  id: number;
  name: string;
  rating: number;
  text: string;
  date?: string;
};
