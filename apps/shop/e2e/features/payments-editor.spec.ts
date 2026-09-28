import { expect, test } from '@playwright/test';
import { PAYMENTS_EDITOR_FEATURE } from '../../src/features/payments/editor/payments-editor.routes';
import { PAYMENTS_EDITOR_ITEM_COUNT } from '../../src/features/payments/editor/payments-editor.model';
import { padTo } from '../support/pacing';

test.describe('Payments Editor', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(PAYMENTS_EDITOR_FEATURE.route);
    await expect(
      page.getByTestId(PAYMENTS_EDITOR_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${PAYMENTS_EDITOR_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(PAYMENTS_EDITOR_FEATURE.title);
    const rows = page.getByTestId(`${PAYMENTS_EDITOR_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(PAYMENTS_EDITOR_ITEM_COUNT);
    await padTo(startedAt);
  });
});
