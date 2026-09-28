import { expect, test } from '@playwright/test';
import { RECOMMENDATIONS_SETTINGS_FEATURE } from '../../src/features/recommendations/settings/recommendations-settings.routes';
import { RECOMMENDATIONS_SETTINGS_ITEM_COUNT } from '../../src/features/recommendations/settings/recommendations-settings.model';
import { padTo } from '../support/pacing';

test.describe('Recommendations Settings', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(RECOMMENDATIONS_SETTINGS_FEATURE.route);
    await expect(
      page.getByTestId(RECOMMENDATIONS_SETTINGS_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${RECOMMENDATIONS_SETTINGS_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(RECOMMENDATIONS_SETTINGS_FEATURE.title);
    const rows = page.getByTestId(
      `${RECOMMENDATIONS_SETTINGS_FEATURE.testId}-row`,
    );
    await expect(rows).toHaveCount(RECOMMENDATIONS_SETTINGS_ITEM_COUNT);
    await padTo(startedAt);
  });
});
