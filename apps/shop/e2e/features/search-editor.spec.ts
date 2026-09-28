import { expect, test } from '@playwright/test';
import { SEARCH_EDITOR_FEATURE } from '../../src/features/search/editor/search-editor.routes';
import { SEARCH_EDITOR_ITEM_COUNT } from '../../src/features/search/editor/search-editor.model';
import { padTo } from '../support/pacing';

test.describe('Search Editor', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(SEARCH_EDITOR_FEATURE.route);
    await expect(page.getByTestId(SEARCH_EDITOR_FEATURE.testId)).toBeVisible();
    const heading = page
      .getByTestId(`${SEARCH_EDITOR_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(SEARCH_EDITOR_FEATURE.title);
    const rows = page.getByTestId(`${SEARCH_EDITOR_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(SEARCH_EDITOR_ITEM_COUNT);
    await padTo(startedAt);
  });
});
