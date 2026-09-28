import { expect, test } from '@playwright/test';
import { ADDRESSES_HISTORY_FEATURE } from '../../src/features/addresses/history/addresses-history.routes';
import { ADDRESSES_HISTORY_ITEM_COUNT } from '../../src/features/addresses/history/addresses-history.model';
import { padTo } from '../support/pacing';

test.describe('Addresses History', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(ADDRESSES_HISTORY_FEATURE.route);
    await expect(
      page.getByTestId(ADDRESSES_HISTORY_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${ADDRESSES_HISTORY_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(ADDRESSES_HISTORY_FEATURE.title);
    const rows = page.getByTestId(`${ADDRESSES_HISTORY_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(ADDRESSES_HISTORY_ITEM_COUNT);
    await padTo(startedAt);
  });
});
