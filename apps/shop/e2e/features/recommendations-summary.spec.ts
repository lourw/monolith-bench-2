import { expect, test } from '@playwright/test';
import { RECOMMENDATIONS_SUMMARY_FEATURE } from '../../src/features/recommendations/summary/recommendations-summary.routes';
import { RECOMMENDATIONS_SUMMARY_ITEM_COUNT } from '../../src/features/recommendations/summary/recommendations-summary.model';
import { padTo } from '../support/pacing';

test.describe('Recommendations Summary', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(RECOMMENDATIONS_SUMMARY_FEATURE.route);
    await expect(
      page.getByTestId(RECOMMENDATIONS_SUMMARY_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${RECOMMENDATIONS_SUMMARY_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(RECOMMENDATIONS_SUMMARY_FEATURE.title);
    const rows = page.getByTestId(
      `${RECOMMENDATIONS_SUMMARY_FEATURE.testId}-row`,
    );
    await expect(rows).toHaveCount(RECOMMENDATIONS_SUMMARY_ITEM_COUNT);
    await padTo(startedAt);
  });
});
