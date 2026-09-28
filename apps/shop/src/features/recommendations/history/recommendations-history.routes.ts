export const RECOMMENDATIONS_HISTORY_ROUTE =
  '/features/recommendations-history';

export const RECOMMENDATIONS_HISTORY_TEST_ID =
  'feature-recommendations-history';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const RECOMMENDATIONS_HISTORY_FEATURE: FeatureMeta = {
  id: 'recommendations-history',
  title: 'Recommendations History',
  route: RECOMMENDATIONS_HISTORY_ROUTE,
  testId: RECOMMENDATIONS_HISTORY_TEST_ID,
  domain: 'recommendations',
  kind: 'history',
  itemCount: 11,
};

export function recommendationsHistoryItemPath(itemId: string): string {
  return `${RECOMMENDATIONS_HISTORY_ROUTE}/${encodeURIComponent(itemId)}`;
}
