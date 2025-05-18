import { QuizQuestion } from '../types/quiz';

export const quizQuestions: QuizQuestion[] = [
  {
    id: "gender",
    question: "Qual è il tuo sesso?",
    type: "single",
    options: ["Maschio", "Femmina"],
    required: true
  },
  {
    id: "age",
    question: "Qual è la tua fascia d'età?",
    type: "single",
    options: ["18-24", "25-34", "35-44", "45-54", "55+"],
    required: true
  },
  {
    id: "back_pain_thoughts",
    question: "Negli ultimi mesi, quanto spesso hai pensato che il tuo dolore alla schiena potrebbe peggiorare?",
    type: "single",
    options: ["Spesso, ho paura che diventi cronico", "Qualche volta, ma ci convivo", "Raramente, non mi preoccupo", "Non ho dolori, voglio solo migliorare la postura"],
    required: true
  },
  {
    id: "posture_evaluation",
    question: "Come valuti oggi la tua postura e il tuo stile di vita?",
    type: "single",
    options: ["So di avere una postura scorretta", "Penso di avere una postura normale ma sedentaria", "Faccio già attività fisica ma sento rigidità", "Non saprei dire"],
    required: true
  },
  {
    id: "pain_locations",
    question: "Dove senti più spesso dolore o rigidità?",
    type: "multiple",
    options: ["Collo e cervicale", "Parte alta della schiena", "Zona lombare", "Spalle", "Anche e bacino", "Gambe", "Nessun dolore, voglio solo prevenzione"],
    maxSelections: 3,
    required: true
  },
  {
    id: "pain_duration",
    question: "Da quanto tempo avverti questo fastidio?",
    type: "single",
    options: ["Da pochi giorni", "Qualche settimana", "Mesi", "Più di un anno", "È un problema ricorrente"],
    required: true
  },
  {
    id: "pain_cause",
    question: "Secondo te qual è la causa principale?",
    type: "single",
    options: ["Lavoro sedentario", "Troppi sforzi fisici", "Postura scorretta", "Stress e tensione", "Nessuna idea precisa"],
    required: true
  },
  {
    id: "pain_impact",
    question: "Che impatto ha il dolore sulla tua giornata?",
    type: "single",
    options: ["Mi limita nei movimenti", "Influisce sul mio umore", "Mi impedisce di fare sport o attività", "È solo fastidioso ma lo sopporto", "Non incide particolarmente"],
    required: true
  },
  {
    id: "body_signals",
    question: "Ti capita di ignorare i segnali del tuo corpo finché il dolore diventa troppo forte?",
    type: "single",
    options: ["Sì, me ne accorgo solo quando peggiora", "A volte, cerco di resistere", "Cerco di intervenire subito", "No, ascolto sempre il mio corpo"],
    required: true
  },
  {
    id: "pain_reaction",
    question: "Quando senti dolore o fastidio fisico, come reagisci di solito?",
    type: "single",
    options: ["Stringo i denti e vado avanti", "Aspetto che passi da solo", "Cerco soluzioni rapide come antidolorifici", "Cerco esercizi o rimedi naturali"],
    required: true
  },
  {
    id: "daily_wellness_time",
    question: "Quanto tempo puoi dedicare al tuo benessere ogni giorno?",
    type: "single",
    options: ["5 minuti", "10 minuti", "15 minuti", "20+ minuti"],
    required: true
  },
  {
    id: "daily_activity",
    question: "Quanto ti muovi durante la giornata?",
    type: "single",
    options: ["Quasi nulla", "Solo camminate leggere", "Faccio sport o esercizi regolari", "Alterno periodi attivi e sedentari"],
    required: true
  },
  {
    id: "online_posture_program",
    question: "Hai mai seguito un percorso online per migliorare la postura o alleviare dolori?",
    type: "single",
    options: ["Sì", "No", "Ho provato, ma l'ho abbandonato"],
    required: true
  },
  {
    id: "end_of_day_feeling",
    question: "Come ti senti a fine giornata?",
    type: "single",
    options: ["Rigida/o e stanca/o", "Con dolori o tensioni", "Scarico/a mentalmente", "Bene"],
    required: true
  },
  {
    id: "avoid_movements",
    question: "Ti capita di evitare movimenti o attività per paura del dolore?",
    type: "single",
    options: ["Spesso", "Qualche volta", "Mai"],
    required: true
  },
  {
    id: "posture_diagnosis",
    question: "Hai mai ricevuto diagnosi (non mediche) come: cifosi, scoliosi, lordosi accentuata?",
    type: "single",
    options: ["Sì", "No", "Non so"],
    required: true
  },
  {
    id: "main_goal",
    question: "Qual è l'obiettivo principale che ti motiva ad iniziare questo percorso?",
    type: "multiple",
    options: ["Eliminare il mal di schiena", "Correggere la postura", "Sentirmi più energico/a", "Prevenire problemi futuri", "Aumentare la mobilità", "Capire come ascoltare meglio il mio corpo"],
    maxSelections: 2,
    required: true
  },
  {
    id: "improvement_blockers",
    question: "Cosa ti ha bloccato finora dal migliorare la tua schiena?",
    type: "single",
    options: ["Poco tempo", "Non sapere da dove iniziare", "Paura di peggiorare la situazione", "Mi dimentico di farlo", "Nessun blocco, sto cercando il metodo giusto"],
    required: true
  },
  {
    id: "consistency",
    question: "Quando inizi qualcosa per migliorare la tua salute o benessere, quanto riesci a mantenere la costanza?",
    type: "single",
    options: ["Inizio motivato/a, ma poi mollo", "Ci provo, ma mi perdo se non ho una guida", "Sono costante solo se vedo risultati subito", "Sono determinato/a e mi impegno davvero"],
    required: true
  },
  {
    id: "abandonment",
    question: "Hai mai abbandonato un percorso per il tuo benessere prima di vedere risultati?",
    type: "single",
    options: ["Sì, spesso", "Qualche volta", "No, ma faccio fatica a essere costante", "No, quando inizio qualcosa la porto a termine"],
    required: true
  },
  {
    id: "body_feeling",
    question: "Come ti senti rispetto al tuo corpo e ai tuoi movimenti?",
    type: "single",
    options: ["Lo sento \"bloccato\" e poco reattivo", "Mi sento rigido/a e poco sicuro/a", "A volte fluido, a volte impacciato", "Mi muovo bene e mi fido del mio corpo"],
    required: true
  },
  {
    id: "stress_pain",
    question: "Quando sei stressato/a o stanco/a, il dolore o la rigidità aumentano?",
    type: "single",
    options: ["Sì, ogni volta", "Solo in periodi particolari", "Non ci ho mai fatto caso", "No, il dolore è sempre uguale"],
    required: true
  },
  {
    id: "training_time",
    question: "In quale momento della giornata vorresti allenarti?",
    type: "single",
    options: ["Mattina presto", "Pausa pranzo", "Sera", "Quando capita, senza orari fissi"],
    required: true
  },
  {
    id: "approach_preference",
    question: "Che tipo di approccio preferisci?",
    type: "single",
    options: ["Video brevi e semplici", "Sessioni guidate più strutturate", "Tecniche di rilassamento + movimento", "Un mix equilibrato"],
    required: true
  },
  {
    id: "expert_reference",
    question: "Hai sentito parlare di noi da un esperto?",
    type: "single",
    options: ["Sì", "No"],
    required: true
  },
  {
    id: "daily_time_commitment",
    question: "Quanto tempo puoi dedicare al tuo benessere ogni giorno?",
    type: "single",
    options: ["5 minuti", "10 minuti", "15 minuti", "20+ minuti"],
    required: true
  },
  {
    id: "posture_time_dedication",
    question: "Scegli quanto tempo vuoi dedicare ogni giorno al tuo benessere posturale e al miglioramento della tua mobilità.",
    type: "single",
    options: ["5 minuti – Inizio leggero, ma costante", "10 minuti – Il giusto equilibrio tra tempo ed efficacia", "15 minuti – Per chi vuole risultati più rapidi", "20+ minuti – Sono pronto/a a cambiare davvero"],
    required: true
  },
  {
    id: "posture_knowledge",
    question: "Quanto ne sai sugli allenamenti posturali?",
    type: "single",
    options: ["Nulla", "Non così tanto", "Molto"],
    required: true
  },
  {
    id: "future_physical_state",
    question: "Come ti immagini fisicamente nei prossimi 5 anni se non fai nulla?",
    type: "single",
    options: ["Con più dolori e meno energia", "Probabilmente simile a ora", "Non ci ho mai pensato", "Spero di stare meglio, ma non so come"],
    required: true
  }
];

export const additionalQuestions = [
  {
    id: "procrastination",
    question: "Ti capita spesso di procrastinare?",
    type: "single",
    options: ["Sì", "No"],
  },
  {
    id: "overwhelmed",
    question: "Ti senti sopraffatto/a dalle emozioni?",
    type: "single",
    options: ["Sì", "No"],
  },
  {
    id: "energy_depletion",
    question: "Ti senti spesso svuotato/a a fine giornata?",
    type: "single",
    options: ["Sì", "No"],
  }
];
