/**
 * Vitest setup, evaluated once per spec file.
 *
 * Each file costs UNIT_TEST_CPU_SECONDS (5s) of compute plus UNIT_TEST_SLEEP_MS
 * (7.3s) of wait, interleaved over UNIT_TEST_BLOCKS (10) rounds so the shape
 * resembles a real run alternating between CPU work and I/O. Set both budgets
 * to 0 to run at full speed.
 */
import { burnCpu, envNumber, sleep, UNITS_PER_SECOND } from './burn.mjs';

const cpuSeconds = envNumber('UNIT_TEST_CPU_SECONDS', 5);
const sleepMs = envNumber('UNIT_TEST_SLEEP_MS', 7_300);
const unitsPerSecond = envNumber(
  'UNIT_TEST_UNITS_PER_SECOND',
  UNITS_PER_SECOND,
);
const blocks = Math.max(1, Math.round(envNumber('UNIT_TEST_BLOCKS', 10)));

const unitsPerBlock = Math.round((cpuSeconds * unitsPerSecond) / blocks);
const sleepPerBlock = sleepMs / blocks;
const startedAt = Date.now();

for (let i = 0; i < blocks; i++) {
  if (unitsPerBlock > 0) {
    burnCpu(unitsPerBlock);
  }
  await sleep(sleepPerBlock);
}

if (process.env['UNIT_TEST_CPU_REPORT']) {
  console.log(
    `[test-delay] ${blocks} x (${unitsPerBlock.toLocaleString()} units + ` +
      `${sleepPerBlock.toFixed(0)}ms) took ${(
        (Date.now() - startedAt) /
        1000
      ).toFixed(2)}s`,
  );
}
