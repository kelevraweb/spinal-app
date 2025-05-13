
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  const startQuiz = () => {
    navigate('/quiz');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-brand-light to-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Scopri il tuo <span className="text-brand-primary">Piano Personalizzato</span> per il Benessere Emotivo
            </h1>
            
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-10">
              Basato su decenni di ricerca scientifica e sviluppato da esperti, il nostro quiz ti aiuta a comprendere le tue relazioni e a migliorare il tuo benessere emotivo.
            </p>
            
            <button
              onClick={startQuiz}
              className="btn-primary text-lg px-8 py-4"
            >
              Inizia il Quiz Gratuito
            </button>
            
            <div className="mt-6 text-gray-500">
              Richiede solo 5 minuti • Risultati personalizzati
            </div>
          </div>
        </div>
      </div>
      
      {/* Features */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Come funziona
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-brand-muted rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-brand-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Completa il Quiz</h3>
              <p className="text-gray-600">
                Rispondi a domande sviluppate da esperti per identificare i tuoi schemi relazionali ed emotivi.
              </p>
            </div>
            
            <div className="bg-brand-muted rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-brand-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Ricevi il Tuo Piano</h3>
              <p className="text-gray-600">
                Ottieni un piano personalizzato basato sulle tue risposte, con strategie pratiche e consigli specifici.
              </p>
            </div>
            
            <div className="bg-brand-muted rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-brand-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <line x1="10" y1="9" x2="8" y2="9"></line>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Trasforma la Tua Vita</h3>
              <p className="text-gray-600">
                Segui il piano passo dopo passo per migliorare le tue relazioni e il tuo benessere emotivo.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Trust Indicators */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-6">
            Basato sulla Scienza
          </h2>
          
          <p className="text-center text-xl text-gray-700 max-w-3xl mx-auto mb-12">
            Il nostro metodo è stato sviluppato in collaborazione con esperti di psicologia relazionale e benessere emotivo delle migliori università.
          </p>
          
          <div className="flex flex-wrap justify-center gap-8">
            <div className="university-logo">
              <div className="text-center font-serif">
                <div className="text-sm">UNIVERSITY OF</div>
                <div className="text-xl font-bold">OXFORD</div>
              </div>
            </div>
            
            <div className="university-logo">
              <div className="text-center font-serif">
                <div className="text-sm">HARVARD</div>
                <div className="text-xl font-bold">UNIVERSITY</div>
              </div>
            </div>
            
            <div className="university-logo">
              <div className="text-center font-serif">
                <div className="text-sm">UNIVERSITY OF</div>
                <div className="text-xl font-bold">CAMBRIDGE</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonials */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            La Nostra Community
          </h2>
          
          <div className="text-center mb-10">
            <p className="text-2xl font-bold text-brand-primary">Oltre 1,000,000 di persone</p>
            <p className="text-xl">hanno scelto Liven</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Marco R.",
                quote: "Il quiz ha identificato perfettamente i miei schemi relazionali distruttivi e mi ha dato strumenti pratici per superarli."
              },
              {
                name: "Laura B.",
                quote: "Ho capito perché le mie relazioni fallivano sempre nello stesso modo. Ora ho gli strumenti per costruire legami più sani."
              },
              {
                name: "Giovanni T.",
                quote: "Mi ha aiutato ad uscire da un periodo di solitudine e a ritrovare fiducia nelle relazioni. Incredibilmente accurato!"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-brand-muted rounded-xl p-6 border-l-4 border-brand-primary">
                <div className="flex mb-4">
                  <div className="rating-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#FFB129" stroke="#FFB129" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                </div>
                
                <p className="italic mb-4">"{testimonial.quote}"</p>
                
                <p className="font-semibold">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* CTA */}
      <div className="py-16 bg-brand-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Pronto a Trasformare le Tue Relazioni?
          </h2>
          
          <p className="text-xl text-gray-700 mb-10">
            Inizia oggi il percorso verso un benessere emotivo duraturo e relazioni più soddisfacenti.
          </p>
          
          <button
            onClick={startQuiz}
            className="btn-primary text-lg px-10 py-4"
          >
            Inizia il Quiz Gratuito
          </button>
          
          <p className="mt-6 text-sm text-gray-600">
            Non preoccuparti, è completamente gratuito e richiede solo 5 minuti
          </p>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Lovable. Tutti i diritti riservati.</p>
            <p className="mt-2">
              <a href="#" className="underline hover:text-gray-700 mr-4">Privacy Policy</a>
              <a href="#" className="underline hover:text-gray-700">Termini e Condizioni</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
