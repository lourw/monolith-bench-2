import { expect, test } from '@playwright/test';
import { ORDERS_LIST_FEATURE } from '../../src/features/orders/list/orders-list.routes';
import { ORDERS_LIST_ITEM_COUNT } from '../../src/features/orders/list/orders-list.model';
import { padTo } from '../support/pacing';

test.describe('Orders List', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(ORDERS_LIST_FEATURE.route);
    await expect(page.getByTestId(ORDERS_LIST_FEATURE.testId)).toBeVisible();
    const heading = page
      .getByTestId(`${ORDERS_LIST_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(ORDERS_LIST_FEATURE.title);
    const rows = page.getByTestId(`${ORDERS_LIST_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(ORDERS_LIST_ITEM_COUNT);
    await padTo(startedAt);
  });
});
