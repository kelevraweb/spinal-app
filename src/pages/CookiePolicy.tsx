
import React from 'react';

const CookiePolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Cookie Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Cosa sono i Cookie</h2>
              <p className="text-gray-700 mb-4">
                I cookie sono piccoli file di testo che vengono memorizzati sul tuo dispositivo quando visiti Spinal. 
                Ci aiutano a fornire una migliore esperienza utente e a comprendere come utilizzi il nostro servizio.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Tipi di Cookie che Utilizziamo</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Cookie Essenziali</h3>
              <p className="text-gray-700 mb-4">
                Questi cookie sono necessari per il funzionamento del sito e non possono essere disabilitati. 
                Includono cookie per l'autenticazione e la sicurezza.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Cookie Analitici</h3>
              <p className="text-gray-700 mb-4">
                Utilizziamo cookie analitici per comprendere come i visitatori interagiscono con Spinal, 
                aiutandoci a migliorare il servizio.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Cookie di Personalizzazione</h3>
              <p className="text-gray-700 mb-4">
                Questi cookie ci permettono di ricordare le tue preferenze e personalizzare la tua esperienza.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Cookie di Marketing</h3>
              <p className="text-gray-700 mb-4">
                Utilizzati per tracciare i visitatori attraverso i siti web e mostrare annunci rilevanti e coinvolgenti.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Cookie di Terze Parti</h2>
              <p className="text-gray-700 mb-4">
                Spinal utilizza servizi di terze parti che possono impostare i propri cookie:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Google Analytics per l'analisi del traffico</li>
                <li>Facebook Pixel per il marketing</li>
                <li>Stripe per l'elaborazione dei pagamenti</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Gestione dei Cookie</h2>
              <p className="text-gray-700 mb-4">
                Puoi controllare e gestire i cookie attraverso le impostazioni del tuo browser. 
                Tuttavia, disabilitare alcuni cookie potrebbe influenzare la funzionalità del sito.
              </p>
              <p className="text-gray-700 mb-4">
                La maggior parte dei browser ti consente di:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Vedere quali cookie sono memorizzati sul tuo dispositivo</li>
                <li>Eliminare tutti o alcuni cookie</li>
                <li>Bloccare i cookie di terze parti</li>
                <li>Bloccare tutti i cookie da siti specifici</li>
                <li>Eliminare tutti i cookie quando chiudi il browser</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Modifiche alla Cookie Policy</h2>
              <p className="text-gray-700 mb-4">
                Potremmo aggiornare questa Cookie Policy periodicamente per riflettere modifiche 
                nelle nostre pratiche o per altri motivi operativi, legali o normativi.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Contatti</h2>
              <p className="text-gray-700 mb-4">
                Per domande su questa Cookie Policy, contattaci: 
                <a href="mailto:support@spinalapp.net" className="text-blue-600 hover:text-blue-800 ml-1">
                  support@spinalapp.net
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
