import { expect, test } from '@playwright/test';
import { CART_LIST_FEATURE } from '../../src/features/cart/list/cart-list.routes';
import { CART_LIST_ITEM_COUNT } from '../../src/features/cart/list/cart-list.model';
import { padTo } from '../support/pacing';

test.describe('Cart List', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(CART_LIST_FEATURE.route);
    await expect(page.getByTestId(CART_LIST_FEATURE.testId)).toBeVisible();
    const heading = page
      .getByTestId(`${CART_LIST_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(CART_LIST_FEATURE.title);
    const rows = page.getByTestId(`${CART_LIST_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(CART_LIST_ITEM_COUNT);
    await padTo(startedAt);
  });
});
