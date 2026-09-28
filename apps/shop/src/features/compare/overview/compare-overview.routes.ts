export const COMPARE_OVERVIEW_ROUTE = '/features/compare-overview';

export const COMPARE_OVERVIEW_TEST_ID = 'feature-compare-overview';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const COMPARE_OVERVIEW_FEATURE: FeatureMeta = {
  id: 'compare-overview',
  title: 'Compare Overview',
  route: COMPARE_OVERVIEW_ROUTE,
  testId: COMPARE_OVERVIEW_TEST_ID,
  domain: 'compare',
  kind: 'overview',
  itemCount: 11,
};

export function compareOverviewItemPath(itemId: string): string {
  return `${COMPARE_OVERVIEW_ROUTE}/${encodeURIComponent(itemId)}`;
}
