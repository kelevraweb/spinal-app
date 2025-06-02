
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const NewIndex = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentScreen, setCurrentScreen] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  const phoneScreens = [
    {
      title: "Posture Analysis",
      content: (
        <div className="p-4 text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-2 flex items-center justify-center">
            <span className="text-white text-2xl">📊</span>
          </div>
          <h3 className="font-bold text-sm mb-1">Analisi Postura</h3>
          <p className="text-xs text-gray-600">Valutazione completa della tua postura</p>
          <div className="mt-2 bg-gray-200 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full w-3/4"></div>
          </div>
        </div>
      )
    },
    {
      title: "Daily Exercises",
      content: (
        <div className="p-4 text-center">
          <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-2 flex items-center justify-center">
            <span className="text-white text-2xl">🏃</span>
          </div>
          <h3 className="font-bold text-sm mb-1">Esercizi Giornalieri</h3>
          <p className="text-xs text-gray-600">15 min di esercizi personalizzati</p>
          <div className="flex justify-center mt-2 space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
            <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
          </div>
        </div>
      )
    },
    {
      title: "Progress Tracking",
      content: (
        <div className="p-4 text-center">
          <div className="w-16 h-16 bg-purple-500 rounded-full mx-auto mb-2 flex items-center justify-center">
            <span className="text-white text-2xl">📈</span>
          </div>
          <h3 className="font-bold text-sm mb-1">Progressi</h3>
          <p className="text-xs text-gray-600">Dolore ridotto del 75%</p>
          <div className="mt-2 flex justify-between text-xs">
            <span>Inizio</span>
            <span>Oggi</span>
          </div>
        </div>
      )
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
      }
    };

    const hero = heroRef.current;
    if (hero) {
      hero.addEventListener('mousemove', handleMouseMove);
      return () => hero.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScreen((prev) => (prev + 1) % phoneScreens.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const phoneTransform = {
    transform: `perspective(1000px) rotateY(${(mousePosition.x - 0.5) * 20}deg) rotateX(${(mousePosition.y - 0.5) * -10}deg)`,
    transition: 'transform 0.1s ease-out'
  };

  const startQuiz = () => {
    navigate('/quiz');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900">
                  Ciao, Sono{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    Spinal
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Il tuo compagno digitale per scoprire e migliorare la tua postura. 
                  Trasforma la tua salute spinale con esercizi personalizzati e 
                  monitoraggio intelligente.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={startQuiz}
                  className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Inizia il Test Posturale
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full font-semibold text-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-300">
                  Scarica l'App
                </button>
              </div>

              <div className="flex items-center space-x-8 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">1M+</div>
                  <div className="text-sm text-gray-600">Utenti attivi</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">4.8★</div>
                  <div className="text-sm text-gray-600">Rating App</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">90%</div>
                  <div className="text-sm text-gray-600">Miglioramento</div>
                </div>
              </div>
            </div>

            {/* Right Phone */}
            <div className="flex justify-center lg:justify-end">
              <div 
                className="relative"
                style={phoneTransform}
              >
                {/* Phone Frame */}
                <div className="w-64 h-[520px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] p-2 shadow-2xl">
                  {/* Screen */}
                  <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                    {/* Status Bar */}
                    <div className="bg-gray-50 h-8 flex items-center justify-between px-6 text-xs">
                      <span className="font-semibold">9:41</span>
                      <div className="flex space-x-1">
                        <div className="w-4 h-2 bg-green-500 rounded-sm"></div>
                        <div className="w-6 h-2 bg-green-500 rounded-sm"></div>
                      </div>
                    </div>
                    
                    {/* Dynamic Content */}
                    <div className="h-full pt-4">
                      {phoneScreens[currentScreen].content}
                    </div>
                  </div>
                  
                  {/* Home Indicator */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-600 rounded-full"></div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl animate-bounce-slow">
                  💪
                </div>
                <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white animate-pulse">
                  ✅
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Real Support for Real Spine
            </h2>
            <p className="text-xl text-gray-600">
              Risultati comprovati da migliaia di utenti
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <div className="text-4xl font-bold text-blue-600 mb-2">1M</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Persone hanno migliorato</div>
              <div className="text-gray-600">la loro postura con Spinal</div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <div className="text-4xl font-bold text-green-600 mb-2">~30K</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Esercizi completati</div>
              <div className="text-gray-600">ogni giorno dai nostri utenti</div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <div className="text-4xl font-bold text-purple-600 mb-2">90%</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Riduzione del dolore</div>
              <div className="text-gray-600">entro le prime 4 settimane</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Hear from Spinal Users
            </h2>
            <p className="text-xl text-gray-600">
              Storie reali di trasformazione
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  M
                </div>
                <div className="ml-3">
                  <div className="font-semibold">Marco R.</div>
                  <div className="text-sm text-gray-600">Developer</div>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Dopo anni di mal di schiena da ufficio, Spinal mi ha aiutato a recuperare una postura corretta. Il dolore è sparito in 3 settimane!"
              </p>
              <div className="flex mt-4">
                {[1,2,3,4,5].map(star => (
                  <span key={star} className="text-yellow-400">★</span>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  L
                </div>
                <div className="ml-3">
                  <div className="font-semibold">Laura B.</div>
                  <div className="text-sm text-gray-600">Studentessa</div>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Gli esercizi sono semplici ma efficaci. La mia postura è migliorata incredibilmente e mi sento più sicura di me stessa."
              </p>
              <div className="flex mt-4">
                {[1,2,3,4,5].map(star => (
                  <span key={star} className="text-yellow-400">★</span>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  G
                </div>
                <div className="ml-3">
                  <div className="font-semibold">Giovanni T.</div>
                  <div className="text-sm text-gray-600">Manager</div>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "L'app mi ricorda di fare gli esercizi e monitora i miei progressi. È come avere un fisioterapista personale sempre con me."
              </p>
              <div className="flex mt-4">
                {[1,2,3,4,5].map(star => (
                  <span key={star} className="text-yellow-400">★</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Spinal App è un sistema di strumenti
            </h2>
            <p className="text-xl text-gray-600">
              Tutto quello che ti serve per una schiena sana
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Valutazione Postura</h3>
              <p className="text-gray-600">Analisi completa della tua postura attuale</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏃</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Esercizi Personalizzati</h3>
              <p className="text-gray-600">Routine create su misura per te</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Tracking Dolore</h3>
              <p className="text-gray-600">Monitora i tuoi sintomi e progressi</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Educazione</h3>
              <p className="text-gray-600">Impara le basi della salute spinale</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⏰</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Promemoria</h3>
              <p className="text-gray-600">Non dimenticare mai i tuoi esercizi</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Obiettivi</h3>
              <p className="text-gray-600">Raggiungi i tuoi traguardi di salute</p>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Per chi è Spinal?
            </h2>
            <p className="text-xl opacity-90">
              La soluzione per tutti i tipi di problemi posturali
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">💼</div>
              <h3 className="font-semibold mb-2">Lavoratori da Ufficio</h3>
              <p className="text-sm opacity-80">Combatti la postura da scrivania</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-3">🎓</div>
              <h3 className="font-semibold mb-2">Studenti</h3>
              <p className="text-sm opacity-80">Mantieni una buona postura durante lo studio</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-3">🏃‍♂️</div>
              <h3 className="font-semibold mb-2">Atleti</h3>
              <p className="text-sm opacity-80">Ottimizza le performance e previeni infortuni</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-3">👴</div>
              <h3 className="font-semibold mb-2">Adulti 50+</h3>
              <p className="text-sm opacity-80">Mantieni la mobilità e riduci il dolore</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quiz CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-3xl p-12">
            <div className="text-6xl mb-6">🧪</div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Fai il Test
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Scopri il tuo livello di salute posturale in 5 minuti
            </p>
            <button
              onClick={startQuiz}
              className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-10 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Inizia il Test Gratuito
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Domande Frequenti
            </h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Quanto tempo ci vuole per vedere risultati?</h3>
              <p className="text-gray-600">La maggior parte degli utenti nota miglioramenti nella postura entro 2-3 settimane di uso costante.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Gli esercizi sono adatti a tutti?</h3>
              <p className="text-gray-600">Sì, i nostri esercizi sono progettati per essere sicuri e adattabili a tutti i livelli di fitness.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Quanto tempo devo dedicare agli esercizi?</h3>
              <p className="text-gray-600">Bastano 10-15 minuti al giorno per ottenere risultati significativi.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4">Spinal</div>
              <p className="text-gray-400 mb-4">
                La tua salute spinale è la nostra priorità
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  f
                </div>
                <div className="w-10 h-10 bg-blue-400 rounded-lg flex items-center justify-center">
                  t
                </div>
                <div className="w-10 h-10 bg-pink-600 rounded-lg flex items-center justify-center">
                  i
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Prodotto</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Caratteristiche</li>
                <li>Prezzi</li>
                <li>Test Gratuito</li>
                <li>App Mobile</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Supporto</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Centro Aiuto</li>
                <li>Contatti</li>
                <li>Community</li>
                <li>Blog</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Scarica l'App</h3>
              <div className="space-y-3">
                <div className="bg-gray-800 rounded-lg p-3 flex items-center">
                  <span className="text-sm">📱 App Store</span>
                </div>
                <div className="bg-gray-800 rounded-lg p-3 flex items-center">
                  <span className="text-sm">🤖 Google Play</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Spinal. Tutti i diritti riservati.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NewIndex;
