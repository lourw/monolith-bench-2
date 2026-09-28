import { expect, test } from '@playwright/test';
import { PROMOTIONS_DETAILS_FEATURE } from '../../src/features/promotions/details/promotions-details.routes';
import { PROMOTIONS_DETAILS_ITEM_COUNT } from '../../src/features/promotions/details/promotions-details.model';
import { padTo } from '../support/pacing';

test.describe('Promotions Details', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(PROMOTIONS_DETAILS_FEATURE.route);
    await expect(
      page.getByTestId(PROMOTIONS_DETAILS_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${PROMOTIONS_DETAILS_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(PROMOTIONS_DETAILS_FEATURE.title);
    const rows = page.getByTestId(`${PROMOTIONS_DETAILS_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(PROMOTIONS_DETAILS_ITEM_COUNT);
    await padTo(startedAt);
  });
});
