export const REVIEWS_SETTINGS_ROUTE = '/features/reviews-settings';

export const REVIEWS_SETTINGS_TEST_ID = 'feature-reviews-settings';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const REVIEWS_SETTINGS_FEATURE: FeatureMeta = {
  id: 'reviews-settings',
  title: 'Reviews Settings',
  route: REVIEWS_SETTINGS_ROUTE,
  testId: REVIEWS_SETTINGS_TEST_ID,
  domain: 'reviews',
  kind: 'settings',
  itemCount: 8,
};

export function reviewsSettingsItemPath(itemId: string): string {
  return `${REVIEWS_SETTINGS_ROUTE}/${encodeURIComponent(itemId)}`;
}
