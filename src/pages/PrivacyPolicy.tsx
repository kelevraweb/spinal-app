
import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Informazioni che Raccogliamo</h2>
              <p className="text-gray-700 mb-4">
                Spinal raccoglie diversi tipi di informazioni per fornirti il miglior servizio possibile:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Informazioni personali (nome, email, età)</li>
                <li>Dati relativi alla postura e al benessere fisico</li>
                <li>Informazioni sull'utilizzo dell'app</li>
                <li>Dati tecnici (indirizzo IP, tipo di dispositivo)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Come Utilizziamo le Tue Informazioni</h2>
              <p className="text-gray-700 mb-4">
                Utilizziamo le informazioni raccolte per:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Personalizzare i tuoi piani di esercizi</li>
                <li>Monitorare i tuoi progressi nel tempo</li>
                <li>Migliorare i nostri algoritmi e servizi</li>
                <li>Comunicare con te riguardo al tuo account</li>
                <li>Fornire supporto clienti</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Condivisione delle Informazioni</h2>
              <p className="text-gray-700 mb-4">
                Non vendiamo, affittiamo o condividiamo le tue informazioni personali con terze parti, 
                eccetto nei seguenti casi:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Con il tuo consenso esplicito</li>
                <li>Per adempiere a obblighi legali</li>
                <li>Con fornitori di servizi fidati che ci aiutano a operare</li>
                <li>In caso di fusione o acquisizione aziendale</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Sicurezza dei Dati</h2>
              <p className="text-gray-700 mb-4">
                Implementiamo misure di sicurezza appropriate per proteggere le tue informazioni personali 
                contro accessi non autorizzati, alterazioni, divulgazioni o distruzioni.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. I Tuoi Diritti</h2>
              <p className="text-gray-700 mb-4">
                Hai il diritto di:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Accedere alle tue informazioni personali</li>
                <li>Correggere informazioni inesatte</li>
                <li>Richiedere la cancellazione dei tuoi dati</li>
                <li>Limitare il trattamento dei tuoi dati</li>
                <li>Richiedere la portabilità dei dati</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Cookie e Tecnologie Simili</h2>
              <p className="text-gray-700 mb-4">
                Utilizziamo cookie e tecnologie simili per migliorare la tua esperienza, 
                analizzare l'utilizzo del servizio e personalizzare i contenuti.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Contatti</h2>
              <p className="text-gray-700 mb-4">
                Per domande sulla presente Privacy Policy o per esercitare i tuoi diritti, contattaci: 
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

export default PrivacyPolicy;
