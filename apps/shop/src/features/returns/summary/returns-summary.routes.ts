export const RETURNS_SUMMARY_ROUTE = '/features/returns-summary';

export const RETURNS_SUMMARY_TEST_ID = 'feature-returns-summary';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const RETURNS_SUMMARY_FEATURE: FeatureMeta = {
  id: 'returns-summary',
  title: 'Returns Summary',
  route: RETURNS_SUMMARY_ROUTE,
  testId: RETURNS_SUMMARY_TEST_ID,
  domain: 'returns',
  kind: 'summary',
  itemCount: 9,
};

export function returnsSummaryItemPath(itemId: string): string {
  return `${RETURNS_SUMMARY_ROUTE}/${encodeURIComponent(itemId)}`;
}
