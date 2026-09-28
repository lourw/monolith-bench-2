import { expect, test } from '@playwright/test';
import { NOTIFICATIONS_DASHBOARD_FEATURE } from '../../src/features/notifications/dashboard/notifications-dashboard.routes';
import { NOTIFICATIONS_DASHBOARD_ITEM_COUNT } from '../../src/features/notifications/dashboard/notifications-dashboard.model';
import { padTo } from '../support/pacing';

test.describe('Notifications Dashboard', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(NOTIFICATIONS_DASHBOARD_FEATURE.route);
    await expect(
      page.getByTestId(NOTIFICATIONS_DASHBOARD_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${NOTIFICATIONS_DASHBOARD_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(NOTIFICATIONS_DASHBOARD_FEATURE.title);
    const rows = page.getByTestId(
      `${NOTIFICATIONS_DASHBOARD_FEATURE.testId}-row`,
    );
    await expect(rows).toHaveCount(NOTIFICATIONS_DASHBOARD_ITEM_COUNT);
    await padTo(startedAt);
  });
});
