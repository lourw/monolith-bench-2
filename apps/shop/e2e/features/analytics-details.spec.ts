import { expect, test } from '@playwright/test';
import { ANALYTICS_DETAILS_FEATURE } from '../../src/features/analytics/details/analytics-details.routes';
import { ANALYTICS_DETAILS_ITEM_COUNT } from '../../src/features/analytics/details/analytics-details.model';
import { padTo } from '../support/pacing';

test.describe('Analytics Details', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(ANALYTICS_DETAILS_FEATURE.route);
    await expect(
      page.getByTestId(ANALYTICS_DETAILS_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${ANALYTICS_DETAILS_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(ANALYTICS_DETAILS_FEATURE.title);
    const rows = page.getByTestId(`${ANALYTICS_DETAILS_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(ANALYTICS_DETAILS_ITEM_COUNT);
    await padTo(startedAt);
  });
});
