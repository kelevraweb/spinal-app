
import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Contatti</h1>
          
          <div className="max-w-2xl mx-auto">
            <div className="text-6xl mb-6">📧</div>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Hai bisogno di aiuto?
            </h2>
            
            <p className="text-lg text-gray-600 mb-8">
              Il nostro team di supporto è qui per aiutarti. Contattaci per qualsiasi domanda, 
              problema tecnico o feedback sui nostri servizi.
            </p>
            
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Email di Supporto
              </h3>
              <a 
                href="mailto:support@spinalapp.net" 
                className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition-colors"
              >
                support@spinalapp.net
              </a>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-800 mb-2">⏰ Tempi di Risposta</h4>
                <p className="text-gray-600">
                  Rispondiamo di solito entro 24 ore nei giorni lavorativi
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-800 mb-2">🌍 Supporto</h4>
                <p className="text-gray-600">
                  Disponibile in italiano e inglese
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-800 mb-2">🔧 Supporto Tecnico</h4>
                <p className="text-gray-600">
                  Assistenza per problemi tecnici e di utilizzo
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-800 mb-2">💳 Fatturazione</h4>
                <p className="text-gray-600">
                  Assistenza per pagamenti e abbonamenti
                </p>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">💡 Suggerimento</h4>
              <p className="text-gray-600">
                Per ricevere assistenza più rapida, includi nella tua email: il tipo di dispositivo utilizzato, 
                una descrizione dettagliata del problema e, se possibile, degli screenshot.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
