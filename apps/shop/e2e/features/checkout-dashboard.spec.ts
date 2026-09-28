import { expect, test } from '@playwright/test';
import { CHECKOUT_DASHBOARD_FEATURE } from '../../src/features/checkout/dashboard/checkout-dashboard.routes';
import { CHECKOUT_DASHBOARD_ITEM_COUNT } from '../../src/features/checkout/dashboard/checkout-dashboard.model';
import { padTo } from '../support/pacing';

test.describe('Checkout Dashboard', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(CHECKOUT_DASHBOARD_FEATURE.route);
    await expect(
      page.getByTestId(CHECKOUT_DASHBOARD_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${CHECKOUT_DASHBOARD_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(CHECKOUT_DASHBOARD_FEATURE.title);
    const rows = page.getByTestId(`${CHECKOUT_DASHBOARD_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(CHECKOUT_DASHBOARD_ITEM_COUNT);
    await padTo(startedAt);
  });
});
