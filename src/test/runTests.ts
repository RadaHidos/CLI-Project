import { runSmokeTests } from "./smoke.test";
import { runAllTests } from "./quizLogic.test";
import { runIntegrationTests } from "./integration.test";

async function runAllTestSuites() {
  console.log("\n");
  console.log("╔════════════════════════════════════════╗");
  console.log("║   Geography Quiz - Test Suite Runner  ║");
  console.log("╚════════════════════════════════════════╝");
  console.log("\n");

  const startTime = Date.now();
  let allPassed = true;

  try {
    // Run smoke tests first (basic module loading)
    console.log("📋 Phase 1: Smoke Tests\n");
    runSmokeTests();
    console.log("\n");

    // Run unit tests (individual functions)
    console.log("📋 Phase 2: Unit Tests\n");
    runAllTests();
    console.log("\n");

    // Run integration tests (modules working together)
    console.log("📋 Phase 3: Integration Tests\n");
    runIntegrationTests();
    console.log("\n");

    const endTime = Date.now();
    const duration = endTime - startTime;

    console.log("╔════════════════════════════════════════╗");
    console.log("║        TEST SUITE SUMMARY              ║");
    console.log("╚════════════════════════════════════════╝");
    console.log(`✓ All test phases completed successfully`);
    console.log(`⏱️  Total time: ${duration}ms`);
    console.log(`✅ Status: PASSED\n`);
  } catch (error) {
    allPassed = false;
    const endTime = Date.now();
    const duration = endTime - startTime;

    console.log("\n╔════════════════════════════════════════╗");
    console.log("║        TEST SUITE SUMMARY              ║");
    console.log("╚════════════════════════════════════════╝");
    console.log(`✗ Test suite failed`);
    console.log(`⏱️  Total time: ${duration}ms`);
    console.log(`❌ Status: FAILED`);
    console.log(`\nError: ${error}\n`);
    process.exit(1);
  }
}

// Run all tests
if (require.main === module) {
  runAllTestSuites();
}
