#!/usr/bin/env node
/**
 * Simulated validation check for the benchmark.
 *
 * It does no real work: it runs for the requested number of minutes, logging
 * progress every 30 seconds so CI shows the task is alive, then exits 0.
 *
 * Usage: node tools/validation/simulate-validation.mjs <name> <minutes>
 */
const [name = 'validation', minutesArg = '1'] = process.argv.slice(2);
const minutes = Number(minutesArg);
if (!Number.isFinite(minutes) || minutes <= 0) {
  console.error(`invalid duration: ${minutesArg}`);
  process.exit(1);
}

const totalMs = minutes * 60_000;
const tickMs = 30_000;
const start = Date.now();

console.log(`[${name}] starting simulated validation (${minutes} min)`);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let elapsed = 0;
while (elapsed < totalMs) {
  const step = Math.min(tickMs, totalMs - elapsed);
  await sleep(step);
  elapsed = Date.now() - start;
  const pct = Math.min(100, Math.round((elapsed / totalMs) * 100));
  console.log(`[${name}] ${pct}% (${Math.round(elapsed / 1000)}s elapsed)`);
}

console.log(`[${name}] passed in ${Math.round((Date.now() - start) / 1000)}s`);
