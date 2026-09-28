import { expect, test } from '@playwright/test';
import { INVENTORY_HISTORY_FEATURE } from '../../src/features/inventory/history/inventory-history.routes';
import { INVENTORY_HISTORY_ITEM_COUNT } from '../../src/features/inventory/history/inventory-history.model';
import { padTo } from '../support/pacing';

test.describe('Inventory History', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(INVENTORY_HISTORY_FEATURE.route);
    await expect(
      page.getByTestId(INVENTORY_HISTORY_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${INVENTORY_HISTORY_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(INVENTORY_HISTORY_FEATURE.title);
    const rows = page.getByTestId(`${INVENTORY_HISTORY_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(INVENTORY_HISTORY_ITEM_COUNT);
    await padTo(startedAt);
  });
});
