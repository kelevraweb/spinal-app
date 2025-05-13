
import React, { useEffect, useState } from 'react';
import { ProgressChartData } from '../types/quiz';

const months = ['Aprile', 'Maggio', 'Giugno'];

interface ProgressChartProps {
  initialData?: ProgressChartData[];
}

const ProgressChart: React.FC<ProgressChartProps> = ({ initialData }) => {
  const [chartData, setChartData] = useState<ProgressChartData[]>([
    { month: 'Aprile', value: 20, color: '#F7685B' },
    { month: 'Maggio', value: 40, color: '#FFB129' },
    { month: 'Giugno', value: 60, color: '#A5DC86', isGoal: true }
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
      
      <div className="flex justify-center h-72 mb-10">
        <div className="flex items-end justify-between w-full max-w-md">
          {chartData.map((data, index) => (
            <div key={index} className="relative flex flex-col items-center">
              <div 
                className="chart-bar w-20 rounded-t-md"
                style={{
                  backgroundColor: data.color,
                  height: animated ? `${data.value}%` : '10%',
                  opacity: animated ? 1 : 0.5,
                  transition: `height 1s ease-out ${index * 0.2}s, opacity 0.5s ease-out ${index * 0.2}s`
                }}
              >
                {data.isGoal && animated && (
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium animate-bounce-slow">
                    Obiettivo
                  </div>
                )}
              </div>
              <div className="mt-2 text-sm text-gray-600">{data.month}</div>
            </div>
          ))}
        </div>
      </div>
      
      <p className="text-xs text-center text-gray-400 mt-2">
        Il grafico è un'illustrazione non personalizzata e i risultati possono variare
      </p>
    </div>
  );
};

export default ProgressChart;
