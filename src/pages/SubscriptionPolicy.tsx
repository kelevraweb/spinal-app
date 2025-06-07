import React from 'react';

const SubscriptionPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Policy di Abbonamento</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Piani di Abbonamento</h2>
              <p className="text-gray-700 mb-4">
                Spinal offre diversi piani di abbonamento per soddisfare le tue esigenze:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Piano di 7 giorni con quota di configurazione</li>
                <li>Piano mensile</li>
                <li>Piano trimestrale</li>
              </ul>
              <p className="text-gray-700 mb-4">
                Tutti i prezzi sono indicati in Euro e includono le tasse applicabili.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Fatturazione e Pagamenti</h2>
              <p className="text-gray-700 mb-4">
                Gli abbonamenti vengono fatturati in anticipo su base ricorrente. 
                I pagamenti vengono elaborati automaticamente alla data di rinnovo utilizzando 
                il metodo di pagamento registrato.
              </p>
              <p className="text-gray-700 mb-4">
                Accettiamo i seguenti metodi di pagamento:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Carte di credito (Visa, Mastercard, American Express)</li>
                <li>Carte di debito</li>
                <li>PayPal</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Periodo di Prova Gratuito</h2>
              <p className="text-gray-700 mb-4">
                Alcuni piani possono includere un periodo di prova gratuito. Durante questo periodo, 
                avrai accesso completo alle funzionalità di Spinal. Se non annulli prima della fine 
                del periodo di prova, verrà automaticamente addebitato il costo dell'abbonamento.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Cancellazione e Rimborsi</h2>
              <p className="text-gray-700 mb-4">
                Per disdire l'abbonamento devi scrivere un'email a: 
                <a href="mailto:support@spinalapp.net" className="text-blue-600 hover:text-blue-800 ml-1">
                  support@spinalapp.net
                </a>
              </p>
              <p className="text-gray-700 mb-4">
                La cancellazione avrà effetto alla fine del periodo di fatturazione corrente.
              </p>
              <p className="text-gray-700 mb-4">
                Per informazioni sui rimborsi, consulta la nostra 
                <a href="/money-back-guarantee" className="text-blue-600 hover:text-blue-800 ml-1">
                  Garanzia di Rimborso
                </a>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Modifiche ai Prezzi</h2>
              <p className="text-gray-700 mb-4">
                Ci riserviamo il diritto di modificare i prezzi degli abbonamenti. 
                Ti informeremo con almeno 30 giorni di anticipo di eventuali modifiche ai prezzi. 
                Le modifiche non influenzeranno il tuo abbonamento corrente fino al rinnovo successivo.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Sospensione del Servizio</h2>
              <p className="text-gray-700 mb-4">
                Ci riserviamo il diritto di sospendere o terminare il tuo account in caso di:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Mancato pagamento</li>
                <li>Violazione dei Termini di Utilizzo</li>
                <li>Uso improprio del servizio</li>
                <li>Attività fraudolente</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Rinnovo Automatico</h2>
              <p className="text-gray-700 mb-4">
                Gli abbonamenti si rinnovano automaticamente alla scadenza, a meno che non vengano 
                cancellati almeno 24 ore prima della data di rinnovo. Puoi disattivare il rinnovo 
                automatico nelle impostazioni del tuo account.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Contatti</h2>
              <p className="text-gray-700 mb-4">
                Per domande sulla fatturazione o sui rimborsi, contattaci: 
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

export default SubscriptionPolicy;
