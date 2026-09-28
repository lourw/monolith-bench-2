import { expect, test } from '@playwright/test';
import { PROMOTIONS_DASHBOARD_FEATURE } from '../../src/features/promotions/dashboard/promotions-dashboard.routes';
import { PROMOTIONS_DASHBOARD_ITEM_COUNT } from '../../src/features/promotions/dashboard/promotions-dashboard.model';
import { padTo } from '../support/pacing';

test.describe('Promotions Dashboard', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(PROMOTIONS_DASHBOARD_FEATURE.route);
    await expect(
      page.getByTestId(PROMOTIONS_DASHBOARD_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${PROMOTIONS_DASHBOARD_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(PROMOTIONS_DASHBOARD_FEATURE.title);
    const rows = page.getByTestId(`${PROMOTIONS_DASHBOARD_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(PROMOTIONS_DASHBOARD_ITEM_COUNT);
    await padTo(startedAt);
  });
});
