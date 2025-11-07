import { strict as assert } from "assert";
import {
  isValidChoice,
  checkAnswer,
  calculateScore,
  getPercentage,
} from "../quizLogic";
import { Question, ChoiceId } from "../types";

// Test helper: create a mock question
function createMockQuestion(correct: ChoiceId): Question {
  return {
    prompt: "Test question?",
    options: [
      { id: "A", text: "Option A" },
      { id: "B", text: "Option B" },
      { id: "C", text: "Option C" },
      { id: "D", text: "Option D" },
    ],
    correct,
    explain: "Test explanation",
  };
}

// Test Suite: isValidChoice
function testIsValidChoice() {
  console.log("Testing isValidChoice...");

  // Valid choices
  assert.equal(isValidChoice("A"), true, "A should be valid");
  assert.equal(isValidChoice("B"), true, "B should be valid");
  assert.equal(isValidChoice("C"), true, "C should be valid");
  assert.equal(isValidChoice("D"), true, "D should be valid");
  assert.equal(isValidChoice("a"), true, "lowercase a should be valid");
  assert.equal(isValidChoice("d"), true, "lowercase d should be valid");

  // Invalid choices
  assert.equal(isValidChoice("E"), false, "E should be invalid");
  assert.equal(isValidChoice("1"), false, "1 should be invalid");
  assert.equal(isValidChoice(""), false, "empty string should be invalid");
  assert.equal(isValidChoice("AB"), false, "AB should be invalid");
  assert.equal(isValidChoice(" A "), false, "' A ' should be invalid");

  console.log("✓ All isValidChoice tests passed");
}

// Test Suite: checkAnswer
function testCheckAnswer() {
  console.log("Testing checkAnswer...");

  const question = createMockQuestion("B");

  assert.equal(
    checkAnswer("A", question),
    false,
    "Wrong answer should return false"
  );
  assert.equal(
    checkAnswer("B", question),
    true,
    "Correct answer should return true"
  );
  assert.equal(
    checkAnswer("C", question),
    false,
    "Wrong answer should return false"
  );
  assert.equal(
    checkAnswer("D", question),
    false,
    "Wrong answer should return false"
  );

  console.log("✓ All checkAnswer tests passed");
}

// Test Suite: calculateScore
function testCalculateScore() {
  console.log("Testing calculateScore...");

  const questions: Question[] = [
    createMockQuestion("A"),
    createMockQuestion("B"),
    createMockQuestion("C"),
    createMockQuestion("D"),
  ];

  // All correct
  let answers: ChoiceId[] = ["A", "B", "C", "D"];
  assert.equal(
    calculateScore(answers, questions),
    4,
    "All correct answers should give full score"
  );

  // All wrong
  answers = ["B", "C", "D", "A"];
  assert.equal(
    calculateScore(answers, questions),
    0,
    "All wrong answers should give 0"
  );

  // Mixed
  answers = ["A", "C", "C", "A"];
  assert.equal(
    calculateScore(answers, questions),
    2,
    "2 correct answers should give score of 2"
  );

  // Empty
  assert.equal(
    calculateScore([], []),
    0,
    "Empty arrays should give score of 0"
  );

  console.log("✓ All calculateScore tests passed");
}

// Test Suite: getPercentage
function testGetPercentage() {
  console.log("Testing getPercentage...");

  assert.equal(getPercentage(10, 10), 100, "10/10 should be 100%");
  assert.equal(getPercentage(0, 10), 0, "0/10 should be 0%");
  assert.equal(getPercentage(5, 10), 50, "5/10 should be 50%");
  assert.equal(getPercentage(7, 10), 70, "7/10 should be 70%");
  assert.equal(getPercentage(3, 10), 30, "3/10 should be 30%");
  assert.equal(getPercentage(1, 3), 33, "1/3 should be 33% (rounded)");

  console.log("✓ All getPercentage tests passed");
}

// Run all tests
export function runAllTests() {
  console.log("========================================");
  console.log("Running Unit Tests for Quiz Logic");
  console.log("========================================\n");

  try {
    testIsValidChoice();
    testCheckAnswer();
    testCalculateScore();
    testGetPercentage();

    console.log("\n========================================");
    console.log("✓ All unit tests passed!");
    console.log("========================================");
  } catch (error) {
    console.error("\n✗ Test failed:", error);
    process.exit(1);
  }
}

// Run tests if this is the main module
if (require.main === module) {
  runAllTests();
}
