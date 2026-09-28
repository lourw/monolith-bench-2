import { expect, test } from '@playwright/test';
import { SEARCH_DETAILS_FEATURE } from '../../src/features/search/details/search-details.routes';
import { SEARCH_DETAILS_ITEM_COUNT } from '../../src/features/search/details/search-details.model';
import { padTo } from '../support/pacing';

test.describe('Search Details', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(SEARCH_DETAILS_FEATURE.route);
    await expect(page.getByTestId(SEARCH_DETAILS_FEATURE.testId)).toBeVisible();
    const heading = page
      .getByTestId(`${SEARCH_DETAILS_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(SEARCH_DETAILS_FEATURE.title);
    const rows = page.getByTestId(`${SEARCH_DETAILS_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(SEARCH_DETAILS_ITEM_COUNT);
    await padTo(startedAt);
  });
});
