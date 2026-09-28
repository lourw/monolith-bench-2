import { expect, test } from '@playwright/test';
import { REVIEWS_OVERVIEW_FEATURE } from '../../src/features/reviews/overview/reviews-overview.routes';
import { REVIEWS_OVERVIEW_ITEM_COUNT } from '../../src/features/reviews/overview/reviews-overview.model';
import { padTo } from '../support/pacing';

test.describe('Reviews Overview', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(REVIEWS_OVERVIEW_FEATURE.route);
    await expect(
      page.getByTestId(REVIEWS_OVERVIEW_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${REVIEWS_OVERVIEW_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(REVIEWS_OVERVIEW_FEATURE.title);
    const rows = page.getByTestId(`${REVIEWS_OVERVIEW_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(REVIEWS_OVERVIEW_ITEM_COUNT);
    await padTo(startedAt);
  });
});
