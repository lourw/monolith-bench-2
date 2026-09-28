import { expect, test } from '@playwright/test';
import { ADDRESSES_LIST_FEATURE } from '../../src/features/addresses/list/addresses-list.routes';
import { ADDRESSES_LIST_ITEM_COUNT } from '../../src/features/addresses/list/addresses-list.model';
import { padTo } from '../support/pacing';

test.describe('Addresses List', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(ADDRESSES_LIST_FEATURE.route);
    await expect(page.getByTestId(ADDRESSES_LIST_FEATURE.testId)).toBeVisible();
    const heading = page
      .getByTestId(`${ADDRESSES_LIST_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(ADDRESSES_LIST_FEATURE.title);
    const rows = page.getByTestId(`${ADDRESSES_LIST_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(ADDRESSES_LIST_ITEM_COUNT);
    await padTo(startedAt);
  });
});
