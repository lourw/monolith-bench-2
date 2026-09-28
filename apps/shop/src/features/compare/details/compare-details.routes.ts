export const COMPARE_DETAILS_ROUTE = '/features/compare-details';

export const COMPARE_DETAILS_TEST_ID = 'feature-compare-details';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const COMPARE_DETAILS_FEATURE: FeatureMeta = {
  id: 'compare-details',
  title: 'Compare Details',
  route: COMPARE_DETAILS_ROUTE,
  testId: COMPARE_DETAILS_TEST_ID,
  domain: 'compare',
  kind: 'details',
  itemCount: 8,
};

export function compareDetailsItemPath(itemId: string): string {
  return `${COMPARE_DETAILS_ROUTE}/${encodeURIComponent(itemId)}`;
}
