import { strict as assert } from "assert";

// Smoke Test 1: Types module
function testTypesModule() {
  console.log("Smoke test: types module...");
  const types = require("../types");
  assert.ok(types, "Types module should load");
  console.log("✓ Types module loads");
}

// Smoke Test 2: Questions module
function testQuestionsModule() {
  console.log("Smoke test: questions module...");
  const { QUESTIONS } = require("../questions");
  assert.ok(QUESTIONS, "QUESTIONS should be exported");
  assert.ok(Array.isArray(QUESTIONS), "QUESTIONS should be an array");
  assert.ok(QUESTIONS.length > 0, "QUESTIONS should not be empty");
  console.log(`✓ Questions module loads (${QUESTIONS.length} questions)`);
}

// Smoke Test 3: Quiz Logic module
function testQuizLogicModule() {
  console.log("Smoke test: quizLogic module...");
  const quizLogic = require("../quizLogic");
  assert.ok(quizLogic.isValidChoice, "isValidChoice should be exported");
  assert.ok(quizLogic.checkAnswer, "checkAnswer should be exported");
  assert.ok(quizLogic.calculateScore, "calculateScore should be exported");
  assert.ok(quizLogic.getPercentage, "getPercentage should be exported");
  assert.ok(quizLogic.printQuestion, "printQuestion should be exported");

  // Quick functionality check
  assert.equal(quizLogic.isValidChoice("A"), true, "isValidChoice should work");
  console.log("✓ Quiz logic module loads and works");
}

// Smoke Test 4: CLI module
function testCliModule() {
  console.log("Smoke test: cli module...");
  const cli = require("../cli");
  assert.ok(cli.runQuiz, "runQuiz should be exported");
  assert.equal(typeof cli.runQuiz, "function", "runQuiz should be a function");
  console.log("✓ CLI module loads");
}

// Smoke Test 5: Index module (re-exports)
function testIndexModule() {
  console.log("Smoke test: index module...");
  const index = require("../index");

  // Check that all main exports are available through index
  assert.ok(index.QUESTIONS, "QUESTIONS should be re-exported");
  assert.ok(index.isValidChoice, "isValidChoice should be re-exported");
  assert.ok(index.checkAnswer, "checkAnswer should be re-exported");
  assert.ok(index.runQuiz, "runQuiz should be re-exported");

  console.log("✓ Index module re-exports correctly");
}

// Smoke Test 6: Basic functionality check
function testBasicFunctionality() {
  console.log("Smoke test: basic functionality...");
  const { QUESTIONS, isValidChoice, checkAnswer } = require("../index");

  // Test with first question
  const firstQuestion = QUESTIONS[0];
  assert.ok(firstQuestion, "Should have at least one question");

  const isValid = isValidChoice(firstQuestion.correct);
  assert.equal(isValid, true, "Correct answer should be valid");

  const isCorrect = checkAnswer(firstQuestion.correct, firstQuestion);
  assert.equal(isCorrect, true, "Correct answer should be recognized");

  console.log("✓ Basic functionality works");
}

// Run all smoke tests
export function runSmokeTests() {
  console.log("========================================");
  console.log("Running Smoke Tests");
  console.log("========================================\n");

  try {
    testTypesModule();
    testQuestionsModule();
    testQuizLogicModule();
    testCliModule();
    testIndexModule();
    testBasicFunctionality();

    console.log("\n========================================");
    console.log("✓ All smoke tests passed!");
    console.log("========================================");
  } catch (error) {
    console.error("\n✗ Smoke test failed:", error);
    process.exit(1);
  }
}

// Run tests if this is the main module
if (require.main === module) {
  runSmokeTests();
}
