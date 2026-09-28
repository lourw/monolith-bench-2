import { expect, test } from '@playwright/test';
import { PAYMENTS_DASHBOARD_FEATURE } from '../../src/features/payments/dashboard/payments-dashboard.routes';
import { PAYMENTS_DASHBOARD_ITEM_COUNT } from '../../src/features/payments/dashboard/payments-dashboard.model';
import { padTo } from '../support/pacing';

test.describe('Payments Dashboard', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(PAYMENTS_DASHBOARD_FEATURE.route);
    await expect(
      page.getByTestId(PAYMENTS_DASHBOARD_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${PAYMENTS_DASHBOARD_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(PAYMENTS_DASHBOARD_FEATURE.title);
    const rows = page.getByTestId(`${PAYMENTS_DASHBOARD_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(PAYMENTS_DASHBOARD_ITEM_COUNT);
    await padTo(startedAt);
  });
});
