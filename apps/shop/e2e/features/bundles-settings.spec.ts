import { expect, test } from '@playwright/test';
import { BUNDLES_SETTINGS_FEATURE } from '../../src/features/bundles/settings/bundles-settings.routes';
import { BUNDLES_SETTINGS_ITEM_COUNT } from '../../src/features/bundles/settings/bundles-settings.model';
import { padTo } from '../support/pacing';

test.describe('Bundles Settings', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(BUNDLES_SETTINGS_FEATURE.route);
    await expect(
      page.getByTestId(BUNDLES_SETTINGS_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${BUNDLES_SETTINGS_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(BUNDLES_SETTINGS_FEATURE.title);
    const rows = page.getByTestId(`${BUNDLES_SETTINGS_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(BUNDLES_SETTINGS_ITEM_COUNT);
    await padTo(startedAt);
  });
});
