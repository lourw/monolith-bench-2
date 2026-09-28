import { expect, test } from '@playwright/test';
import { SIZING_HISTORY_FEATURE } from '../../src/features/sizing/history/sizing-history.routes';
import { SIZING_HISTORY_ITEM_COUNT } from '../../src/features/sizing/history/sizing-history.model';
import { padTo } from '../support/pacing';

test.describe('Sizing History', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(SIZING_HISTORY_FEATURE.route);
    await expect(page.getByTestId(SIZING_HISTORY_FEATURE.testId)).toBeVisible();
    const heading = page
      .getByTestId(`${SIZING_HISTORY_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(SIZING_HISTORY_FEATURE.title);
    const rows = page.getByTestId(`${SIZING_HISTORY_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(SIZING_HISTORY_ITEM_COUNT);
    await padTo(startedAt);
  });
});
