import { expect, test } from '@playwright/test';
import { REVIEWS_LIST_FEATURE } from '../../src/features/reviews/list/reviews-list.routes';
import { REVIEWS_LIST_ITEM_COUNT } from '../../src/features/reviews/list/reviews-list.model';
import { padTo } from '../support/pacing';

test.describe('Reviews List', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(REVIEWS_LIST_FEATURE.route);
    await expect(page.getByTestId(REVIEWS_LIST_FEATURE.testId)).toBeVisible();
    const heading = page
      .getByTestId(`${REVIEWS_LIST_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(REVIEWS_LIST_FEATURE.title);
    const rows = page.getByTestId(`${REVIEWS_LIST_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(REVIEWS_LIST_ITEM_COUNT);
    await padTo(startedAt);
  });
});
