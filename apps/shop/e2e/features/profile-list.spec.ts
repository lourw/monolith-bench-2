import { expect, test } from '@playwright/test';
import { PROFILE_LIST_FEATURE } from '../../src/features/profile/list/profile-list.routes';
import { PROFILE_LIST_ITEM_COUNT } from '../../src/features/profile/list/profile-list.model';
import { padTo } from '../support/pacing';

test.describe('Profile List', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(PROFILE_LIST_FEATURE.route);
    await expect(page.getByTestId(PROFILE_LIST_FEATURE.testId)).toBeVisible();
    const heading = page
      .getByTestId(`${PROFILE_LIST_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(PROFILE_LIST_FEATURE.title);
    const rows = page.getByTestId(`${PROFILE_LIST_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(PROFILE_LIST_ITEM_COUNT);
    await padTo(startedAt);
  });
});
