import { strict as assert } from "assert";
import { QUESTIONS } from "../questions";
import {
  isValidChoice,
  checkAnswer,
  calculateScore,
  printQuestion,
} from "../quizLogic";
import { Question, ChoiceId } from "../types";

// Test: Complete quiz flow simulation
function testCompleteQuizFlow() {
  console.log("Testing complete quiz flow...");

  // Verify questions are loaded
  assert.ok(QUESTIONS.length > 0, "Questions should be loaded");

  // Simulate user taking the quiz with known answers
  const userAnswers: ChoiceId[] = [];
  let correctCount = 0;

  QUESTIONS.forEach((question, index) => {
    // Verify question structure
    assert.ok(question.prompt, "Question should have a prompt");
    assert.equal(question.options.length, 4, "Question should have 4 options");
    assert.ok(question.correct, "Question should have a correct answer");
    assert.ok(question.explain, "Question should have an explanation");

    // Verify correct answer is valid
    assert.ok(
      isValidChoice(question.correct),
      `Question ${index + 1} should have a valid correct answer`
    );

    // Simulate correct answer
    userAnswers.push(question.correct);
    const isCorrect = checkAnswer(question.correct, question);
    assert.equal(
      isCorrect,
      true,
      `Correct answer for question ${index + 1} should be recognized`
    );

    if (isCorrect) correctCount++;
  });

  // Calculate final score
  const finalScore = calculateScore(userAnswers, QUESTIONS);
  assert.equal(
    finalScore,
    QUESTIONS.length,
    "Perfect answers should give perfect score"
  );
  assert.equal(
    finalScore,
    correctCount,
    "Score calculation should match manual count"
  );

  console.log(
    `✓ Complete quiz flow test passed (${finalScore}/${QUESTIONS.length})`
  );
}

// Test: Question data integrity
function testQuestionDataIntegrity() {
  console.log("Testing question data integrity...");

  const seenPrompts = new Set<string>();
  const validChoices: ChoiceId[] = ["A", "B", "C", "D"];

  QUESTIONS.forEach((question, index) => {
    // Check for duplicate questions
    assert.ok(
      !seenPrompts.has(question.prompt),
      `Question ${index + 1} should be unique`
    );
    seenPrompts.add(question.prompt);

    // Verify all options have unique IDs
    const optionIds = question.options.map((opt) => opt.id);
    const uniqueIds = new Set(optionIds);
    assert.equal(
      uniqueIds.size,
      4,
      `Question ${index + 1} should have 4 unique option IDs`
    );

    // Verify option IDs are A, B, C, D
    validChoices.forEach((choice) => {
      assert.ok(
        optionIds.includes(choice),
        `Question ${index + 1} should have option ${choice}`
      );
    });

    // Verify correct answer exists in options
    const correctOption = question.options.find(
      (opt) => opt.id === question.correct
    );
    assert.ok(
      correctOption,
      `Question ${index + 1} correct answer should exist in options`
    );

    // Verify all option texts are non-empty
    question.options.forEach((option) => {
      assert.ok(
        option.text.trim().length > 0,
        `Question ${index + 1} option ${option.id} should have text`
      );
    });
  });

  console.log("✓ Question data integrity test passed");
}

// Test: Module exports and integration
function testModuleIntegration() {
  console.log("Testing module integration...");

  // Verify all required exports are available
  assert.ok(
    typeof isValidChoice === "function",
    "isValidChoice should be exported"
  );
  assert.ok(
    typeof checkAnswer === "function",
    "checkAnswer should be exported"
  );
  assert.ok(
    typeof calculateScore === "function",
    "calculateScore should be exported"
  );
  assert.ok(
    typeof printQuestion === "function",
    "printQuestion should be exported"
  );
  assert.ok(Array.isArray(QUESTIONS), "QUESTIONS should be exported as array");

  // Test that functions work together
  const testQuestion: Question = QUESTIONS[0];
  const validAnswer = testQuestion.correct;

  assert.ok(
    isValidChoice(validAnswer),
    "Correct answer from QUESTIONS should be valid"
  );
  assert.ok(
    checkAnswer(validAnswer, testQuestion),
    "checkAnswer should work with QUESTIONS data"
  );

  console.log("✓ Module integration test passed");
}

// Test: Edge cases
function testEdgeCases() {
  console.log("Testing edge cases...");

  // Test calculateScore with mismatched lengths
  const shortAnswers: ChoiceId[] = ["A", "B"];
  const result = calculateScore(shortAnswers, QUESTIONS);
  assert.ok(
    result >= 0 && result <= shortAnswers.length,
    "Score should handle mismatched array lengths"
  );

  // Test with empty question set
  const emptyScore = calculateScore([], []);
  assert.equal(emptyScore, 0, "Empty quiz should give score of 0");

  console.log("✓ Edge cases test passed");
}

// Run all integration tests
export function runIntegrationTests() {
  console.log("========================================");
  console.log("Running Integration Tests");
  console.log("========================================\n");

  try {
    testQuestionDataIntegrity();
    testModuleIntegration();
    testCompleteQuizFlow();
    testEdgeCases();

    console.log("\n========================================");
    console.log("✓ All integration tests passed!");
    console.log("========================================");
  } catch (error) {
    console.error("\n✗ Integration test failed:", error);
    process.exit(1);
  }
}

// Run tests if this is the main module
if (require.main === module) {
  runIntegrationTests();
}
