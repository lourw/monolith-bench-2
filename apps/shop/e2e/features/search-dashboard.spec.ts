import { expect, test } from '@playwright/test';
import { SEARCH_DASHBOARD_FEATURE } from '../../src/features/search/dashboard/search-dashboard.routes';
import { SEARCH_DASHBOARD_ITEM_COUNT } from '../../src/features/search/dashboard/search-dashboard.model';
import { padTo } from '../support/pacing';

test.describe('Search Dashboard', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(SEARCH_DASHBOARD_FEATURE.route);
    await expect(
      page.getByTestId(SEARCH_DASHBOARD_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${SEARCH_DASHBOARD_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(SEARCH_DASHBOARD_FEATURE.title);
    const rows = page.getByTestId(`${SEARCH_DASHBOARD_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(SEARCH_DASHBOARD_ITEM_COUNT);
    await padTo(startedAt);
  });
});
