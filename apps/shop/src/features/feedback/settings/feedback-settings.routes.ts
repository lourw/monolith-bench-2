export const FEEDBACK_SETTINGS_ROUTE = '/features/feedback-settings';

export const FEEDBACK_SETTINGS_TEST_ID = 'feature-feedback-settings';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const FEEDBACK_SETTINGS_FEATURE: FeatureMeta = {
  id: 'feedback-settings',
  title: 'Feedback Settings',
  route: FEEDBACK_SETTINGS_ROUTE,
  testId: FEEDBACK_SETTINGS_TEST_ID,
  domain: 'feedback',
  kind: 'settings',
  itemCount: 9,
};

export function feedbackSettingsItemPath(itemId: string): string {
  return `${FEEDBACK_SETTINGS_ROUTE}/${encodeURIComponent(itemId)}`;
}
