import { expect, test } from '@playwright/test';
import { PREORDERS_HISTORY_FEATURE } from '../../src/features/preorders/history/preorders-history.routes';
import { PREORDERS_HISTORY_ITEM_COUNT } from '../../src/features/preorders/history/preorders-history.model';
import { padTo } from '../support/pacing';

test.describe('Preorders History', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(PREORDERS_HISTORY_FEATURE.route);
    await expect(
      page.getByTestId(PREORDERS_HISTORY_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${PREORDERS_HISTORY_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(PREORDERS_HISTORY_FEATURE.title);
    const rows = page.getByTestId(`${PREORDERS_HISTORY_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(PREORDERS_HISTORY_ITEM_COUNT);
    await padTo(startedAt);
  });
});
