
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
      name: 'Analisi posturale', 
      progress: 0, 
      color: 'bg-[#71b8bc]', 
      question: 'Ti senti spesso bloccato/a nei movimenti?',
      answered: false
    },
    { 
      name: 'Analisi mobilità', 
      progress: 0, 
      color: 'bg-[#71b8bc]',
      question: 'Ti capita spesso di evitare alcuni movimenti per paura del dolore?',
      answered: false
    },
    { 
      name: 'Analisi benessere fisico', 
      progress: 0, 
      color: 'bg-[#71b8bc]',
      question: 'Ti senti spesso rigido/a quando ti svegli al mattino?',
      answered: false
    }
  ]);
  
  const [currentBarIndex, setCurrentBarIndex] = useState(0);
  const [activeBarIndex, setActiveBarIndex] = useState<number | null>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const testimonials = [
    {
      name: "Marco L.",
      text: "Dopo solo 3 settimane di percorso, il mio mal di schiena è diminuito notevolmente e la mia postura è migliorata."
    },
    {
      name: "Sara T.",
      text: "Ho finalmente capito come prendermi cura della mia schiena. Ora mi sento più energica e con meno dolori."
    },
    {
      name: "Giulia M.",
      text: "Gli esercizi giornalieri sono semplici ma efficaci. In poche settimane ho notato una grande differenza."
    },
    {
      name: "Alessandro B.",
      text: "Il piano personalizzato ha risolto i miei problemi di cervicale che mi tormentavano da anni. Ottimo!"
    }
  ];

  useEffect(() => {
    // Rotate testimonials
    const testimonialInterval = setInterval(() => {
      setTestimonialIndex(prev => (prev + 1) % testimonials.length);
    }, 3000);
    
    return () => clearInterval(testimonialInterval);
  }, []);

  // New useEffect to handle resuming progress after question is answered
  useEffect(() => {
    if (activeBarIndex === null && currentBarIndex < bars.length) {
      // Question was just answered, resume progress for current bar
      const currentBar = bars[currentBarIndex];
      if (currentBar && currentBar.answered && currentBar.progress < 100) {
        const interval = setInterval(() => {
          setBars(prevBars => {
            const newBars = [...prevBars];
            const bar = newBars[currentBarIndex];
            
            if (bar.progress < 100) {
              newBars[currentBarIndex] = {
                ...bar,
                progress: Math.min(bar.progress + 2, 100)
              };
            } else {
              // Bar complete, move to next
              clearInterval(interval);
              setCurrentBarIndex(prev => prev + 1);
            }
            
            return newBars;
          });
        }, 50);
        
        return () => clearInterval(interval);
      }
    }
  }, [activeBarIndex, currentBarIndex, bars]);

  useEffect(() => {
    // Skip if we've completed all bars
    if (currentBarIndex >= bars.length) {
      setTimeout(onComplete, 1000);
      return;
    }

    // Skip if there's an active question
    if (activeBarIndex !== null) {
      return;
    }

    const currentBar = bars[currentBarIndex];
    
    // If bar is already answered and at 100%, move to next
    if (currentBar.answered && currentBar.progress >= 100) {
      setCurrentBarIndex(prev => prev + 1);
      return;
    }

    const interval = setInterval(() => {
      setBars(prevBars => {
        const newBars = [...prevBars];
        const bar = newBars[currentBarIndex];
        
        // If we've reached 50% and haven't answered the question yet
        if (bar.progress >= 50 && !bar.answered) {
          setActiveBarIndex(currentBarIndex);
          clearInterval(interval);
          return newBars;
        }
        
        // Continue bar progress
        if (bar.progress < 100) {
          newBars[currentBarIndex] = {
            ...bar,
            progress: Math.min(bar.progress + 2, 100)
          };
        } else {
          // Bar is complete, move to next bar
          clearInterval(interval);
          setCurrentBarIndex(prev => prev + 1);
        }
        
        return newBars;
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, [currentBarIndex, bars, activeBarIndex, onComplete]);
  
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
  };

  return (
    <div className="max-w-2xl mx-auto my-12 px-4 pt-16 bg-white min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-3 text-gray-800">
        Creazione del tuo
      </h2>
      <h2 className="text-2xl font-bold text-center text-[#71b8bc] mb-6">
        piano posturale personalizzato
      </h2>
      
      <div className="space-y-8 mt-10">
        {bars.map((bar, index) => (
          <div key={index} className="relative">
            <div className="flex justify-between items-center mb-2">
              <div className="font-medium text-gray-800">{bar.name}</div>
              <div className="text-sm text-gray-600">{Math.round(bar.progress)}%</div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-[#71b8bc] h-3 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${bar.progress}%` }}
              />
            </div>
            
            {/* Question popup when bar reaches 50% - now centered */}
            {activeBarIndex === index && (
              <div className="fixed inset-x-0 top-1/2 transform -translate-y-1/2 mx-auto bg-white rounded-lg shadow-xl p-6 border border-gray-200 w-[85%] max-w-sm z-20 animate-fade-in">
                <h4 className="font-medium mb-3 text-gray-800">{bar.question}</h4>
                <div className="flex gap-4">
                  <button 
                    onClick={() => handleAnswer(index, true)}
                    className="flex-1 bg-[#71b8bc] text-white rounded-full px-4 py-2 text-sm"
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
      <div className="mt-16 bg-white rounded-lg shadow-md p-6 border-l-4 border-[#71b8bc] animate-fade-in">
        <p className="italic mb-2 text-gray-700">"{testimonials[testimonialIndex].text}"</p>
        <p className="text-right font-semibold text-gray-800">— {testimonials[testimonialIndex].name}</p>
      </div>
    </div>
  );
};

export default LoadingAnalysis;
