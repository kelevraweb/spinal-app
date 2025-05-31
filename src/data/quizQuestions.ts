
import { QuizOption, QuizQuestion } from '../types/quiz';

export const quizQuestions: QuizQuestion[] = [
  {
    id: "gender",
    question: "Qual è il tuo sesso?",
    type: "single",
    options: [
      { text: "Maschio", iconName: "body" },
      { text: "Femmina", iconName: "body" }
    ],
    required: true
  },
  {
    id: "age",
    question: "Qual è la tua fascia d'età?",
    type: "single",
    options: [
      { text: "18-24", iconName: "calendar" },
      { text: "25-34", iconName: "calendar" },
      { text: "35-44", iconName: "calendar" },
      { text: "45-54", iconName: "calendar" },
      { text: "55+", iconName: "calendar" }
    ],
    required: true
  },
  {
    id: "back_pain_thoughts",
    question: "Negli ultimi mesi, quanto spesso hai pensato che il tuo dolore alla schiena potrebbe peggiorare?",
    type: "single",
    options: [
      { text: "Spesso, ho paura che diventi cronico", iconName: "frown" },
      { text: "Qualche volta, ma ci convivo", iconName: "meh" },
      { text: "Raramente, non mi preoccupo", iconName: "smile" },
      { text: "Non ho dolori, voglio solo migliorare la postura", iconName: "activity" }
    ],
    required: true
  },
  {
    id: "posture_evaluation",
    question: "Come valuti oggi la tua postura e il tuo stile di vita?",
    type: "single",
    options: [
      { text: "So di avere una postura scorretta", iconName: "activity" },
      { text: "Penso di avere una postura normale ma sedentaria", iconName: "activity" },
      { text: "Faccio già attività fisica ma sento rigidità", iconName: "activity" },
      { text: "Non saprei dire", iconName: "meh" }
    ],
    required: true
  },
  {
    id: "pain_locations",
    question: "Dove senti più spesso dolore o rigidità?",
    type: "multiple",
    options: [
      { text: "Collo e cervicale", iconName: "activity" },
      { text: "Parte alta della schiena", iconName: "activity" },
      { text: "Zona lombare", iconName: "activity" },
      { text: "Spalle", iconName: "dumbbell" },
      { text: "Anche e bacino", iconName: "dumbbell" },
      { text: "Gambe", iconName: "activity" },
      { text: "Nessun dolore, voglio solo prevenzione", iconName: "smile" }
    ],
    maxSelections: 3,
    required: true
  },
  {
    id: "pain_duration",
    question: "Da quanto tempo avverti questo fastidio?",
    type: "single",
    options: [
      { text: "Da pochi giorni", iconName: "clock" },
      { text: "Qualche settimana", iconName: "calendar" },
      { text: "Mesi", iconName: "calendar" },
      { text: "Più di un anno", iconName: "calendar" },
      { text: "È un problema ricorrente", iconName: "timer" }
    ],
    required: true
  },
  {
    id: "pain_cause",
    question: "Secondo te qual è la causa principale?",
    type: "single",
    options: [
      { text: "Lavoro sedentario", iconName: "body" },
      { text: "Troppi sforzi fisici", iconName: "dumbbell" },
      { text: "Postura scorretta", iconName: "chart" },
      { text: "Stress e tensione", iconName: "frown" },
      { text: "Nessuna idea precisa", iconName: "meh" }
    ],
    required: true
  },
  {
    id: "pain_impact",
    question: "Che impatto ha il dolore sulla tua giornata?",
    type: "single",
    options: [
      { text: "Mi limita nei movimenti", iconName: "body" },
      { text: "Influisce sul mio umore", iconName: "frown" },
      { text: "Mi impedisce di fare sport o attività", iconName: "dumbbell" },
      { text: "È solo fastidioso ma lo sopporto", iconName: "meh" },
      { text: "Non incide particolarmente", iconName: "smile" }
    ],
    required: true
  },
  {
    id: "body_signals",
    question: "Ti capita di ignorare i segnali del tuo corpo finché il dolore diventa troppo forte?",
    type: "single",
    options: [
      { text: "Sì, me ne accorgo solo quando peggiora", iconName: "frown" },
      { text: "A volte, cerco di resistere", iconName: "meh" },
      { text: "Cerco di intervenire subito", iconName: "smile" },
      { text: "No, ascolto sempre il mio corpo", iconName: "body" }
    ],
    required: true
  },
  {
    id: "pain_reaction",
    question: "Quando senti dolore o fastidio fisico, come reagisci di solito?",
    type: "single",
    options: [
      { text: "Stringo i denti e vado avanti", iconName: "frown" },
      { text: "Aspetto che passi da solo", iconName: "meh" },
      { text: "Cerco soluzioni rapide come antidolorifici", iconName: "timer" },
      { text: "Cerco esercizi o rimedi naturali", iconName: "yoga" }
    ],
    required: true
  },
  {
    id: "daily_wellness_time",
    question: "Quanto tempo puoi dedicare al tuo benessere ogni giorno?",
    type: "single",
    options: [
      { text: "5 minuti", iconName: "clock" },
      { text: "10 minuti", iconName: "clock" },
      { text: "15 minuti", iconName: "clock" },
      { text: "20+ minuti", iconName: "clock" }
    ],
    required: true
  },
  {
    id: "daily_activity",
    question: "Quanto ti muovi durante la giornata?",
    type: "single",
    options: [
      { text: "Quasi nulla", iconName: "body" },
      { text: "Solo camminate leggere", iconName: "walking" },
      { text: "Faccio sport o esercizi regolari", iconName: "dumbbell" },
      { text: "Alterno periodi attivi e sedentari", iconName: "activity" }
    ],
    required: true
  },
  {
    id: "online_posture_program",
    question: "Hai mai seguito un percorso online per migliorare la postura o alleviare dolori?",
    type: "single",
    options: [
      { text: "Sì", iconName: "smile" },
      { text: "No", iconName: "frown" },
      { text: "Ho provato, ma l'ho abbandonato", iconName: "meh" }
    ],
    required: true
  },
  {
    id: "end_of_day_feeling",
    question: "Come ti senti a fine giornata?",
    type: "single",
    options: [
      { text: "Rigida/o e stanca/o", iconName: "frown" },
      { text: "Con dolori o tensioni", iconName: "frown" },
      { text: "Scarico/a mentalmente", iconName: "meh" },
      { text: "Bene", iconName: "smile" }
    ],
    required: true
  },
  {
    id: "avoid_movements",
    question: "Ti capita di evitare movimenti o attività per paura del dolore?",
    type: "single",
    options: [
      { text: "Spesso", iconName: "frown" },
      { text: "Qualche volta", iconName: "meh" },
      { text: "Mai", iconName: "smile" }
    ],
    required: true
  },
  {
    id: "posture_diagnosis",
    question: "Hai mai ricevuto diagnosi (non mediche) come: cifosi, scoliosi, lordosi accentuata?",
    type: "single",
    options: [
      { text: "Sì", iconName: "frown" },
      { text: "No", iconName: "smile" },
      { text: "Non so", iconName: "meh" }
    ],
    required: true
  },
  {
    id: "main_goal",
    question: "Qual è l'obiettivo principale che ti motiva ad iniziare questo percorso?",
    type: "multiple",
    options: [
      { text: "Eliminare il mal di schiena", iconName: "activity" },
      { text: "Correggere la postura", iconName: "body" },
      { text: "Sentirmi più energico/a", iconName: "star" },
      { text: "Prevenire problemi futuri", iconName: "chart" },
      { text: "Aumentare la mobilità", iconName: "activity" },
      { text: "Capire come ascoltare meglio il mio corpo", iconName: "body" }
    ],
    maxSelections: 2,
    required: true
  },
  {
    id: "improvement_blockers",
    question: "Cosa ti ha bloccato finora dal migliorare la tua schiena?",
    type: "single",
    options: [
      { text: "Poco tempo", iconName: "clock" },
      { text: "Non sapere da dove iniziare", iconName: "meh" },
      { text: "Paura di peggiorare la situazione", iconName: "frown" },
      { text: "Mi dimentico di farlo", iconName: "meh" },
      { text: "Nessun blocco, sto cercando il metodo giusto", iconName: "smile" }
    ],
    required: true
  },
  {
    id: "consistency",
    question: "Quando inizi qualcosa per migliorare la tua salute o benessere, quanto riesci a mantenere la costanza?",
    type: "single",
    options: [
      { text: "Inizio motivato/a, ma poi mollo", iconName: "frown" },
      { text: "Ci provo, ma mi perdo se non ho una guida", iconName: "meh" },
      { text: "Sono costante solo se vedo risultati subito", iconName: "meh" },
      { text: "Sono determinato/a e mi impegno davvero", iconName: "smile" }
    ],
    required: true
  },
  {
    id: "abandonment",
    question: "Hai mai abbandonato un percorso per il tuo benessere prima di vedere risultati?",
    type: "single",
    options: [
      { text: "Sì, spesso", iconName: "frown" },
      { text: "Qualche volta", iconName: "meh" },
      { text: "No, ma faccio fatica a essere costante", iconName: "meh" },
      { text: "No, quando inizio qualcosa la porto a termine", iconName: "smile" }
    ],
    required: true
  },
  {
    id: "body_feeling",
    question: "Come ti senti rispetto al tuo corpo e ai tuoi movimenti?",
    type: "single",
    options: [
      { text: "Lo sento \"bloccato\" e poco reattivo", iconName: "frown" },
      { text: "Mi sento rigido/a e poco sicuro/a", iconName: "frown" },
      { text: "A volte fluido, a volte impacciato", iconName: "meh" },
      { text: "Mi muovo bene e mi fido del mio corpo", iconName: "smile" }
    ],
    required: true
  },
  {
    id: "stress_pain",
    question: "Quando sei stressato/a o stanco/a, il dolore o la rigidità aumentano?",
    type: "single",
    options: [
      { text: "Sì, ogni volta", iconName: "frown" },
      { text: "Solo in periodi particolari", iconName: "meh" },
      { text: "Non ci ho mai fatto caso", iconName: "meh" },
      { text: "No, il dolore è sempre uguale", iconName: "smile" }
    ],
    required: true
  },
  {
    id: "training_time",
    question: "In quale momento della giornata vorresti allenarti?",
    type: "single",
    options: [
      { text: "Mattina presto", iconName: "clock" },
      { text: "Pausa pranzo", iconName: "clock" },
      { text: "Sera", iconName: "clock" },
      { text: "Quando capita, senza orari fissi", iconName: "clock" }
    ],
    required: true
  },
  {
    id: "approach_preference",
    question: "Che tipo di approccio preferisci?",
    type: "single",
    options: [
      { text: "Video brevi e semplici", iconName: "clock" },
      { text: "Sessioni guidate più strutturate", iconName: "clock" },
      { text: "Tecniche di rilassamento + movimento", iconName: "clock" },
      { text: "Un mix equilibrato", iconName: "clock" }
    ],
    required: true
  },
  {
    id: "expert_reference",
    question: "Hai sentito parlare di noi da un esperto?",
    type: "single",
    options: [
      { text: "Sì", iconName: "smile" },
      { text: "No", iconName: "frown" }
    ],
    required: true
  },
  {
    id: "daily_time_commitment",
    question: "Quanto tempo puoi dedicare al tuo benessere ogni giorno?",
    type: "single",
    options: [
      { text: "5 minuti", iconName: "clock" },
      { text: "10 minuti", iconName: "clock" },
      { text: "15 minuti", iconName: "clock" },
      { text: "20+ minuti", iconName: "clock" }
    ],
    required: true
  },
  {
    id: "posture_time_dedication",
    question: "Scegli quanto tempo vuoi dedicare ogni giorno al tuo benessere posturale e al miglioramento della tua mobilità.",
    type: "single",
    options: [
      { text: "5 minuti – Inizio leggero, ma costante", iconName: "clock" },
      { text: "10 minuti – Il giusto equilibrio tra tempo ed efficacia", iconName: "clock" },
      { text: "15 minuti – Per chi vuole risultati più rapidi", iconName: "clock" },
      { text: "20+ minuti – Sono pronto/a a cambiare davvero", iconName: "clock" }
    ],
    required: true
  },
  {
    id: "posture_knowledge",
    question: "Cosa sai riguardo gli allenamenti posturali?",
    type: "single",
    options: [
      { text: "Nulla", iconName: "frown" },
      { text: "Non così tanto", iconName: "meh" },
      { text: "Molto", iconName: "smile" }
    ],
    required: true
  },
  {
    id: "future_physical_state",
    question: "Come ti immagini fisicamente nei prossimi 5 anni se non fai nulla?",
    type: "single",
    options: [
      { text: "Con più dolori e meno energia", iconName: "frown" },
      { text: "Probabilmente simile a ora", iconName: "meh" },
      { text: "Non ci ho mai pensato", iconName: "meh" },
      { text: "Spero di stare meglio, ma non so come", iconName: "chart" }
    ],
    required: true
  }
];

export const additionalQuestions = [
  {
    id: "procrastination",
    question: "Ti capita spesso di procrastinare?",
    type: "single",
    options: [
      { text: "Sì", iconName: "clock" },
      { text: "No", iconName: "timer" }
    ],
  },
  {
    id: "overwhelmed",
    question: "Ti senti sopraffatto/a dalle emozioni?",
    type: "single",
    options: [
      { text: "Sì", iconName: "frown" }, 
      { text: "No", iconName: "smile" }
    ],
  },
  {
    id: "energy_depletion",
    question: "Ti senti spesso svuotato/a a fine giornata?",
    type: "single",
    options: [
      { text: "Sì", iconName: "frown" },
      { text: "No", iconName: "smile" }
    ],
  }
];
