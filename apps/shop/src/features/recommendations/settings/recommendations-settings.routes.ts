export const RECOMMENDATIONS_SETTINGS_ROUTE =
  '/features/recommendations-settings';

export const RECOMMENDATIONS_SETTINGS_TEST_ID =
  'feature-recommendations-settings';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const RECOMMENDATIONS_SETTINGS_FEATURE: FeatureMeta = {
  id: 'recommendations-settings',
  title: 'Recommendations Settings',
  route: RECOMMENDATIONS_SETTINGS_ROUTE,
  testId: RECOMMENDATIONS_SETTINGS_TEST_ID,
  domain: 'recommendations',
  kind: 'settings',
  itemCount: 8,
};

export function recommendationsSettingsItemPath(itemId: string): string {
  return `${RECOMMENDATIONS_SETTINGS_ROUTE}/${encodeURIComponent(itemId)}`;
}
