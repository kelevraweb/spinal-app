
import React, { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';

interface LoadingAnalysisProps {
  onComplete: () => void;
}

interface BarData {
  name: string;
  progress: number;
  color: string;
  question?: string;
  answered?: boolean;
}

const LoadingAnalysis: React.FC<LoadingAnalysisProps> = ({ onComplete }) => {
  const [bars, setBars] = useState<BarData[]>([
    { 
      name: 'Analisi energia', 
      progress: 0, 
      color: 'bg-blue-500', 
      question: 'Ti senti spesso svuotato/a a fine giornata?',
      answered: false
    },
    { 
      name: 'Autostima', 
      progress: 0, 
      color: 'bg-green-500',
      question: 'Ti capita spesso di procrastinare?',
      answered: false
    },
    { 
      name: 'Benessere emotivo', 
      progress: 0, 
      color: 'bg-purple-500',
      question: 'Ti senti sopraffatto/a dalle emozioni?',
      answered: false
    }
  ]);
  
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number | null>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const testimonials = [
    {
      name: "Sara T.",
      text: "Dopo solo 3 settimane di percorso, mi sento molto più consapevole dei miei schemi relazionali."
    },
    {
      name: "Marco L.",
      text: "Ho imparato a mettere confini sani senza sentirmi in colpa. La mia relazione è migliorata tantissimo."
    },
    {
      name: "Giulia M.",
      text: "Finalmente ho smesso di cercare l'approvazione degli altri e ho iniziato a dare valore a me stessa."
    },
    {
      name: "Alessandro B.",
      text: "Il piano personalizzato mi ha aiutato a gestire l'ansia che bloccava le mie relazioni. Ottimo!"
    }
  ];

  useEffect(() => {
    // Rotate testimonials
    const testimonialInterval = setInterval(() => {
      setTestimonialIndex(prev => (prev + 1) % testimonials.length);
    }, 3000);
    
    return () => clearInterval(testimonialInterval);
  }, []);

  useEffect(() => {
    // Simulate progress bars advancement
    const intervals = bars.map((bar, index) => {
      return setInterval(() => {
        setBars(prevBars => {
          // Stop at 50% if not answered yet
          if (prevBars[index].progress >= 50 && !prevBars[index].answered) {
            clearInterval(intervals[index]);
            setActiveQuestionIndex(index);
            return prevBars;
          }
          
          const newBars = [...prevBars];
          if (newBars[index].progress < 100) {
            newBars[index] = {
              ...newBars[index],
              progress: Math.min(newBars[index].progress + 1, 100)
            };
          } else {
            clearInterval(intervals[index]);
          }
          
          return newBars;
        });
      }, 50);
    });
    
    // Check if all bars are completed
    const completionCheck = setInterval(() => {
      const allComplete = bars.every(bar => bar.progress >= 100);
      if (allComplete) {
        clearInterval(completionCheck);
        setTimeout(onComplete, 1000);
      }
    }, 200);
    
    return () => {
      intervals.forEach(interval => clearInterval(interval));
      clearInterval(completionCheck);
    };
  }, [bars, onComplete]);
  
  const handleAnswer = (index: number, answer: boolean) => {
    setBars(prevBars => {
      const newBars = [...prevBars];
      newBars[index] = {
        ...newBars[index],
        answered: true
      };
      return newBars;
    });
    
    setActiveQuestionIndex(null);
  };

  return (
    <div className="max-w-2xl mx-auto my-12 px-4 pt-16">
      <h2 className="text-2xl font-bold text-center mb-3">
        Creazione del tuo
      </h2>
      <h2 className="text-2xl font-bold text-center text-brand-primary mb-6">
        piano di benessere personalizzato
      </h2>
      
      <div className="space-y-8 mt-10">
        {bars.map((bar, index) => (
          <div key={index} className="relative">
            <div className="flex justify-between items-center mb-2">
              <div className="font-medium">{bar.name}</div>
              <div className="text-sm text-gray-500">{bar.progress}%</div>
            </div>
            
            <Progress
              value={bar.progress}
              className="h-3"
            />
            
            {/* Question popup when bar reaches 50% */}
            {activeQuestionIndex === index && (
              <div className="absolute right-0 top-10 bg-white rounded-lg shadow-lg p-4 border border-gray-200 w-full sm:w-80 z-10 animate-fade-in">
                <h4 className="font-medium mb-3">{bar.question}</h4>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleAnswer(index, true)}
                    className="flex-1 bg-brand-primary text-white rounded-full px-4 py-2 text-sm"
                  >
                    Sì
                  </button>
                  <button 
                    onClick={() => handleAnswer(index, false)}
                    className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm"
                  >
                    No
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Testimonials */}
      <div className="mt-16 bg-white rounded-lg shadow-md p-6 border-l-4 border-brand-accent animate-fade-in">
        <p className="italic mb-2">"{testimonials[testimonialIndex].text}"</p>
        <p className="text-right font-semibold">— {testimonials[testimonialIndex].name}</p>
      </div>
    </div>
  );
};

export default LoadingAnalysis;
