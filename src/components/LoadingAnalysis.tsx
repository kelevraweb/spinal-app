import React, { useState, useEffect } from 'react';
interface LoadingAnalysisProps {
  onComplete: () => void;
}
const LoadingAnalysis: React.FC<LoadingAnalysisProps> = ({
  onComplete
}) => {
  // Simple state - no complex objects
  const [currentBarIndex, setCurrentBarIndex] = useState(0);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // Static data - not in state to avoid dependency issues
  const bars = [{
    name: 'Analisi posturale',
    question: 'Ti senti spesso bloccato/a nei movimenti?'
  }, {
    name: 'Analisi mobilità',
    question: 'Ti capita spesso di evitare alcuni movimenti per paura del dolore?'
  }, {
    name: 'Analisi benessere fisico',
    question: 'Ti senti spesso rigido/a quando ti svegli al mattino?'
  }];
  const testimonials = [{
    name: "Marco L.",
    text: "Dopo solo 3 settimane di percorso, il mio mal di schiena è diminuito notevolmente e la mia postura è migliorata."
  }, {
    name: "Sara T.",
    text: "Ho finalmente capito come prendermi cura della mia schiena. Ora mi sento più energica e con meno dolori."
  }, {
    name: "Giulia M.",
    text: "Gli esercizi giornalieri sono semplici ma efficaci. In poche settimane ho notato una grande differenza."
  }, {
    name: "Alessandro B.",
    text: "Il piano personalizzato ha risolto i miei problemi di cervicale che mi tormentavano da anni. Ottimo!"
  }];

  // Testimonial rotation
  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setTestimonialIndex(prev => (prev + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(testimonialInterval);
  }, []);

  // Main progress logic - single useEffect with simple dependencies
  useEffect(() => {
    // If all bars are complete, finish
    if (currentBarIndex >= bars.length) {
      setTimeout(onComplete, 1000);
      return;
    }

    // If showing question, don't progress
    if (showQuestion) {
      return;
    }
    const interval = setInterval(() => {
      setCurrentProgress(prevProgress => {
        const newProgress = prevProgress + 2;

        // If we reach 50% and haven't shown question yet
        if (newProgress >= 50 && newProgress < 52 && !showQuestion) {
          setShowQuestion(true);
          return 50; // Stop at 50%
        }

        // If we reach 100%, move to next bar
        if (newProgress >= 100) {
          setCurrentBarIndex(prev => prev + 1);
          setCurrentProgress(0);
          return 0;
        }
        return newProgress;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [currentBarIndex, showQuestion, onComplete]);
  const handleAnswer = (answer: boolean) => {
    console.log('Answer:', answer);
    setShowQuestion(false);
    // Progress will resume automatically
  };
  return <div className="max-w-2xl mx-auto my-12 px-4 pt-16 min-h-screen bg-[#fbfaf8]">
      <h2 className="text-2xl font-bold text-center mb-3 text-gray-800">
        Creazione del tuo
      </h2>
      <h2 className="text-2xl font-bold text-center text-[#71b8bc] mb-6">
        piano posturale personalizzato
      </h2>
      
      <div className="space-y-8 mt-10">
        {bars.map((bar, index) => {
        let progress = 0;
        if (index < currentBarIndex) {
          progress = 100; // Completed bars
        } else if (index === currentBarIndex) {
          progress = currentProgress; // Current bar
        }
        // Future bars stay at 0

        return <div key={index} className="relative">
              <div className="flex justify-between items-center mb-2">
                <div className="font-medium text-gray-800">{bar.name}</div>
                <div className="text-sm text-gray-600">{Math.round(progress)}%</div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-[#71b8bc] h-3 rounded-full transition-all duration-300 ease-out" style={{
              width: `${progress}%`
            }} />
              </div>
            </div>;
      })}
      </div>
      
      {/* Question popup */}
      {showQuestion && currentBarIndex < bars.length && <div className="fixed inset-x-0 top-1/2 transform -translate-y-1/2 mx-auto bg-white rounded-lg shadow-xl p-6 border border-gray-200 w-[85%] max-w-sm z-20 animate-fade-in">
          <h4 className="font-medium mb-3 text-gray-800">
            {bars[currentBarIndex].question}
          </h4>
          <div className="flex gap-4">
            <button onClick={() => handleAnswer(true)} className="flex-1 bg-[#71b8bc] text-white rounded-full px-4 py-2 text-sm">
              Sì
            </button>
            <button onClick={() => handleAnswer(false)} className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm">
              No
            </button>
          </div>
        </div>}
      
      {/* Testimonials */}
      <div className="mt-16 bg-white rounded-lg shadow-md p-6 border-l-4 border-[#71b8bc] animate-fade-in">
        <p className="italic mb-2 text-gray-700">"{testimonials[testimonialIndex].text}"</p>
        <p className="text-right font-semibold text-gray-800">— {testimonials[testimonialIndex].name}</p>
      </div>
    </div>;
};
export default LoadingAnalysis;