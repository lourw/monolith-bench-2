import { expect, test } from '@playwright/test';
import { CART_HISTORY_FEATURE } from '../../src/features/cart/history/cart-history.routes';
import { CART_HISTORY_ITEM_COUNT } from '../../src/features/cart/history/cart-history.model';
import { padTo } from '../support/pacing';

test.describe('Cart History', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(CART_HISTORY_FEATURE.route);
    await expect(page.getByTestId(CART_HISTORY_FEATURE.testId)).toBeVisible();
    const heading = page
      .getByTestId(`${CART_HISTORY_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(CART_HISTORY_FEATURE.title);
    const rows = page.getByTestId(`${CART_HISTORY_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(CART_HISTORY_ITEM_COUNT);
    await padTo(startedAt);
  });
});
