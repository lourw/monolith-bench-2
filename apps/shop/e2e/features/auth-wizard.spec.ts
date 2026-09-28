import { expect, test } from '@playwright/test';
import { AUTH_WIZARD_FEATURE } from '../../src/features/auth/wizard/auth-wizard.routes';
import { AUTH_WIZARD_ITEM_COUNT } from '../../src/features/auth/wizard/auth-wizard.model';
import { padTo } from '../support/pacing';

test.describe('Auth Wizard', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(AUTH_WIZARD_FEATURE.route);
    await expect(page.getByTestId(AUTH_WIZARD_FEATURE.testId)).toBeVisible();
    const heading = page
      .getByTestId(`${AUTH_WIZARD_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(AUTH_WIZARD_FEATURE.title);
    const rows = page.getByTestId(`${AUTH_WIZARD_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(AUTH_WIZARD_ITEM_COUNT);
    await padTo(startedAt);
  });
});
