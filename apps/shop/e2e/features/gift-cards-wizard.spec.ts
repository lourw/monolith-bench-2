import { expect, test } from '@playwright/test';
import { GIFT_CARDS_WIZARD_FEATURE } from '../../src/features/gift-cards/wizard/gift-cards-wizard.routes';
import { GIFT_CARDS_WIZARD_ITEM_COUNT } from '../../src/features/gift-cards/wizard/gift-cards-wizard.model';
import { padTo } from '../support/pacing';

test.describe('Gift Cards Wizard', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(GIFT_CARDS_WIZARD_FEATURE.route);
    await expect(
      page.getByTestId(GIFT_CARDS_WIZARD_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${GIFT_CARDS_WIZARD_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(GIFT_CARDS_WIZARD_FEATURE.title);
    const rows = page.getByTestId(`${GIFT_CARDS_WIZARD_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(GIFT_CARDS_WIZARD_ITEM_COUNT);
    await padTo(startedAt);
  });
});
