import { expect, test } from '@playwright/test';
import { COMPARE_OVERVIEW_FEATURE } from '../../src/features/compare/overview/compare-overview.routes';
import { COMPARE_OVERVIEW_ITEM_COUNT } from '../../src/features/compare/overview/compare-overview.model';
import { padTo } from '../support/pacing';

test.describe('Compare Overview', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(COMPARE_OVERVIEW_FEATURE.route);
    await expect(
      page.getByTestId(COMPARE_OVERVIEW_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${COMPARE_OVERVIEW_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(COMPARE_OVERVIEW_FEATURE.title);
    const rows = page.getByTestId(`${COMPARE_OVERVIEW_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(COMPARE_OVERVIEW_ITEM_COUNT);
    await padTo(startedAt);
  });
});
