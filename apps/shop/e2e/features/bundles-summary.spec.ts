import { expect, test } from '@playwright/test';
import { BUNDLES_SUMMARY_FEATURE } from '../../src/features/bundles/summary/bundles-summary.routes';
import { BUNDLES_SUMMARY_ITEM_COUNT } from '../../src/features/bundles/summary/bundles-summary.model';
import { padTo } from '../support/pacing';

test.describe('Bundles Summary', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(BUNDLES_SUMMARY_FEATURE.route);
    await expect(
      page.getByTestId(BUNDLES_SUMMARY_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${BUNDLES_SUMMARY_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(BUNDLES_SUMMARY_FEATURE.title);
    const rows = page.getByTestId(`${BUNDLES_SUMMARY_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(BUNDLES_SUMMARY_ITEM_COUNT);
    await padTo(startedAt);
  });
});
