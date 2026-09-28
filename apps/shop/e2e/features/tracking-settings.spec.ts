import { expect, test } from '@playwright/test';
import { TRACKING_SETTINGS_FEATURE } from '../../src/features/tracking/settings/tracking-settings.routes';
import { TRACKING_SETTINGS_ITEM_COUNT } from '../../src/features/tracking/settings/tracking-settings.model';
import { padTo } from '../support/pacing';

test.describe('Tracking Settings', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(TRACKING_SETTINGS_FEATURE.route);
    await expect(
      page.getByTestId(TRACKING_SETTINGS_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${TRACKING_SETTINGS_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(TRACKING_SETTINGS_FEATURE.title);
    const rows = page.getByTestId(`${TRACKING_SETTINGS_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(TRACKING_SETTINGS_ITEM_COUNT);
    await padTo(startedAt);
  });
});
