import { expect, test } from '@playwright/test';
import { SHIPPING_SETTINGS_FEATURE } from '../../src/features/shipping/settings/shipping-settings.routes';
import { SHIPPING_SETTINGS_ITEM_COUNT } from '../../src/features/shipping/settings/shipping-settings.model';
import { padTo } from '../support/pacing';

test.describe('Shipping Settings', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(SHIPPING_SETTINGS_FEATURE.route);
    await expect(
      page.getByTestId(SHIPPING_SETTINGS_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${SHIPPING_SETTINGS_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(SHIPPING_SETTINGS_FEATURE.title);
    const rows = page.getByTestId(`${SHIPPING_SETTINGS_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(SHIPPING_SETTINGS_ITEM_COUNT);
    await padTo(startedAt);
  });
});
