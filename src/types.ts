export type ChoiceId = "A" | "B" | "C" | "D";

export interface Option {
  id: ChoiceId;
  text: string;
}

export interface Question {
  prompt: string;
  options: Option[];
  correct: ChoiceId;
  explain: string;
}
