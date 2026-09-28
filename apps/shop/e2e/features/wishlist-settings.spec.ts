import { expect, test } from '@playwright/test';
import { WISHLIST_SETTINGS_FEATURE } from '../../src/features/wishlist/settings/wishlist-settings.routes';
import { WISHLIST_SETTINGS_ITEM_COUNT } from '../../src/features/wishlist/settings/wishlist-settings.model';
import { padTo } from '../support/pacing';

test.describe('Wishlist Settings', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(WISHLIST_SETTINGS_FEATURE.route);
    await expect(
      page.getByTestId(WISHLIST_SETTINGS_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${WISHLIST_SETTINGS_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(WISHLIST_SETTINGS_FEATURE.title);
    const rows = page.getByTestId(`${WISHLIST_SETTINGS_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(WISHLIST_SETTINGS_ITEM_COUNT);
    await padTo(startedAt);
  });
});
