import { expect, test } from '@playwright/test';
import { ORDERS_HISTORY_FEATURE } from '../../src/features/orders/history/orders-history.routes';
import { ORDERS_HISTORY_ITEM_COUNT } from '../../src/features/orders/history/orders-history.model';
import { padTo } from '../support/pacing';

test.describe('Orders History', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(ORDERS_HISTORY_FEATURE.route);
    await expect(page.getByTestId(ORDERS_HISTORY_FEATURE.testId)).toBeVisible();
    const heading = page
      .getByTestId(`${ORDERS_HISTORY_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(ORDERS_HISTORY_FEATURE.title);
    const rows = page.getByTestId(`${ORDERS_HISTORY_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(ORDERS_HISTORY_ITEM_COUNT);
    await padTo(startedAt);
  });
});
