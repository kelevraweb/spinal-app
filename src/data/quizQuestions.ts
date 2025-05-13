
import { QuizQuestion } from '../types/quiz';

export const quizQuestions: QuizQuestion[] = [
  {
    id: "gender",
    question: "Qual è il tuo sesso?",
    type: "single",
    options: ["Maschio", "Femmina", "Altro"],
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
    id: "movie_title",
    question: "Se la trasformazione che stai per fare fosse un film, che titolo gli daresti?",
    type: "text",
    required: true
  },
  {
    id: "goals",
    question: "Cosa vuoi ottenere in questo percorso?",
    type: "multiple",
    options: ["Più autostima", "Relazioni più sane", "Superare una rottura", "Trovare l'amore", "Migliorare la relazione attuale", "Capire meglio me stesso/a"],
    maxSelections: 3,
    required: true
  },
  {
    id: "importance",
    question: "Perché è importante per te questo risultato?",
    type: "text",
    required: true
  },
  {
    id: "life_colors",
    question: "Di che colore sei in questo momento di vita? (1-3 colori)",
    type: "color",
    required: true
  },
  {
    id: "current_mood",
    question: "Con quale stato d'animo inizi questo percorso?",
    type: "multiple",
    options: ["Speranzoso/a", "Determinato/a", "Confuso/a", "Ansioso/a", "Entusiasta", "Triste", "Arrabbiato/a", "Ottimista", "Pessimista", "Curioso/a"],
    maxSelections: 5,
    required: true
  },
  {
    id: "current_level",
    question: "Su una scala da 1 a 10, dove ti trovi oggi rispetto al tuo stato ideale?",
    type: "scale",
    required: true
  },
  {
    id: "success_criteria",
    question: "Da cosa capirai che avrai raggiunto il risultato desiderato?",
    type: "text",
    required: true
  },
  {
    id: "commitment",
    question: "Cosa sei disposto/a a mettere in gioco per riuscirci?",
    type: "text",
    required: true
  },
  {
    id: "happiness_definition",
    question: "Qual è la tua idea di felicità?",
    type: "text",
    required: true
  },
  {
    id: "relationship_desire",
    question: "Qual è il tuo desiderio più grande in ambito relazionale?",
    type: "text",
    required: true
  },
  {
    id: "loved_situations",
    question: "In quali situazioni ti senti più amato/a?",
    type: "multiple",
    options: ["Quando ricevo regali", "Quando passo del tempo di qualità", "Quando ricevo parole di affermazione", "Quando ricevo aiuto pratico", "Quando ricevo contatto fisico/affetto"],
    maxSelections: 2,
    required: true
  },
  {
    id: "inadequacy_feeling",
    question: "Cosa ti fa sentire non abbastanza?",
    type: "text",
    required: true
  },
  {
    id: "feeling_understood",
    question: "Quando ti sei sentito/a davvero visto/a e compreso/a l'ultima volta?",
    type: "text",
    required: true
  },
  {
    id: "repressed_emotion",
    question: "Quale emozione reprimi più spesso?",
    type: "single",
    options: ["Rabbia", "Tristezza", "Paura", "Vergogna", "Gelosia", "Felicità", "Amore"],
    required: true
  },
  {
    id: "relationship_fear",
    question: "Qual è la tua più grande paura nelle relazioni?",
    type: "text",
    required: true
  },
  {
    id: "conflict_reaction",
    question: "Come reagisci ai conflitti?",
    type: "single",
    options: ["Attacco (affronto direttamente)", "Chiusura (mi ritiro)", "Connessione (cerco dialogo)"],
    required: true
  },
  {
    id: "jealousy_reason",
    question: "Cosa si nasconde dietro i momenti di gelosia per te?",
    type: "text",
    required: true
  },
  {
    id: "false_yes",
    question: "Hai mai detto \"sì\" per paura di perdere qualcuno, ma volevi dire \"no\"?",
    type: "single",
    options: ["Sì, spesso", "Qualche volta", "Raramente", "Mai"],
    required: true
  },
  {
    id: "relationship_values",
    question: "Quali sono i tuoi valori non negoziabili in una relazione?",
    type: "multiple",
    options: ["Onestà", "Rispetto", "Comunicazione", "Fiducia", "Intimità", "Libertà", "Supporto", "Lealtà"],
    maxSelections: 3,
    required: true
  },
  {
    id: "healthy_relationship",
    question: "Che cos'è per te una relazione sana?",
    type: "text",
    required: true
  },
  {
    id: "boundary_setting",
    question: "Qual è il primo confine che potresti iniziare a mettere?",
    type: "text",
    required: true
  },
  {
    id: "emotional_drain",
    question: "Quando ti sei sentito/a svuotato/a in una relazione?",
    type: "text",
    required: true
  },
  {
    id: "self_worth",
    question: "Quando hai pensato di non valere nulla senza l'altro?",
    type: "text",
    required: true
  },
  {
    id: "self_love_action",
    question: "Qual è un gesto d'amore che puoi iniziare a fare ogni giorno per te stesso/a?",
    type: "text",
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
