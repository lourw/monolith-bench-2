import { expect, test } from '@playwright/test';
import { LOYALTY_HISTORY_FEATURE } from '../../src/features/loyalty/history/loyalty-history.routes';
import { LOYALTY_HISTORY_ITEM_COUNT } from '../../src/features/loyalty/history/loyalty-history.model';
import { padTo } from '../support/pacing';

test.describe('Loyalty History', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(LOYALTY_HISTORY_FEATURE.route);
    await expect(
      page.getByTestId(LOYALTY_HISTORY_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${LOYALTY_HISTORY_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(LOYALTY_HISTORY_FEATURE.title);
    const rows = page.getByTestId(`${LOYALTY_HISTORY_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(LOYALTY_HISTORY_ITEM_COUNT);
    await padTo(startedAt);
  });
});
