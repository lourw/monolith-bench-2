import { expect, test } from '@playwright/test';
import { STORE_LOCATOR_DASHBOARD_FEATURE } from '../../src/features/store-locator/dashboard/store-locator-dashboard.routes';
import { STORE_LOCATOR_DASHBOARD_ITEM_COUNT } from '../../src/features/store-locator/dashboard/store-locator-dashboard.model';
import { padTo } from '../support/pacing';

test.describe('Store Locator Dashboard', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(STORE_LOCATOR_DASHBOARD_FEATURE.route);
    await expect(
      page.getByTestId(STORE_LOCATOR_DASHBOARD_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${STORE_LOCATOR_DASHBOARD_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(STORE_LOCATOR_DASHBOARD_FEATURE.title);
    const rows = page.getByTestId(
      `${STORE_LOCATOR_DASHBOARD_FEATURE.testId}-row`,
    );
    await expect(rows).toHaveCount(STORE_LOCATOR_DASHBOARD_ITEM_COUNT);
    await padTo(startedAt);
  });
});
