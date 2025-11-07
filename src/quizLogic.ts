import { Question, ChoiceId } from "./types";

export function printQuestion(q: Question, idx: number, total: number): void {
  console.log(`\nQ${idx + 1}/${total}: ${q.prompt}`);
  for (const option of q.options) {
    console.log(`${option.id}: ${option.text}`);
  }
}

export function isValidChoice(userInput: string): userInput is ChoiceId {
  return ["A", "B", "C", "D"].includes(userInput.toUpperCase());
}

export function checkAnswer(userChoice: ChoiceId, question: Question): boolean {
  return userChoice === question.correct;
}

export function calculateScore(
  answers: ChoiceId[],
  questions: Question[]
): number {
  return answers.reduce((score, answer, index) => {
    return score + (answer === questions[index].correct ? 1 : 0);
  }, 0);
}

export function getPercentage(score: number, total: number): number {
  return Math.round((score / total) * 100);
}
