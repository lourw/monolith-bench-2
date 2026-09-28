import { expect, test } from '@playwright/test';
import { CATALOG_DASHBOARD_FEATURE } from '../../src/features/catalog/dashboard/catalog-dashboard.routes';
import { CATALOG_DASHBOARD_ITEM_COUNT } from '../../src/features/catalog/dashboard/catalog-dashboard.model';
import { padTo } from '../support/pacing';

test.describe('Catalog Dashboard', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(CATALOG_DASHBOARD_FEATURE.route);
    await expect(
      page.getByTestId(CATALOG_DASHBOARD_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${CATALOG_DASHBOARD_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(CATALOG_DASHBOARD_FEATURE.title);
    const rows = page.getByTestId(`${CATALOG_DASHBOARD_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(CATALOG_DASHBOARD_ITEM_COUNT);
    await padTo(startedAt);
  });
});
