import { expect, test } from '@playwright/test';
import { ADDRESSES_OVERVIEW_FEATURE } from '../../src/features/addresses/overview/addresses-overview.routes';
import { ADDRESSES_OVERVIEW_ITEM_COUNT } from '../../src/features/addresses/overview/addresses-overview.model';
import { padTo } from '../support/pacing';

test.describe('Addresses Overview', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(ADDRESSES_OVERVIEW_FEATURE.route);
    await expect(
      page.getByTestId(ADDRESSES_OVERVIEW_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${ADDRESSES_OVERVIEW_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(ADDRESSES_OVERVIEW_FEATURE.title);
    const rows = page.getByTestId(`${ADDRESSES_OVERVIEW_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(ADDRESSES_OVERVIEW_ITEM_COUNT);
    await padTo(startedAt);
  });
});
