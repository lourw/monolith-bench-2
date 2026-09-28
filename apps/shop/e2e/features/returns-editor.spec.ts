import { expect, test } from '@playwright/test';
import { RETURNS_EDITOR_FEATURE } from '../../src/features/returns/editor/returns-editor.routes';
import { RETURNS_EDITOR_ITEM_COUNT } from '../../src/features/returns/editor/returns-editor.model';
import { padTo } from '../support/pacing';

test.describe('Returns Editor', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(RETURNS_EDITOR_FEATURE.route);
    await expect(page.getByTestId(RETURNS_EDITOR_FEATURE.testId)).toBeVisible();
    const heading = page
      .getByTestId(`${RETURNS_EDITOR_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(RETURNS_EDITOR_FEATURE.title);
    const rows = page.getByTestId(`${RETURNS_EDITOR_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(RETURNS_EDITOR_ITEM_COUNT);
    await padTo(startedAt);
  });
});
