import { expect, test } from '@playwright/test';
import { CATALOG_DETAILS_FEATURE } from '../../src/features/catalog/details/catalog-details.routes';
import { CATALOG_DETAILS_ITEM_COUNT } from '../../src/features/catalog/details/catalog-details.model';
import { padTo } from '../support/pacing';

test.describe('Catalog Details', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(CATALOG_DETAILS_FEATURE.route);
    await expect(
      page.getByTestId(CATALOG_DETAILS_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${CATALOG_DETAILS_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(CATALOG_DETAILS_FEATURE.title);
    const rows = page.getByTestId(`${CATALOG_DETAILS_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(CATALOG_DETAILS_ITEM_COUNT);
    await padTo(startedAt);
  });
});
