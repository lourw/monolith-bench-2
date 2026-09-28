import { expect, test } from '@playwright/test';
import { AUTH_SETTINGS_FEATURE } from '../../src/features/auth/settings/auth-settings.routes';
import { AUTH_SETTINGS_ITEM_COUNT } from '../../src/features/auth/settings/auth-settings.model';
import { padTo } from '../support/pacing';

test.describe('Auth Settings', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(AUTH_SETTINGS_FEATURE.route);
    await expect(page.getByTestId(AUTH_SETTINGS_FEATURE.testId)).toBeVisible();
    const heading = page
      .getByTestId(`${AUTH_SETTINGS_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(AUTH_SETTINGS_FEATURE.title);
    const rows = page.getByTestId(`${AUTH_SETTINGS_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(AUTH_SETTINGS_ITEM_COUNT);
    await padTo(startedAt);
  });
});
