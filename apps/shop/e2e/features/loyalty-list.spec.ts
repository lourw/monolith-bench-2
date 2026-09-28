import { expect, test } from '@playwright/test';
import { LOYALTY_LIST_FEATURE } from '../../src/features/loyalty/list/loyalty-list.routes';
import { LOYALTY_LIST_ITEM_COUNT } from '../../src/features/loyalty/list/loyalty-list.model';
import { padTo } from '../support/pacing';

test.describe('Loyalty List', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(LOYALTY_LIST_FEATURE.route);
    await expect(page.getByTestId(LOYALTY_LIST_FEATURE.testId)).toBeVisible();
    const heading = page
      .getByTestId(`${LOYALTY_LIST_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(LOYALTY_LIST_FEATURE.title);
    const rows = page.getByTestId(`${LOYALTY_LIST_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(LOYALTY_LIST_ITEM_COUNT);
    await padTo(startedAt);
  });
});
