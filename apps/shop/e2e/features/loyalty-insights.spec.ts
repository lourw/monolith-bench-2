import { expect, test } from '@playwright/test';
import { LOYALTY_INSIGHTS_FEATURE } from '../../src/features/loyalty/insights/loyalty-insights.routes';
import { LOYALTY_INSIGHTS_ITEM_COUNT } from '../../src/features/loyalty/insights/loyalty-insights.model';
import { padTo } from '../support/pacing';

test.describe('Loyalty Insights', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(LOYALTY_INSIGHTS_FEATURE.route);
    await expect(
      page.getByTestId(LOYALTY_INSIGHTS_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${LOYALTY_INSIGHTS_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(LOYALTY_INSIGHTS_FEATURE.title);
    const rows = page.getByTestId(`${LOYALTY_INSIGHTS_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(LOYALTY_INSIGHTS_ITEM_COUNT);
    await padTo(startedAt);
  });
});
