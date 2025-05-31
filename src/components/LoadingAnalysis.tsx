
import React, { useState, useEffect } from 'react';

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
      color: '#71b8bc', 
      question: 'Ti senti spesso bloccato/a nei movimenti?',
      answered: false
    },
    { 
      name: 'Analisi mobilità', 
      progress: 0, 
      color: '#88c2aa',
      question: 'Ti capita spesso di evitare alcuni movimenti per paura del dolore?',
      answered: false
    },
    { 
      name: 'Analisi benessere fisico', 
      progress: 0, 
      color: '#a3d977',
      question: 'Ti senti spesso rigido/a quando ti svegli al mattino?',
      answered: false
    }
  ]);
  
  const [currentBarIndex, setCurrentBarIndex] = useState(0);
  const [activeBarIndex, setActiveBarIndex] = useState<number | null>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [animationPaused, setAnimationPaused] = useState(false);

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
    const testimonialInterval = setInterval(() => {
      setTestimonialIndex(prev => (prev + 1) % testimonials.length);
    }, 3000);
    
    return () => clearInterval(testimonialInterval);
  }, []);

  useEffect(() => {
    if (animationPaused) return;

    const interval = setInterval(() => {
      setBars(prevBars => {
        const newBars = [...prevBars];
        
        if (newBars[currentBarIndex].progress >= 50 && !newBars[currentBarIndex].answered && !animationPaused) {
          setAnimationPaused(true);
          setActiveBarIndex(currentBarIndex);
          clearInterval(interval);
          return newBars;
        }
        
        if (newBars[currentBarIndex].progress < 100) {
          newBars[currentBarIndex] = {
            ...newBars[currentBarIndex],
            progress: Math.min(newBars[currentBarIndex].progress + 3, 100)
          };
        } else {
          clearInterval(interval);
          if (currentBarIndex < bars.length - 1) {
            setCurrentBarIndex(prev => prev + 1);
          } else {
            setTimeout(onComplete, 1000);
          }
        }
        
        return newBars;
      });
    }, 80);
    
    return () => clearInterval(interval);
  }, [currentBarIndex, animationPaused, onComplete, bars.length]);
  
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
      <h2 className="text-2xl font-bold text-center mb-3 text-white">
        Creazione del tuo
      </h2>
      <h2 className="text-2xl font-bold text-center text-[#71b8bc] mb-6">
        piano posturale personalizzato
      </h2>
      
      <div className="space-y-8 mt-10">
        {bars.map((bar, index) => (
          <div key={index} className="relative">
            <div className="flex justify-between items-center mb-3">
              <div className="font-semibold text-white text-lg">{bar.name}</div>
              <div className="text-lg font-bold text-[#71b8bc]">{Math.round(bar.progress)}%</div>
            </div>
            
            <div className="w-full bg-gray-700 rounded-full h-4 shadow-inner">
              <div 
                className="h-4 rounded-full transition-all duration-500 ease-out shadow-sm"
                style={{ 
                  width: `${bar.progress}%`,
                  backgroundColor: bar.color,
                  boxShadow: `0 0 10px ${bar.color}40`
                }}
              />
            </div>
            
            {activeBarIndex === index && (
              <div className="fixed inset-x-0 top-1/2 transform -translate-y-1/2 mx-auto bg-white rounded-xl shadow-2xl p-6 border border-gray-200 w-[85%] max-w-sm z-20 animate-fade-in">
                <h4 className="font-semibold mb-4 text-gray-800">{bar.question}</h4>
                <div className="flex gap-4">
                  <button 
                    onClick={() => handleAnswer(index, true)}
                    className="flex-1 bg-[#71b8bc] hover:bg-[#5da0a4] text-white rounded-full px-4 py-3 text-sm font-medium transition-colors"
                  >
                    Sì
                  </button>
                  <button 
                    onClick={() => handleAnswer(index, false)}
                    className="flex-1 border-2 border-gray-300 hover:border-gray-400 rounded-full px-4 py-3 text-sm font-medium transition-colors"
                  >
                    No
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-16 bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#71b8bc] animate-fade-in">
        <p className="italic mb-3 text-gray-700">"{testimonials[testimonialIndex].text}"</p>
        <p className="text-right font-semibold text-[#71b8bc]">— {testimonials[testimonialIndex].name}</p>
      </div>
    </div>
  );
};

export default LoadingAnalysis;
