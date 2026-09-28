import { expect, test } from '@playwright/test';
import { ANALYTICS_EDITOR_FEATURE } from '../../src/features/analytics/editor/analytics-editor.routes';
import { ANALYTICS_EDITOR_ITEM_COUNT } from '../../src/features/analytics/editor/analytics-editor.model';
import { padTo } from '../support/pacing';

test.describe('Analytics Editor', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(ANALYTICS_EDITOR_FEATURE.route);
    await expect(
      page.getByTestId(ANALYTICS_EDITOR_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${ANALYTICS_EDITOR_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(ANALYTICS_EDITOR_FEATURE.title);
    const rows = page.getByTestId(`${ANALYTICS_EDITOR_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(ANALYTICS_EDITOR_ITEM_COUNT);
    await padTo(startedAt);
  });
});
