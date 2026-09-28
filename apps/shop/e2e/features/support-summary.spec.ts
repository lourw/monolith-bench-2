import { expect, test } from '@playwright/test';
import { SUPPORT_SUMMARY_FEATURE } from '../../src/features/support/summary/support-summary.routes';
import { SUPPORT_SUMMARY_ITEM_COUNT } from '../../src/features/support/summary/support-summary.model';
import { padTo } from '../support/pacing';

test.describe('Support Summary', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(SUPPORT_SUMMARY_FEATURE.route);
    await expect(
      page.getByTestId(SUPPORT_SUMMARY_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${SUPPORT_SUMMARY_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(SUPPORT_SUMMARY_FEATURE.title);
    const rows = page.getByTestId(`${SUPPORT_SUMMARY_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(SUPPORT_SUMMARY_ITEM_COUNT);
    await padTo(startedAt);
  });
});
