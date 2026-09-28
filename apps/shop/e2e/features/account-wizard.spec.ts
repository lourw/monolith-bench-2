import { expect, test } from '@playwright/test';
import { ACCOUNT_WIZARD_FEATURE } from '../../src/features/account/wizard/account-wizard.routes';
import { ACCOUNT_WIZARD_ITEM_COUNT } from '../../src/features/account/wizard/account-wizard.model';
import { padTo } from '../support/pacing';

test.describe('Account Wizard', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(ACCOUNT_WIZARD_FEATURE.route);
    await expect(page.getByTestId(ACCOUNT_WIZARD_FEATURE.testId)).toBeVisible();
    const heading = page
      .getByTestId(`${ACCOUNT_WIZARD_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(ACCOUNT_WIZARD_FEATURE.title);
    const rows = page.getByTestId(`${ACCOUNT_WIZARD_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(ACCOUNT_WIZARD_ITEM_COUNT);
    await padTo(startedAt);
  });
});
