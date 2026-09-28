import { expect, test } from '@playwright/test';
import { SUBSCRIPTIONS_DETAILS_FEATURE } from '../../src/features/subscriptions/details/subscriptions-details.routes';
import { SUBSCRIPTIONS_DETAILS_ITEM_COUNT } from '../../src/features/subscriptions/details/subscriptions-details.model';
import { padTo } from '../support/pacing';

test.describe('Subscriptions Details', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(SUBSCRIPTIONS_DETAILS_FEATURE.route);
    await expect(
      page.getByTestId(SUBSCRIPTIONS_DETAILS_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${SUBSCRIPTIONS_DETAILS_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(SUBSCRIPTIONS_DETAILS_FEATURE.title);
    const rows = page.getByTestId(
      `${SUBSCRIPTIONS_DETAILS_FEATURE.testId}-row`,
    );
    await expect(rows).toHaveCount(SUBSCRIPTIONS_DETAILS_ITEM_COUNT);
    await padTo(startedAt);
  });
});
