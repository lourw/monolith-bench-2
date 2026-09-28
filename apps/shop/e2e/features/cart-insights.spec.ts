import { expect, test } from '@playwright/test';
import { CART_INSIGHTS_FEATURE } from '../../src/features/cart/insights/cart-insights.routes';
import { CART_INSIGHTS_ITEM_COUNT } from '../../src/features/cart/insights/cart-insights.model';
import { padTo } from '../support/pacing';

test.describe('Cart Insights', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(CART_INSIGHTS_FEATURE.route);
    await expect(page.getByTestId(CART_INSIGHTS_FEATURE.testId)).toBeVisible();
    const heading = page
      .getByTestId(`${CART_INSIGHTS_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(CART_INSIGHTS_FEATURE.title);
    const rows = page.getByTestId(`${CART_INSIGHTS_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(CART_INSIGHTS_ITEM_COUNT);
    await padTo(startedAt);
  });
});
