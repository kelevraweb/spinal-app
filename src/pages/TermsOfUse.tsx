
import React from 'react';

const TermsOfUse: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Termini di Utilizzo</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Accettazione dei Termini</h2>
              <p className="text-gray-700 mb-4">
                Benvenuto su Spinal. Utilizzando i nostri servizi, accetti di essere vincolato da questi Termini di Utilizzo. 
                Se non accetti questi termini, ti preghiamo di non utilizzare i nostri servizi.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Descrizione del Servizio</h2>
              <p className="text-gray-700 mb-4">
                Spinal è una piattaforma digitale che fornisce valutazioni posturali personalizzate, piani di esercizi 
                e monitoraggio del benessere spinale. I nostri servizi sono basati su ricerche scientifiche validate 
                dalle principali università internazionali.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Uso Appropriato</h2>
              <p className="text-gray-700 mb-4">
                Ti impegni a utilizzare Spinal solo per scopi legali e in conformità con questi termini. 
                Non puoi utilizzare il servizio per:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Attività illegali o non autorizzate</li>
                <li>Violare i diritti di proprietà intellettuale</li>
                <li>Trasmettere contenuti dannosi o offensivi</li>
                <li>Interferire con il funzionamento del servizio</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Avvertenze Mediche</h2>
              <p className="text-gray-700 mb-4">
                I contenuti forniti da Spinal sono solo a scopo informativo e non sostituiscono il parere medico professionale. 
                Consulta sempre un medico qualificato prima di iniziare qualsiasi programma di esercizi o per problemi di salute specifici.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Proprietà Intellettuale</h2>
              <p className="text-gray-700 mb-4">
                Tutti i contenuti, algoritmi e materiali presenti su Spinal sono protetti da diritti d'autore e 
                altri diritti di proprietà intellettuale. È vietata la riproduzione o distribuzione non autorizzata.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Limitazione di Responsabilità</h2>
              <p className="text-gray-700 mb-4">
                Spinal non sarà responsabile per danni diretti, indiretti, incidentali o consequenziali derivanti 
                dall'uso del servizio. L'uso del servizio è a tuo rischio e pericolo.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Modifiche ai Termini</h2>
              <p className="text-gray-700 mb-4">
                Ci riserviamo il diritto di modificare questi termini in qualsiasi momento. 
                Ti informeremo di eventuali modifiche sostanziali tramite email o attraverso il servizio.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Contatti</h2>
              <p className="text-gray-700 mb-4">
                Per domande sui presenti Termini di Utilizzo, contattaci all'indirizzo: 
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

export default TermsOfUse;
