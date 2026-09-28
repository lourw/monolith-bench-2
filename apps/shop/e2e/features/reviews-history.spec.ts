import { expect, test } from '@playwright/test';
import { REVIEWS_HISTORY_FEATURE } from '../../src/features/reviews/history/reviews-history.routes';
import { REVIEWS_HISTORY_ITEM_COUNT } from '../../src/features/reviews/history/reviews-history.model';
import { padTo } from '../support/pacing';

test.describe('Reviews History', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(REVIEWS_HISTORY_FEATURE.route);
    await expect(
      page.getByTestId(REVIEWS_HISTORY_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${REVIEWS_HISTORY_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(REVIEWS_HISTORY_FEATURE.title);
    const rows = page.getByTestId(`${REVIEWS_HISTORY_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(REVIEWS_HISTORY_ITEM_COUNT);
    await padTo(startedAt);
  });
});
