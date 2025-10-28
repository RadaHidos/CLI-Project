import { createInterface } from "readline";
import { stdin as input, stdout as output } from "process";

type ChoiceId = "A" | "B" | "C" | "D";

interface Option {
  id: ChoiceId;
  text: string;
}

interface Question {
  prompt: string;
  options: Option[];
  correct: ChoiceId;
  explain: string;
}

const QUESTIONS: Question[] = [
  {
    prompt: "What is the capital of Australia?",
    options: [
      { id: "A", text: "Sydney" },
      { id: "B", text: "Melbourne" },
      { id: "C", text: "Canberra" },
      { id: "D", text: "Perth" },
    ],
    correct: "C",
    explain:
      "Canberra was chosen as a compromise between Sydney and Melbourne.",
  },
  {
    prompt: "Which river is the longest in the world by length (most cited)?",
    options: [
      { id: "A", text: "Nile" },
      { id: "B", text: "Amazon" },
      { id: "C", text: "Yangtze" },
      { id: "D", text: "Mississippi–Missouri" },
    ],
    correct: "A",
    explain:
      "Nile vs. Amazon is debated, but Nile is most commonly cited in textbooks.",
  },
  {
    prompt: "Which country has the most natural lakes?",
    options: [
      { id: "A", text: "Canada" },
      { id: "B", text: "Finland" },
      { id: "C", text: "Russia" },
      { id: "D", text: "United States" },
    ],
    correct: "A",
    explain: "Canada has more than half of the world’s natural lakes.",
  },
  {
    prompt: "Mount Kilimanjaro is in which country?",
    options: [
      { id: "A", text: "Kenya" },
      { id: "B", text: "Tanzania" },
      { id: "C", text: "Uganda" },
      { id: "D", text: "Ethiopia" },
    ],
    correct: "B",
    explain: "Kilimanjaro is in northern Tanzania, near the Kenyan border.",
  },
  {
    prompt: "Which desert is the largest hot desert?",
    options: [
      { id: "A", text: "Gobi" },
      { id: "B", text: "Kalahari" },
      { id: "C", text: "Sahara" },
      { id: "D", text: "Arabian" },
    ],
    correct: "C",
    explain:
      "Sahara is the largest hot desert (Antarctica and Arctic are cold deserts).",
  },
  {
    prompt: "Which sea separates Europe and Africa?",
    options: [
      { id: "A", text: "Baltic Sea" },
      { id: "B", text: "Mediterranean Sea" },
      { id: "C", text: "Black Sea" },
      { id: "D", text: "Red Sea" },
    ],
    correct: "B",
    explain:
      "The Mediterranean lies between southern Europe and northern Africa.",
  },
  {
    prompt: "Which country does NOT border Germany?",
    options: [
      { id: "A", text: "Denmark" },
      { id: "B", text: "Netherlands" },
      { id: "C", text: "Ukraine" },
      { id: "D", text: "Czechia" },
    ],
    correct: "C",
    explain: "Germany borders 9 countries; Ukraine is not one of them.",
  },
  {
    prompt: "What is the smallest country in the world by area?",
    options: [
      { id: "A", text: "Monaco" },
      { id: "B", text: "Vatican City" },
      { id: "C", text: "Nauru" },
      { id: "D", text: "San Marino" },
    ],
    correct: "B",
    explain: "Vatican City is ~0.49 km², the smallest by area and population.",
  },
  {
    prompt: "Which city is furthest south?",
    options: [
      { id: "A", text: "Cape Town" },
      { id: "B", text: "Buenos Aires" },
      { id: "C", text: "Sydney" },
      { id: "D", text: "Auckland" },
    ],
    correct: "D",
    explain:
      "Auckland (~37°S) is further south than Sydney (~34°S), Cape Town (~34°S), Buenos Aires (~34.6°S).",
  },
  {
    prompt: "Which country has the largest population?",
    options: [
      { id: "A", text: "United States" },
      { id: "B", text: "India" },
      { id: "C", text: "China" },
      { id: "D", text: "Indonesia" },
    ],
    correct: "B",
    explain: "As of mid-2020s, India slightly exceeds China in population.",
  },
];

function printQuestions(q: Question, idx: number, total: number) {
  console.log(` \nQ${idx + 1}/${total} : ${q.prompt}`);
  for (const option of q.options) console.log(`${option.id}: ${option.text}`);
}

// printQuestions(  {
//     prompt: "Which country has the largest population?",
//     options: [
//       { id: "A", text: "United States" },
//       { id: "B", text: "India" },
//       { id: "C", text: "China" },
//       { id: "D", text: "Indonesia" }
//     ],
//     correct: "B",
//     explain: "As of mid-2020s, India slightly exceeds China in population."
//   } , 1 , 1)

function isCheckId(userInput: string): userInput is ChoiceId {
  return ["A", "B", "C", "D"].includes(userInput.toUpperCase());
}

const rl = createInterface({ input, output });

async function ask(rl: ReturnType<typeof createInterface>, q: string) {
  return new Promise<string>((resolve) => rl.question(q, resolve));
}

async function main() {
  const quiz = QUESTIONS;
  let score = 0;
  for (let i = 0; i < quiz.length; i++) {
    const q = quiz[i];
    printQuestions(q, i, quiz.length);

    let choice = "";
    while (true) {
      choice = (await ask(rl, "Your answer:")).trim().toUpperCase();
      if (isCheckId(choice)) break;
      console.log("Try again: A, B, C, D?");
    }

    const correct = choice === q.correct;

    if (correct) {
      score++;
      console.log(`Correct answer! Bravo! Your score is ${score}`);
    } else {
      console.log(`Wrong! Corect answer: ${q.correct}`);
    }
    console.log(q.explain);
  }
  rl.close();
}

main();
