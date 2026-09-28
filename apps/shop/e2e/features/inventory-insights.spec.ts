import { expect, test } from '@playwright/test';
import { INVENTORY_INSIGHTS_FEATURE } from '../../src/features/inventory/insights/inventory-insights.routes';
import { INVENTORY_INSIGHTS_ITEM_COUNT } from '../../src/features/inventory/insights/inventory-insights.model';
import { padTo } from '../support/pacing';

test.describe('Inventory Insights', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(INVENTORY_INSIGHTS_FEATURE.route);
    await expect(
      page.getByTestId(INVENTORY_INSIGHTS_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${INVENTORY_INSIGHTS_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(INVENTORY_INSIGHTS_FEATURE.title);
    const rows = page.getByTestId(`${INVENTORY_INSIGHTS_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(INVENTORY_INSIGHTS_ITEM_COUNT);
    await padTo(startedAt);
  });
});
