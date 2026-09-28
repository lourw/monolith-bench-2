import { expect, test } from '@playwright/test';
import { RETURNS_DETAILS_FEATURE } from '../../src/features/returns/details/returns-details.routes';
import { RETURNS_DETAILS_ITEM_COUNT } from '../../src/features/returns/details/returns-details.model';
import { padTo } from '../support/pacing';

test.describe('Returns Details', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(RETURNS_DETAILS_FEATURE.route);
    await expect(
      page.getByTestId(RETURNS_DETAILS_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${RETURNS_DETAILS_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(RETURNS_DETAILS_FEATURE.title);
    const rows = page.getByTestId(`${RETURNS_DETAILS_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(RETURNS_DETAILS_ITEM_COUNT);
    await padTo(startedAt);
  });
});
