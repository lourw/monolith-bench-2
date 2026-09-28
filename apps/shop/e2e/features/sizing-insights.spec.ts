import { expect, test } from '@playwright/test';
import { SIZING_INSIGHTS_FEATURE } from '../../src/features/sizing/insights/sizing-insights.routes';
import { SIZING_INSIGHTS_ITEM_COUNT } from '../../src/features/sizing/insights/sizing-insights.model';
import { padTo } from '../support/pacing';

test.describe('Sizing Insights', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(SIZING_INSIGHTS_FEATURE.route);
    await expect(
      page.getByTestId(SIZING_INSIGHTS_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${SIZING_INSIGHTS_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(SIZING_INSIGHTS_FEATURE.title);
    const rows = page.getByTestId(`${SIZING_INSIGHTS_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(SIZING_INSIGHTS_ITEM_COUNT);
    await padTo(startedAt);
  });
});
