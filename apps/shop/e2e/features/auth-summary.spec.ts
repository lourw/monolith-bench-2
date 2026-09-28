import { expect, test } from '@playwright/test';
import { AUTH_SUMMARY_FEATURE } from '../../src/features/auth/summary/auth-summary.routes';
import { AUTH_SUMMARY_ITEM_COUNT } from '../../src/features/auth/summary/auth-summary.model';
import { padTo } from '../support/pacing';

test.describe('Auth Summary', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(AUTH_SUMMARY_FEATURE.route);
    await expect(page.getByTestId(AUTH_SUMMARY_FEATURE.testId)).toBeVisible();
    const heading = page
      .getByTestId(`${AUTH_SUMMARY_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(AUTH_SUMMARY_FEATURE.title);
    const rows = page.getByTestId(`${AUTH_SUMMARY_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(AUTH_SUMMARY_ITEM_COUNT);
    await padTo(startedAt);
  });
});
