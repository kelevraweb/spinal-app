
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { Button } from './ui/button';

interface SinusoidalGraphProps {
  onContinue?: () => void;
}

const SinusoidalGraph: React.FC<SinusoidalGraphProps> = ({ onContinue }) => {
  const [animationStep, setAnimationStep] = useState(0);
  const [chartOptions, setChartOptions] = useState<ApexOptions>({});
  const [chartSeries, setChartSeries] = useState<any[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationStep(1);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (animationStep === 1) {
      const timer = setTimeout(() => {
        setAnimationStep(2);
      }, 1500);
      return () => clearTimeout(timer);
    }
    
    if (animationStep === 2) {
      const timer = setTimeout(() => {
        setAnimationStep(3);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [animationStep]);

  useEffect(() => {
    const options: ApexOptions = {
      chart: {
        type: 'area',
        height: 350,
        toolbar: {
          show: false
        },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 2500,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        }
      },
      colors: ['#71b8bc'],
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.4,
          opacityTo: 0.1,
          stops: [0, 100]
        }
      },
      stroke: {
        curve: 'smooth',
        width: 4
      },
      grid: {
        borderColor: '#f0f0f0',
        strokeDashArray: 3
      },
      xaxis: {
        categories: ['Oggi', 'Settimana 1', 'Settimana 2', 'Settimana 3', 'Settimana 4'],
        labels: {
          style: {
            colors: '#666',
            fontSize: '12px',
            fontWeight: 500
          }
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        min: 0,
        max: 100,
        labels: {
          formatter: (value) => `${value}%`,
          style: {
            colors: '#666',
            fontSize: '12px'
          }
        }
      },
      dataLabels: {
        enabled: true,
        background: {
          enabled: true,
          foreColor: '#fff',
          borderRadius: 8,
          borderWidth: 0,
          dropShadow: {
            enabled: true,
            top: 1,
            left: 1,
            blur: 1,
            color: '#000',
            opacity: 0.45
          }
        },
        style: {
          fontSize: '12px',
          fontWeight: 'bold',
          colors: ['#71b8bc']
        },
        formatter: (value) => `${value}%`
      },
      markers: {
        size: 8,
        colors: ['#fff'],
        strokeColors: '#71b8bc',
        strokeWidth: 3,
        hover: {
          size: 10
        }
      },
      tooltip: {
        enabled: true,
        y: {
          formatter: (value) => `${value}% benessere`
        },
        marker: {
          show: true
        }
      }
    };

    const series = [{
      name: 'Livello di Benessere',
      data: [20, 40, 65, 80, 95]
    }];

    setChartOptions(options);
    setChartSeries(series);
  }, []);

  return (
    <div className="pt-24 pb-8 min-h-screen flex flex-col justify-between bg-gradient-to-br from-gray-50 to-white">
      <div className={`transition-opacity duration-500 ${animationStep > 0 ? 'opacity-100' : 'opacity-0'}`}>
        {/* Main Title */}
        <div className="text-center mb-12 px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 leading-tight">
            Il tuo piano personale per il 
            <span className="text-[#71b8bc]"> Benessere è pronto!</span>
          </h1>
        </div>
        
        {/* Chart Container */}
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 mb-8 mx-4 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
              I tuoi progressi nelle prossime settimane
            </h2>
            <p className="text-gray-600">Ecco come migliorerà il tuo benessere seguendo il piano</p>
          </div>
          
          {/* ApexCharts Chart */}
          <div className={`transition-opacity duration-1000 ${animationStep >= 2 ? 'opacity-100' : 'opacity-0'}`}>
            <ReactApexChart
              options={chartOptions}
              series={chartSeries}
              type="area"
              height={350}
            />
          </div>

          {/* Chart Legend */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500 mb-2">Progresso del miglioramento del benessere</p>
            <div className="flex items-center justify-center space-x-6 text-xs text-gray-600">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gradient-to-r from-red-400 to-orange-400 rounded-full mr-2"></div>
                <span>Fase iniziale</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#71b8bc] rounded-full mr-2"></div>
                <span>Fase di ottimizzazione</span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Benefits Section */}
        <div 
          className={`px-4 mb-8 transition-all duration-700 ${
            animationStep >= 3 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
          }`}
        >
          <div className="bg-gradient-to-r from-[#71b8bc]/10 to-[#88c2aa]/10 rounded-3xl p-6 md:p-8 max-w-4xl mx-auto">
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 text-center">
              Cosa otterrai con il tuo piano personalizzato:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Riduzione significativa del mal di schiena",
                "Miglioramento della postura quotidiana",
                "Maggiore mobilità e flessibilità", 
                "Aumento dei livelli di energia",
                "Migliore qualità del sonno",
                "Benessere generale migliorato"
              ].map((benefit, index) => (
                <div key={index} className="flex items-start bg-white rounded-xl p-4 shadow-sm">
                  <div className="w-2 h-2 bg-[#71b8bc] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Fixed bottom button */}
      <div 
        className={`px-4 transition-opacity duration-500 ${
          animationStep >= 3 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="text-center mb-6 max-w-md mx-auto">
          <Button 
            onClick={onContinue} 
            size="lg"
            className="w-full bg-gradient-to-r from-[#71b8bc] to-[#88c2aa] hover:from-[#5da0a4] hover:to-[#72a089] text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Inizia il tuo percorso di benessere
          </Button>
        </div>
        
        <p className="text-sm text-gray-600 text-center px-4 max-w-lg mx-auto">
          Il tuo piano personalizzato ti aspetta. Inizia oggi il tuo viaggio verso una salute migliore!
        </p>
      </div>
    </div>
  );
};

export default SinusoidalGraph;
