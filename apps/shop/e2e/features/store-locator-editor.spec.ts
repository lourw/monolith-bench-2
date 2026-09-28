import { expect, test } from '@playwright/test';
import { STORE_LOCATOR_EDITOR_FEATURE } from '../../src/features/store-locator/editor/store-locator-editor.routes';
import { STORE_LOCATOR_EDITOR_ITEM_COUNT } from '../../src/features/store-locator/editor/store-locator-editor.model';
import { padTo } from '../support/pacing';

test.describe('Store Locator Editor', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(STORE_LOCATOR_EDITOR_FEATURE.route);
    await expect(
      page.getByTestId(STORE_LOCATOR_EDITOR_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${STORE_LOCATOR_EDITOR_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(STORE_LOCATOR_EDITOR_FEATURE.title);
    const rows = page.getByTestId(`${STORE_LOCATOR_EDITOR_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(STORE_LOCATOR_EDITOR_ITEM_COUNT);
    await padTo(startedAt);
  });
});
