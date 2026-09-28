import { expect, test } from '@playwright/test';
import { CART_OVERVIEW_FEATURE } from '../../src/features/cart/overview/cart-overview.routes';
import { CART_OVERVIEW_ITEM_COUNT } from '../../src/features/cart/overview/cart-overview.model';
import { padTo } from '../support/pacing';

test.describe('Cart Overview', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(CART_OVERVIEW_FEATURE.route);
    await expect(page.getByTestId(CART_OVERVIEW_FEATURE.testId)).toBeVisible();
    const heading = page
      .getByTestId(`${CART_OVERVIEW_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(CART_OVERVIEW_FEATURE.title);
    const rows = page.getByTestId(`${CART_OVERVIEW_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(CART_OVERVIEW_ITEM_COUNT);
    await padTo(startedAt);
  });
});
