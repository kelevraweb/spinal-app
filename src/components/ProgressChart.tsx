
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
    <div className="max-w-2xl mx-auto my-12 px-4">
      <h2 className="text-2xl font-bold text-center mb-3">
        A plan designed to support your wellbeing journey
      </h2>
      
      <p className="text-center mb-8 text-gray-600">
        Based on your answers, we expect you to improve your well-being by
      </p>
      
      <h3 className="text-2xl font-bold text-center mb-8">June 2025</h3>
      
      <div className="progress-chart">
        {chartData.map((data, index) => (
          <div
            key={index}
            className="chart-bar"
            style={{
              backgroundColor: data.color,
              height: animated ? `${data.value}%` : '10%',
              opacity: animated ? 1 : 0.5,
              transition: `height 1s ease-out ${index * 0.2}s, opacity 0.5s ease-out ${index * 0.2}s`
            }}
          >
            {data.isGoal && animated && (
              <div className="chart-goal animate-bounce-slow">Goal</div>
            )}
          </div>
        ))}
      </div>
      
      <div className="flex justify-between px-4 text-sm text-gray-500">
        <div>Aprile</div>
        <div>Giugno</div>
      </div>
      
      <p className="text-xs text-center text-gray-400 mt-2">
        The chart is a non-customized illustration and results may vary
      </p>
    </div>
  );
};

export default ProgressChart;
