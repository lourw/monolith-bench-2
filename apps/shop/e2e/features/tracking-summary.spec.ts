import { expect, test } from '@playwright/test';
import { TRACKING_SUMMARY_FEATURE } from '../../src/features/tracking/summary/tracking-summary.routes';
import { TRACKING_SUMMARY_ITEM_COUNT } from '../../src/features/tracking/summary/tracking-summary.model';
import { padTo } from '../support/pacing';

test.describe('Tracking Summary', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(TRACKING_SUMMARY_FEATURE.route);
    await expect(
      page.getByTestId(TRACKING_SUMMARY_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${TRACKING_SUMMARY_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(TRACKING_SUMMARY_FEATURE.title);
    const rows = page.getByTestId(`${TRACKING_SUMMARY_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(TRACKING_SUMMARY_ITEM_COUNT);
    await padTo(startedAt);
  });
});
