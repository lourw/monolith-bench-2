import { expect, test } from '@playwright/test';
import { CHECKOUT_DETAILS_FEATURE } from '../../src/features/checkout/details/checkout-details.routes';
import { CHECKOUT_DETAILS_ITEM_COUNT } from '../../src/features/checkout/details/checkout-details.model';
import { padTo } from '../support/pacing';

test.describe('Checkout Details', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(CHECKOUT_DETAILS_FEATURE.route);
    await expect(
      page.getByTestId(CHECKOUT_DETAILS_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${CHECKOUT_DETAILS_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(CHECKOUT_DETAILS_FEATURE.title);
    const rows = page.getByTestId(`${CHECKOUT_DETAILS_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(CHECKOUT_DETAILS_ITEM_COUNT);
    await padTo(startedAt);
  });
});
