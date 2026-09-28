import { expect, test } from '@playwright/test';
import { BUNDLES_WIZARD_FEATURE } from '../../src/features/bundles/wizard/bundles-wizard.routes';
import { BUNDLES_WIZARD_ITEM_COUNT } from '../../src/features/bundles/wizard/bundles-wizard.model';
import { padTo } from '../support/pacing';

test.describe('Bundles Wizard', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(BUNDLES_WIZARD_FEATURE.route);
    await expect(page.getByTestId(BUNDLES_WIZARD_FEATURE.testId)).toBeVisible();
    const heading = page
      .getByTestId(`${BUNDLES_WIZARD_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(BUNDLES_WIZARD_FEATURE.title);
    const rows = page.getByTestId(`${BUNDLES_WIZARD_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(BUNDLES_WIZARD_ITEM_COUNT);
    await padTo(startedAt);
  });
});
