import { expect, test } from '@playwright/test';
import { PAYMENTS_DETAILS_FEATURE } from '../../src/features/payments/details/payments-details.routes';
import { PAYMENTS_DETAILS_ITEM_COUNT } from '../../src/features/payments/details/payments-details.model';
import { padTo } from '../support/pacing';

test.describe('Payments Details', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(PAYMENTS_DETAILS_FEATURE.route);
    await expect(
      page.getByTestId(PAYMENTS_DETAILS_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${PAYMENTS_DETAILS_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(PAYMENTS_DETAILS_FEATURE.title);
    const rows = page.getByTestId(`${PAYMENTS_DETAILS_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(PAYMENTS_DETAILS_ITEM_COUNT);
    await padTo(startedAt);
  });
});
