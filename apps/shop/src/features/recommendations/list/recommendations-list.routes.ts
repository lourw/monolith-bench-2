export const RECOMMENDATIONS_LIST_ROUTE = '/features/recommendations-list';

export const RECOMMENDATIONS_LIST_TEST_ID = 'feature-recommendations-list';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const RECOMMENDATIONS_LIST_FEATURE: FeatureMeta = {
  id: 'recommendations-list',
  title: 'Recommendations List',
  route: RECOMMENDATIONS_LIST_ROUTE,
  testId: RECOMMENDATIONS_LIST_TEST_ID,
  domain: 'recommendations',
  kind: 'list',
  itemCount: 12,
};

export function recommendationsListItemPath(itemId: string): string {
  return `${RECOMMENDATIONS_LIST_ROUTE}/${encodeURIComponent(itemId)}`;
}
