import { expect, test } from '@playwright/test';
import { SIZING_LIST_FEATURE } from '../../src/features/sizing/list/sizing-list.routes';
import { SIZING_LIST_ITEM_COUNT } from '../../src/features/sizing/list/sizing-list.model';
import { padTo } from '../support/pacing';

test.describe('Sizing List', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(SIZING_LIST_FEATURE.route);
    await expect(page.getByTestId(SIZING_LIST_FEATURE.testId)).toBeVisible();
    const heading = page
      .getByTestId(`${SIZING_LIST_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(SIZING_LIST_FEATURE.title);
    const rows = page.getByTestId(`${SIZING_LIST_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(SIZING_LIST_ITEM_COUNT);
    await padTo(startedAt);
  });
});
