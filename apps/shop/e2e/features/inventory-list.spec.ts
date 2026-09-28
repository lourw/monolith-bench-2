import { expect, test } from '@playwright/test';
import { INVENTORY_LIST_FEATURE } from '../../src/features/inventory/list/inventory-list.routes';
import { INVENTORY_LIST_ITEM_COUNT } from '../../src/features/inventory/list/inventory-list.model';
import { padTo } from '../support/pacing';

test.describe('Inventory List', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(INVENTORY_LIST_FEATURE.route);
    await expect(page.getByTestId(INVENTORY_LIST_FEATURE.testId)).toBeVisible();
    const heading = page
      .getByTestId(`${INVENTORY_LIST_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(INVENTORY_LIST_FEATURE.title);
    const rows = page.getByTestId(`${INVENTORY_LIST_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(INVENTORY_LIST_ITEM_COUNT);
    await padTo(startedAt);
  });
});
