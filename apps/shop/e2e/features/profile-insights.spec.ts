import { expect, test } from '@playwright/test';
import { PROFILE_INSIGHTS_FEATURE } from '../../src/features/profile/insights/profile-insights.routes';
import { PROFILE_INSIGHTS_ITEM_COUNT } from '../../src/features/profile/insights/profile-insights.model';
import { padTo } from '../support/pacing';

test.describe('Profile Insights', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(PROFILE_INSIGHTS_FEATURE.route);
    await expect(
      page.getByTestId(PROFILE_INSIGHTS_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${PROFILE_INSIGHTS_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(PROFILE_INSIGHTS_FEATURE.title);
    const rows = page.getByTestId(`${PROFILE_INSIGHTS_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(PROFILE_INSIGHTS_ITEM_COUNT);
    await padTo(startedAt);
  });
});
