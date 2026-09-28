export const COMPARE_SUMMARY_ROUTE = '/features/compare-summary';

export const COMPARE_SUMMARY_TEST_ID = 'feature-compare-summary';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const COMPARE_SUMMARY_FEATURE: FeatureMeta = {
  id: 'compare-summary',
  title: 'Compare Summary',
  route: COMPARE_SUMMARY_ROUTE,
  testId: COMPARE_SUMMARY_TEST_ID,
  domain: 'compare',
  kind: 'summary',
  itemCount: 11,
};

export function compareSummaryItemPath(itemId: string): string {
  return `${COMPARE_SUMMARY_ROUTE}/${encodeURIComponent(itemId)}`;
}
