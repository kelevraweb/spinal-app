
import React, { useEffect, useState } from 'react';
import { ProgressChartData } from '../types/quiz';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

interface ProgressChartProps {
  initialData?: ProgressChartData[];
  onContinue?: () => void;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ initialData, onContinue }) => {
  const [chartData, setChartData] = useState<ProgressChartData[]>([
    { month: 'Aprile', value: 20, color: '#ff1aa9', label: 'Inizio' },
    { month: 'Maggio', value: 40, color: '#ff80c8', label: 'Progresso' },
    { month: 'Giugno', value: 60, color: '#19f1fe', isGoal: true, label: 'Obiettivo' }
  ]);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (initialData) {
      setChartData(initialData);
    }

    const timer = setTimeout(() => {
      setAnimated(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [initialData]);

  return (
    <div className="max-w-2xl mx-auto my-12 px-4 pt-16">
      <h2 className="text-2xl font-bold text-center mb-3">
        Un piano progettato per supportare il tuo benessere
      </h2>
      
      <p className="text-center mb-8 text-gray-600">
        In base alle tue risposte, prevediamo che migliorerai il tuo benessere entro
      </p>
      
      <h3 className="text-2xl font-bold text-center mb-8">Giugno 2025</h3>
      
      <div className="relative bg-white rounded-lg shadow-lg p-8 mb-10">
        <div className="flex justify-between mb-16">
          {chartData.map((data, index) => (
            <div key={index} className="flex flex-col items-center relative">
              <div className="w-24 h-64 bg-gray-100 rounded-t-lg relative overflow-hidden">
                <div 
                  className={`absolute bottom-0 w-full rounded-t-lg transition-all duration-1000 ease-out`}
                  style={{
                    backgroundColor: data.color,
                    height: animated ? `${data.value}%` : '0%',
                    transitionDelay: `${index * 0.3}s`
                  }}
                >
                  <div 
                    className="absolute top-0 left-0 w-full flex justify-center transform -translate-y-10"
                    style={{ opacity: animated ? 1 : 0, transition: `opacity 0.5s ease ${index * 0.3 + 0.5}s` }}
                  >
                    <span 
                      className="px-4 py-2 rounded-full text-white font-bold text-lg"
                      style={{ backgroundColor: data.color }}
                    >
                      {data.value}%
                    </span>
                  </div>
                </div>

                {data.isGoal && animated && (
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-[#19f1fe] text-white px-4 py-2 rounded-full text-sm font-semibold animate-bounce-slow">
                    Obiettivo
                  </div>
                )}
              </div>

              <div className="mt-4 flex flex-col items-center">
                <span className="font-bold text-lg">{data.month}</span>
                <span className="text-sm text-gray-600">{data.label}</span>
              </div>

              {index < chartData.length - 1 && (
                <div 
                  className={`absolute h-px bg-gray-300 top-32 transition-all duration-1000`}
                  style={{ 
                    width: '100%', 
                    left: '50%',
                    opacity: animated ? 1 : 0,
                    transitionDelay: `${index * 0.3 + 0.2}s`
                  }}
                ></div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10">
          <h4 className="font-semibold text-lg mb-2">Il tuo progresso previsto</h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Benessere attuale</span>
                <span>20%</span>
              </div>
              <Progress value={20} className="h-2 bg-gray-200" indicatorClassName="bg-[#ff1aa9]" />
            </div>
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Dopo 1 mese</span>
                <span>40%</span>
              </div>
              <Progress value={40} className="h-2 bg-gray-200" indicatorClassName="bg-[#ff80c8]" />
            </div>
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Obiettivo finale</span>
                <span>60%</span>
              </div>
              <Progress value={60} className="h-2 bg-gray-200" indicatorClassName="bg-[#19f1fe]" />
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Button 
            onClick={onContinue}
            size="lg" 
            className="bg-[#19f1fe] hover:bg-[#00d9e6] text-white"
          >
            Continua
          </Button>
        </div>
      </div>
      
      <p className="text-xs text-center text-gray-400 mt-2">
        Il grafico è un'illustrazione non personalizzata e i risultati possono variare
      </p>
    </div>
  );
};

export default ProgressChart;
