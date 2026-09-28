import { expect, test } from '@playwright/test';
import { PROFILE_OVERVIEW_FEATURE } from '../../src/features/profile/overview/profile-overview.routes';
import { PROFILE_OVERVIEW_ITEM_COUNT } from '../../src/features/profile/overview/profile-overview.model';
import { padTo } from '../support/pacing';

test.describe('Profile Overview', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(PROFILE_OVERVIEW_FEATURE.route);
    await expect(
      page.getByTestId(PROFILE_OVERVIEW_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${PROFILE_OVERVIEW_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(PROFILE_OVERVIEW_FEATURE.title);
    const rows = page.getByTestId(`${PROFILE_OVERVIEW_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(PROFILE_OVERVIEW_ITEM_COUNT);
    await padTo(startedAt);
  });
});
