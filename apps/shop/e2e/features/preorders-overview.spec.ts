import { expect, test } from '@playwright/test';
import { PREORDERS_OVERVIEW_FEATURE } from '../../src/features/preorders/overview/preorders-overview.routes';
import { PREORDERS_OVERVIEW_ITEM_COUNT } from '../../src/features/preorders/overview/preorders-overview.model';
import { padTo } from '../support/pacing';

test.describe('Preorders Overview', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(PREORDERS_OVERVIEW_FEATURE.route);
    await expect(
      page.getByTestId(PREORDERS_OVERVIEW_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${PREORDERS_OVERVIEW_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(PREORDERS_OVERVIEW_FEATURE.title);
    const rows = page.getByTestId(`${PREORDERS_OVERVIEW_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(PREORDERS_OVERVIEW_ITEM_COUNT);
    await padTo(startedAt);
  });
});
