import { expect, test } from '@playwright/test';
import { SUBSCRIPTIONS_EDITOR_FEATURE } from '../../src/features/subscriptions/editor/subscriptions-editor.routes';
import { SUBSCRIPTIONS_EDITOR_ITEM_COUNT } from '../../src/features/subscriptions/editor/subscriptions-editor.model';
import { padTo } from '../support/pacing';

test.describe('Subscriptions Editor', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(SUBSCRIPTIONS_EDITOR_FEATURE.route);
    await expect(
      page.getByTestId(SUBSCRIPTIONS_EDITOR_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${SUBSCRIPTIONS_EDITOR_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(SUBSCRIPTIONS_EDITOR_FEATURE.title);
    const rows = page.getByTestId(`${SUBSCRIPTIONS_EDITOR_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(SUBSCRIPTIONS_EDITOR_ITEM_COUNT);
    await padTo(startedAt);
  });
});
