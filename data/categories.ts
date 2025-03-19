export interface Task {
  id: string
  name: string
  objective: string
  question: string
  examples: string
  criteria: string[]
  notes?: string
}

export interface Category {
  id: string
  name: string
  tasks: Task[]
}

export const categories: Category[] = [
  {
    id: "J",
    name: "SINTASSI E GRAMMATICA",
    tasks: [
      {
        id: "J1",
        name: "Lunghezza media della risposta",
        objective: "Lo studente sarà in grado di parlare con sintagmi o frasi che contengano almeno 5 parole.",
        question: "Qual è la media di parole in un sintagma o in una frase che lo studente emette quando parla?",
        examples: "Il ragazzo sta andando a casa.",
        criteria: [
          "Non lo fa",
          "2 parole in sintagmi o frasi",
          "3 parole in sintagmi o frasi",
          "4 parole in sintagmi o frasi",
          "5 o più parole in sintagmi o frasi",
        ],
      },
      {
        id: "J2",
        name: "Sintassi (Ordine delle parole)",
        objective:
          "Lo studente sarà in grado di combinare parole in sintagmi o frasi seguendo il corretto ordine delle parole (ad esempio, articolo + sostantivo + aggettivo).",
        question:
          "Lo studente usa il corretto ordine delle parole quando parla con sintagmi o frasi (ad esempio, articolo + sostantivo + aggettivo)?",
        examples:
          "nome + aggettivo: palla rossa, cane rumoroso; nome + verbo: ragazzo sta correndo; articoli: il ragazzo sta correndo",
        criteria: [
          "Non lo fa",
          "Qualche volta sintagmi di 2 parole nel corretto ordine",
          "Qualche volta frasi con 3 parole nel corretto ordine",
          "Qualche volta frasi con 4 parole nel corretto ordine",
          "Frasi con 4 o più parole di solito nel corretto ordine",
        ],
      },
      {
        id: "J3",
        name: "Articoli",
        objective:
          "Lo studente sarà in grado di includere gli articoli (determinativi e indeterminativi), quando parla con sintagmi o frasi.",
        question: "Lo studente include articoli (determinativi e indeterminativi), quando parla con sintagmi o frasi?",
        examples: "Un cane, una mela, il maiale",
        criteria: [
          "Non lo fa",
          "Usa raramente gli articoli quando sono richiesti",
          "Usa gli articoli per la maggior parte delle volte in cui sono richiesti",
        ],
      },
      {
        id: "J4",
        name: "Forma Verbale: Presente Progressivo",
        objective:
          "Lo studente è in grado di coniugare i verbi nella forma progressiva utilizzando l'ausiliare essere più forma gerundica del verbo principale",
        question:
          "Lo studente è in grado di coniugare i verbi nella forma progressiva utilizzando l'ausiliare essere più forma gerundica del verbo principale?",
        examples: '"sto mangiando", "stai bevendo"',
        criteria: [
          "Non lo fa",
          "Aggiunge la forma gerundica al verbo principale alcune volte, quando appropriato",
          "Aggiunge la forma gerundica al verbo principale nella maggior parte delle espressioni, quando appropriato",
        ],
      },
      {
        id: "J5",
        name: "Plurali regolari",
        objective: "Lo studente formerà i plurali in maniera corretta (scarpe, occhiali)",
        question: "Lo studente forma i plurali in maniera corretta (scarpe, occhiali)?",
        examples: "cappelli, scarpe, tazze, cani, gatti, occhiali",
        criteria: [
          "Non lo fa",
          "Forma raramente i plurali quando richiesto",
          "Forma i plurali quando richiesto per la maggior parte delle volte",
        ],
      },
      {
        id: "J6",
        name: "Forma Verbale - Passato",
        objective: "Lo studente sarà in grado di indicare il tempo passato cambiando la forma dei verbi.",
        question: "Lo studente è in grado di cambiare la forma dei verbi per indicare il tempo passato?",
        examples: '"parlai", "ho saltato", "giocavamo".',
        criteria: [
          "Non lo fa",
          "Usa raramente il tempo passato dei verbi irregolari",
          "Usa correttamente il tempo passato dei verbi irregolari per la maggior parte delle volte",
        ],
      },
      {
        id: "J7",
        name: "Contrazioni",
        objective: "Lo studente sarà in grado di usare le contrazioni, quando parla con sintagmi o frasi.",
        question: "Lo studente usa le contrazioni, quando parla con sintagmi o frasi?",
        examples: "",
        criteria: [
          "Non lo fa",
          "Usa raramente contrazioni quando richieste",
          "Usa contrazioni per la maggior parte delle volte quando richieste",
        ],
        notes: "NOTA: Non applicabile alla lingua italiana",
      },
    ],
  },
  {
    id: "K",
    name: "ABILITA DI GIOCO E TEMPO LIBERO",
    tasks: [
      {
        id: "K1",
        name: "Esplorare i giocattoli nell'ambiente",
        objective: "Lo studente esplorerà attivamente una varietà di giocattoli nell'ambiente.",
        question: "Lo studente esplora attivamente i giocattoli disponibili nell'ambiente?",
        examples: "",
        criteria: [
          "Non lo fa",
          "Prende in mano e/o manipola almeno 1 giocattolo avendo a disposizione 10 minuti",
          "Manipola un giocattolo o dei giocattoli per almeno 2 minuti avendo a disposizione 10 minuti",
        ],
      },
      {
        id: "K2",
        name: "Permettere agli altri di manipolare/toccare i giocattoli",
        objective:
          "Lo studente sarà in grado di permettere agli adulti e ai bambini di stargli vicino quando sta giocando con giocattoli e occasionalmente permette agli altri di manipolare i giochi durante l'interazione.",
        question:
          "Lo studente permette che altri gli/le stiano vicino quando sta giocando con giocattoli e permette occasionalmente loro di toccare o spostare i giocattoli che sta usando?",
        examples: "",
        criteria: [
          "Non lo fa",
          "Permette ad altri studenti di stargli vicino mentre gioca con un giocattolo",
          "Permette ad altri studenti o adulti di manipolare occasionalmente i giocattoli che sta usando",
        ],
      },
      {
        id: "K3",
        name: "Attività solitarie all'aperto",
        objective:
          "Lo studente sarà in grado di intraprendere appropriate attività di gioco in solitudine, all'aperto.",
        question: "Lo studente intraprende appropriate attività di gioco all'aperto in solitudine?",
        examples: "Lanciare un pallone da basket, usare scivolo, altalene, bicicletta etc.",
        criteria: [
          "Non lo fa",
          "2 attività per 5 minuti",
          "2 attività per 10 minuti",
          "3 attività per 10 minuti",
          "Seleziona e intraprende almeno 3 attività per almeno 15 minuti",
        ],
      },
      {
        id: "K4",
        name: "Attività di svago solitarie al coperto",
        objective: "Lo studente sarà in grado di intraprendere appropriate attività solitarie di svago al coperto.",
        question: "Lo studente intraprende appropriate attività solitarie di svago al coperto?",
        examples: "guardare un libro o dei filmati, ascoltare la musica, completare puzzles",
        criteria: [
          "Non lo fa",
          "2 attività per 5 minuti",
          "2 attività per 10 minuti",
          "3 attività per 10 minuti",
          "Seleziona e intraprende almeno 3 attività per almeno 15 minuti",
        ],
      },
      {
        id: "K5",
        name: "Giocare con giocattoli/Manipolare giocattoli in maniera corretta",
        objective: "Lo studente giocherà attivamente con giocattoli in maniera corretta.",
        question: "Lo studente gioca attivamente con giocattoli?",
        examples: "",
        criteria: [
          "Non lo fa",
          "Gioca con almeno un giocattolo in maniera corretta fino a 10 minuti con aiuti occasionali",
          "Gioca con almeno 2 giocattoli in maniera corretta senza aiuti fino a 10 minuti",
        ],
      },
      {
        id: "K6",
        name: "Giocare da solo con i giocattoli e parlare mentre gioca",
        objective: "Lo studente parlerà mentre intraprende attività di gioco in solitudine",
        question: "Lo studente parla mentre gioca da solo?",
        examples: "",
        criteria: [
          "Non lo fa",
          "1 risposta verbale in un periodo di 20 minuti",
          "2 risposte verbali in un periodo di 20 minuti",
          "5 risposte verbali in un periodo di 20 minuti",
          "Mentre gioca da solo, intraprende almeno 10 risposte verbali in un periodo di 20 minuti",
        ],
      },
      {
        id: "K7",
        name: "Molteplici risposte con giocattoli relativi a un tema",
        objective:
          "Lo studente giocherà con giocattoli relativi ad un tema specifico (utensili da cucina, bambole, personaggi d'azione)",
        question: "Lo studente gioca con giocattoli (risposte multiple) relativi ad un tema specifico?",
        examples:
          "Muove un'automobile giù da una rampa, finge di fare benzina all'automobile, sposta la macchina nel garage. Finge di preparare la pizza per cena.",
        criteria: [
          "Non lo fa",
          "Fa spontaneamente almeno 2 attività correlate con 1 giocattolo",
          "Almeno 5 attività correlate con un giocattolo",
          "Almeno 5 attività con 2 giocattoli",
          "Fa spontaneamente almeno 5 attività con 5 giocattoli diversi",
        ],
      },
    ],
  },
]

// Funzione di ricerca per categoria
export function searchCategory(query: string): Category | undefined {
  query = query.toLowerCase()
  return categories.find(
    (category) => category.id.toLowerCase() === query || category.name.toLowerCase().includes(query),
  )
}

// Funzione di ricerca per compito
export function searchTask(query: string): Task | undefined {
  query = query.toLowerCase()
  for (const category of categories) {
    const task = category.tasks.find(
      (task) => task.id.toLowerCase() === query || task.name.toLowerCase().includes(query),
    )
    if (task) return task
  }
  return undefined
}

