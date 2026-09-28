import { expect, test } from '@playwright/test';
import { NOTIFICATIONS_EDITOR_FEATURE } from '../../src/features/notifications/editor/notifications-editor.routes';
import { NOTIFICATIONS_EDITOR_ITEM_COUNT } from '../../src/features/notifications/editor/notifications-editor.model';
import { padTo } from '../support/pacing';

test.describe('Notifications Editor', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(NOTIFICATIONS_EDITOR_FEATURE.route);
    await expect(
      page.getByTestId(NOTIFICATIONS_EDITOR_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${NOTIFICATIONS_EDITOR_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(NOTIFICATIONS_EDITOR_FEATURE.title);
    const rows = page.getByTestId(`${NOTIFICATIONS_EDITOR_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(NOTIFICATIONS_EDITOR_ITEM_COUNT);
    await padTo(startedAt);
  });
});
