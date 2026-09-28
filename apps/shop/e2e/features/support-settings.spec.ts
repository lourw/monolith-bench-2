import { expect, test } from '@playwright/test';
import { SUPPORT_SETTINGS_FEATURE } from '../../src/features/support/settings/support-settings.routes';
import { SUPPORT_SETTINGS_ITEM_COUNT } from '../../src/features/support/settings/support-settings.model';
import { padTo } from '../support/pacing';

test.describe('Support Settings', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(SUPPORT_SETTINGS_FEATURE.route);
    await expect(
      page.getByTestId(SUPPORT_SETTINGS_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${SUPPORT_SETTINGS_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(SUPPORT_SETTINGS_FEATURE.title);
    const rows = page.getByTestId(`${SUPPORT_SETTINGS_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(SUPPORT_SETTINGS_ITEM_COUNT);
    await padTo(startedAt);
  });
});
