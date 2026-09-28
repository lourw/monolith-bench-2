import { expect, test } from '@playwright/test';
import { SUPPORT_WIZARD_FEATURE } from '../../src/features/support/wizard/support-wizard.routes';
import { SUPPORT_WIZARD_ITEM_COUNT } from '../../src/features/support/wizard/support-wizard.model';
import { padTo } from '../support/pacing';

test.describe('Support Wizard', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(SUPPORT_WIZARD_FEATURE.route);
    await expect(page.getByTestId(SUPPORT_WIZARD_FEATURE.testId)).toBeVisible();
    const heading = page
      .getByTestId(`${SUPPORT_WIZARD_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(SUPPORT_WIZARD_FEATURE.title);
    const rows = page.getByTestId(`${SUPPORT_WIZARD_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(SUPPORT_WIZARD_ITEM_COUNT);
    await padTo(startedAt);
  });
});
