/**
 * Per-test pacing for the generated e2e specs.
 *
 * Each test waits until E2E_TEST_DURATION_MS (25s) has elapsed since it started
 * and burns E2E_TEST_CPU_SECONDS (2s) of compute, interleaved over
 * E2E_TEST_BLOCKS (10) rounds. The wait budget is measured once, before any
 * burning, so the compute time stays additive and a fast machine cannot absorb
 * its own saving. Set both budgets to 0 to run at full speed.
 */
export const DEFAULT_E2E_TEST_DURATION_MS = 25_000;
export const DEFAULT_E2E_TEST_CPU_SECONDS = 2;
export const DEFAULT_E2E_TEST_BLOCKS = 10;

/** Keep in sync with UNITS_PER_SECOND in tools/test-delay/burn.mjs. */
export const UNITS_PER_SECOND = 150_000_000;

function envNumber(name: string, fallback: number): number {
  const raw = process.env[name];
  if (raw === undefined || raw === '') {
    return fallback;
  }
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

export function e2eTestDurationMs(): number {
  return envNumber('E2E_TEST_DURATION_MS', DEFAULT_E2E_TEST_DURATION_MS);
}

export function e2eTestCpuSeconds(): number {
  return envNumber('E2E_TEST_CPU_SECONDS', DEFAULT_E2E_TEST_CPU_SECONDS);
}

/**
 * Mirrors burnCpu() in tools/test-delay/burn.mjs. Duplicated so the e2e project
 * typechecks without reaching outside its own rootDir.
 */
export function burnCpu(units: number): number {
  let a = 1;
  let b = 0x9e3779b9;
  for (let i = 0; i < units; i++) {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a ^ (a >>> 15);
    t = Math.imul(t, 1 | a) >>> 0;
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) >>> 0;
    b = (b ^ (t ^ (t >>> 14))) >>> 0;
  }
  return b;
}

function sleep(ms: number): Promise<void> {
  return ms > 0
    ? new Promise((resolve) => setTimeout(resolve, ms))
    : Promise.resolve();
}

/** Spend the remaining wait budget and the compute budget in alternating blocks. */
export async function padTo(startedAt: number): Promise<void> {
  const blocks = Math.max(
    1,
    Math.round(envNumber('E2E_TEST_BLOCKS', DEFAULT_E2E_TEST_BLOCKS)),
  );

  const remaining = startedAt + e2eTestDurationMs() - Date.now();
  const sleepPerBlock = remaining > 0 ? remaining / blocks : 0;

  const totalUnits = Math.round(
    e2eTestCpuSeconds() * envNumber('E2E_UNITS_PER_SECOND', UNITS_PER_SECOND),
  );
  const unitsPerBlock = Math.round(totalUnits / blocks);

  for (let i = 0; i < blocks; i++) {
    if (unitsPerBlock > 0) {
      burnCpu(unitsPerBlock);
    }
    await sleep(sleepPerBlock);
  }
}
