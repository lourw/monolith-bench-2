import { expect, test } from '@playwright/test';
import { RETURNS_DASHBOARD_FEATURE } from '../../src/features/returns/dashboard/returns-dashboard.routes';
import { RETURNS_DASHBOARD_ITEM_COUNT } from '../../src/features/returns/dashboard/returns-dashboard.model';
import { padTo } from '../support/pacing';

test.describe('Returns Dashboard', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(RETURNS_DASHBOARD_FEATURE.route);
    await expect(
      page.getByTestId(RETURNS_DASHBOARD_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${RETURNS_DASHBOARD_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(RETURNS_DASHBOARD_FEATURE.title);
    const rows = page.getByTestId(`${RETURNS_DASHBOARD_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(RETURNS_DASHBOARD_ITEM_COUNT);
    await padTo(startedAt);
  });
});
