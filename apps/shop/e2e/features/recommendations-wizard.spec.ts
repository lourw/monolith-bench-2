import { expect, test } from '@playwright/test';
import { RECOMMENDATIONS_WIZARD_FEATURE } from '../../src/features/recommendations/wizard/recommendations-wizard.routes';
import { RECOMMENDATIONS_WIZARD_ITEM_COUNT } from '../../src/features/recommendations/wizard/recommendations-wizard.model';
import { padTo } from '../support/pacing';

test.describe('Recommendations Wizard', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(RECOMMENDATIONS_WIZARD_FEATURE.route);
    await expect(
      page.getByTestId(RECOMMENDATIONS_WIZARD_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${RECOMMENDATIONS_WIZARD_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(RECOMMENDATIONS_WIZARD_FEATURE.title);
    const rows = page.getByTestId(
      `${RECOMMENDATIONS_WIZARD_FEATURE.testId}-row`,
    );
    await expect(rows).toHaveCount(RECOMMENDATIONS_WIZARD_ITEM_COUNT);
    await padTo(startedAt);
  });
});
