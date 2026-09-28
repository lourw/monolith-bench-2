import { expect, test } from '@playwright/test';
import { ORDERS_OVERVIEW_FEATURE } from '../../src/features/orders/overview/orders-overview.routes';
import { ORDERS_OVERVIEW_ITEM_COUNT } from '../../src/features/orders/overview/orders-overview.model';
import { padTo } from '../support/pacing';

test.describe('Orders Overview', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(ORDERS_OVERVIEW_FEATURE.route);
    await expect(
      page.getByTestId(ORDERS_OVERVIEW_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${ORDERS_OVERVIEW_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(ORDERS_OVERVIEW_FEATURE.title);
    const rows = page.getByTestId(`${ORDERS_OVERVIEW_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(ORDERS_OVERVIEW_ITEM_COUNT);
    await padTo(startedAt);
  });
});
