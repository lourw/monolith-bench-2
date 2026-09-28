export const RECOMMENDATIONS_DETAILS_ROUTE =
  '/features/recommendations-details';

export const RECOMMENDATIONS_DETAILS_TEST_ID =
  'feature-recommendations-details';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const RECOMMENDATIONS_DETAILS_FEATURE: FeatureMeta = {
  id: 'recommendations-details',
  title: 'Recommendations Details',
  route: RECOMMENDATIONS_DETAILS_ROUTE,
  testId: RECOMMENDATIONS_DETAILS_TEST_ID,
  domain: 'recommendations',
  kind: 'details',
  itemCount: 7,
};

export function recommendationsDetailsItemPath(itemId: string): string {
  return `${RECOMMENDATIONS_DETAILS_ROUTE}/${encodeURIComponent(itemId)}`;
}
