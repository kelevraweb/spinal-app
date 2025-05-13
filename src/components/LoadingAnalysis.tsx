
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
      name: 'Analisi autostima', 
      progress: 0, 
      color: 'bg-green-500',
      question: 'Ti capita spesso di procrastinare?',
      answered: false
    },
    { 
      name: 'Analisi benessere emotivo', 
      progress: 0, 
      color: 'bg-purple-500',
      question: 'Ti senti sopraffatto/a dalle emozioni?',
      answered: false
    }
  ]);
  
  const [activeBarIndex, setActiveBarIndex] = useState<number | null>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [animationPaused, setAnimationPaused] = useState(false);

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
    let activeIntervals: NodeJS.Timeout[] = [];
    
    // Process bars sequentially
    const processBar = (index: number) => {
      if (index >= bars.length) {
        // All bars are complete
        setTimeout(onComplete, 1000);
        return;
      }
      
      const interval = setInterval(() => {
        setBars(prevBars => {
          const newBars = [...prevBars];
          
          // If we've reached 50% and haven't answered the question yet
          if (newBars[index].progress >= 50 && !newBars[index].answered && !animationPaused) {
            setAnimationPaused(true);
            setActiveBarIndex(index);
            clearInterval(interval);
            
            return newBars;
          }
          
          // Continue bar progress if not paused
          if (!animationPaused) {
            if (newBars[index].progress < 100) {
              newBars[index] = {
                ...newBars[index],
                progress: Math.min(newBars[index].progress + 1, 100)
              };
            } else {
              // Bar is complete, move to next bar
              clearInterval(interval);
              if (index < bars.length - 1) {
                processBar(index + 1);
              } else {
                setTimeout(onComplete, 1000);
              }
            }
          }
          
          return newBars;
        });
      }, 50);
      
      activeIntervals.push(interval);
    };
    
    // Start with the first bar
    processBar(0);
    
    return () => {
      activeIntervals.forEach(interval => clearInterval(interval));
    };
  }, [bars.length, animationPaused, onComplete]);
  
  const handleAnswer = (index: number, answer: boolean) => {
    setBars(prevBars => {
      const newBars = [...prevBars];
      newBars[index] = {
        ...newBars[index],
        answered: true
      };
      return newBars;
    });
    
    setActiveBarIndex(null);
    setAnimationPaused(false);
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
            
            {/* Question popup when bar reaches 50% - now centered */}
            {activeBarIndex === index && (
              <div className="fixed inset-x-0 top-1/2 transform -translate-y-1/2 mx-auto bg-white rounded-lg shadow-xl p-6 border border-gray-200 w-[85%] max-w-sm z-20 animate-fade-in">
                <h4 className="font-medium mb-3">{bar.question}</h4>
                <div className="flex gap-4">
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
