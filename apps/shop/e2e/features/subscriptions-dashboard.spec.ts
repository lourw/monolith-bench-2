import { expect, test } from '@playwright/test';
import { SUBSCRIPTIONS_DASHBOARD_FEATURE } from '../../src/features/subscriptions/dashboard/subscriptions-dashboard.routes';
import { SUBSCRIPTIONS_DASHBOARD_ITEM_COUNT } from '../../src/features/subscriptions/dashboard/subscriptions-dashboard.model';
import { padTo } from '../support/pacing';

test.describe('Subscriptions Dashboard', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(SUBSCRIPTIONS_DASHBOARD_FEATURE.route);
    await expect(
      page.getByTestId(SUBSCRIPTIONS_DASHBOARD_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${SUBSCRIPTIONS_DASHBOARD_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(SUBSCRIPTIONS_DASHBOARD_FEATURE.title);
    const rows = page.getByTestId(
      `${SUBSCRIPTIONS_DASHBOARD_FEATURE.testId}-row`,
    );
    await expect(rows).toHaveCount(SUBSCRIPTIONS_DASHBOARD_ITEM_COUNT);
    await padTo(startedAt);
  });
});
