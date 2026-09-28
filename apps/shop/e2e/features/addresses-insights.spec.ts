import { expect, test } from '@playwright/test';
import { ADDRESSES_INSIGHTS_FEATURE } from '../../src/features/addresses/insights/addresses-insights.routes';
import { ADDRESSES_INSIGHTS_ITEM_COUNT } from '../../src/features/addresses/insights/addresses-insights.model';
import { padTo } from '../support/pacing';

test.describe('Addresses Insights', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(ADDRESSES_INSIGHTS_FEATURE.route);
    await expect(
      page.getByTestId(ADDRESSES_INSIGHTS_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${ADDRESSES_INSIGHTS_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(ADDRESSES_INSIGHTS_FEATURE.title);
    const rows = page.getByTestId(`${ADDRESSES_INSIGHTS_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(ADDRESSES_INSIGHTS_ITEM_COUNT);
    await padTo(startedAt);
  });
});
