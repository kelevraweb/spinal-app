
import React from 'react';

const MoneyBackGuarantee: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Garanzia di Rimborso</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. REGOLE DELLA GARANZIA DI RIMBORSO</h2>
              <p className="text-gray-700 mb-4">
                Oltre ai diritti di rimborso disponibili secondo le leggi applicabili, se hai effettuato un acquisto 
                direttamente sul nostro sito web e l'opzione di rimborso ti è stata presentata durante il checkout, 
                hai diritto a ricevere un rimborso purché siano soddisfatte tutte le seguenti condizioni:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Ci contatti via email a 
                  <a href="mailto:support@spinalapp.net" className="text-blue-600 hover:text-blue-800 ml-1">
                    support@spinalapp.net
                  </a> entro 30 giorni dal tuo acquisto iniziale e prima della fine del periodo di abbonamento; e
                </li>
                <li>Sei in grado di dimostrare di aver effettivamente seguito il piano fornendo screenshot dalla piattaforma Spinal.</li>
              </ul>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">DICHIARAZIONE IMPORTANTE</h3>
                <p className="text-yellow-700">
                  Si prega di notare che solo il soddisfacimento di tutti i requisiti sopra indicati 
                  consente di ricevere un Rimborso Volontario completo sotto la "Garanzia di rimborso". 
                  Per chiarezza, questa "Garanzia di rimborso" non si applica ai seguenti casi:
                </p>
                <ul className="list-disc pl-6 text-yellow-700 mt-2">
                  <li>Ragioni personali (non ti piace il prodotto, non ha soddisfatto le tue aspettative ecc.);</li>
                  <li>Ragioni finanziarie (non ti aspettavi di essere addebitato, che la prova si convertisse in abbonamento, 
                      che l'abbonamento si rinnovasse automaticamente, o che i servizi fossero a pagamento ecc.).</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. REGOLE GENERALI DI RIMBORSO</h2>
              <p className="text-gray-700 mb-4">
                Generalmente, se non soddisfi le condizioni sopra indicate, le tariffe che hai pagato sono 
                non rimborsabili e/o non scambiabili, a meno che non sia diversamente stabilito qui o 
                richiesto dalla legge applicabile.
              </p>
              
              <p className="text-gray-700 mb-4">
                <strong>Nota per i residenti di alcuni stati degli Stati Uniti:</strong> Se risiedi in California 
                o Connecticut e annulli l'acquisto in qualsiasi momento prima della mezzanotte del terzo giorno 
                lavorativo dopo la data di tale acquisto, restituiremo il pagamento che hai effettuato.
              </p>
              
              <p className="text-gray-700 mb-4">
                <strong>Nota per i residenti dell'UE:</strong> Se sei un residente dell'UE, hai il diritto di 
                recedere dall'accordo per l'acquisto di contenuti digitali senza spese e senza fornire alcun 
                motivo entro quattordici (14) giorni dalla data di conclusione di tale accordo. Il diritto di 
                recesso non si applica se l'esecuzione dell'accordo è iniziata con il tuo consenso espresso 
                preventivo e il tuo riconoscimento che perdi così il tuo diritto di recesso. Con la presente 
                acconsenti espressamente all'esecuzione immediata dell'accordo e riconosci che perderai il tuo 
                diritto di recesso dall'accordo una volta che i nostri server convalidano il tuo acquisto e 
                l'acquisto applicabile viene consegnato con successo. Pertanto, non sarai idoneo per un rimborso, 
                a meno che il contenuto digitale non sia difettoso.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Come Richiedere un Rimborso</h2>
              <p className="text-gray-700 mb-4">
                Per richiedere un rimborso secondo la nostra Garanzia di Rimborso, segui questi passaggi:
              </p>
              <ol className="list-decimal pl-6 text-gray-700 mb-4">
                <li>Invia un'email a 
                  <a href="mailto:support@spinalapp.net" className="text-blue-600 hover:text-blue-800 ml-1">
                    support@spinalapp.net
                  </a> entro 30 giorni dal tuo acquisto
                </li>
                <li>Includi il tuo nome completo e l'indirizzo email utilizzato per l'acquisto</li>
                <li>Fornisci screenshot che dimostrano di aver seguito il piano Spinal</li>
                <li>Specifica il motivo della richiesta di rimborso</li>
              </ol>
              <p className="text-gray-700 mb-4">
                Il nostro team di supporto esaminerà la tua richiesta e ti risponderà entro 5-7 giorni lavorativi.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Contatti</h2>
              <p className="text-gray-700 mb-4">
                Per domande sulla nostra Garanzia di Rimborso, contattaci: 
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

export default MoneyBackGuarantee;
