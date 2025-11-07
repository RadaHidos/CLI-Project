import { createInterface } from "readline";
import { stdin as input, stdout as output } from "process";
import { QUESTIONS } from "./questions";
import {
  printQuestion,
  isValidChoice,
  checkAnswer,
  getPercentage,
} from "./quizLogic";
import { ChoiceId } from "./types";

const rl = createInterface({ input, output });

async function ask(
  rl: ReturnType<typeof createInterface>,
  question: string
): Promise<string> {
  return new Promise<string>((resolve) => rl.question(question, resolve));
}

export async function runQuiz(): Promise<void> {
  console.log(
    "Hello! Welcome to my Geography Quiz! You can only put A, B, C, D"
  );

  const quiz = QUESTIONS;
  let score = 0;

  for (let i = 0; i < quiz.length; i++) {
    const q = quiz[i];
    printQuestion(q, i, quiz.length);

    let choice = "";
    while (true) {
      choice = (await ask(rl, "Your answer: ")).trim().toUpperCase();
      if (isValidChoice(choice)) break;
      console.log("Try again: A, B, C, D?");
    }

    const correct = checkAnswer(choice as ChoiceId, q);

    if (correct) {
      score++;
      console.log(`✓ Correct answer! Bravo! Your score is ${score}`);
    } else {
      console.log(`✗ Wrong! Correct answer: ${q.correct}`);
    }
    console.log(`💡 ${q.explain}\n`);
  }

  const percentage = getPercentage(score, quiz.length);
  console.log("========================================");
  console.log(`Final Score: ${score}/${quiz.length} (${percentage}%)`);
  console.log("========================================");

  rl.close();
}

// Only run if this is the main module
if (require.main === module) {
  runQuiz();
}
