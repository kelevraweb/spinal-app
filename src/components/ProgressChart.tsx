
import React, { useEffect, useState } from 'react';
import { ProgressChartData } from '../types/quiz';
import { Button } from './ui/button';

interface ProgressChartProps {
  initialData?: ProgressChartData[];
  onContinue?: () => void;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ initialData, onContinue }) => {
  const [chartData, setChartData] = useState<ProgressChartData[]>([]);
  const [animated, setAnimated] = useState(false);

  const getCurrentMonthData = () => {
    const currentDate = new Date();
    const monthNames = [
      'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
      'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
    ];

    const data = [];
    for (let i = 0; i < 3; i++) {
      const futureDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 1);
      const monthName = monthNames[futureDate.getMonth()];
      const year = futureDate.getFullYear();
      
      data.push({
        month: `${monthName} ${year}`,
        value: i === 0 ? 20 : i === 1 ? 40 : 60,
        color: i === 1 ? '#88c2aa' : '#71b8bc',
        label: i === 0 ? 'Inizio' : i === 1 ? 'Progresso' : 'Obiettivo',
        isGoal: i === 2
      });
    }
    
    return data;
  };

  useEffect(() => {
    const data = initialData || getCurrentMonthData();
    setChartData(data);

    const timer = setTimeout(() => {
      setAnimated(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [initialData]);

  return (
    <div className="pt-24 pb-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          Un piano progettato per migliorare la tua postura
        </h2>
        
        <p className="text-gray-600 mb-4">
          In base alle tue risposte, prevediamo miglioramenti entro
        </p>
        
        <h3 className="text-lg font-bold text-[#71b8bc]">{chartData[2]?.month || 'Prossimi mesi'}</h3>
      </div>
      
      {/* Vertical column chart for mobile */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-end justify-between h-48 mb-4">
          {chartData.map((data, index) => (
            <div key={index} className="flex flex-col items-center flex-1 mx-2">
              <div className="relative w-full flex flex-col items-center">
                {data.isGoal && animated && (
                  <div className="mb-2 bg-[#71b8bc] text-white px-2 py-1 rounded text-xs font-medium animate-bounce-slow">
                    Obiettivo
                  </div>
                )}
                
                <div className="relative w-12 bg-gray-200 rounded-t-lg flex flex-col justify-end overflow-hidden">
                  <div 
                    className="w-full rounded-t-lg transition-all duration-1000 ease-out"
                    style={{
                      backgroundColor: data.color,
                      height: animated ? `${(data.value / 60) * 160}px` : '0px',
                      transitionDelay: `${index * 0.3}s`
                    }}
                  />
                </div>
                
                <div className="mt-2 text-center">
                  <div className="text-sm font-bold text-gray-900 mb-1">{data.value}%</div>
                  <div className="text-xs font-medium text-gray-700">{data.label}</div>
                  <div className="text-xs text-gray-500 mt-1">{data.month}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-center">
        <Button 
          onClick={onContinue}
          className="w-full bg-[#71b8bc] hover:bg-[#5da0a4] text-white py-3 rounded-lg"
        >
          Continua
        </Button>
      </div>
      
      <p className="text-xs text-center text-gray-400 mt-3">
        Il grafico è un'illustrazione e i risultati possono variare
      </p>
    </div>
  );
};

export default ProgressChart;
