export const SIZING_SUMMARY_ROUTE = '/features/sizing-summary';

export const SIZING_SUMMARY_TEST_ID = 'feature-sizing-summary';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const SIZING_SUMMARY_FEATURE: FeatureMeta = {
  id: 'sizing-summary',
  title: 'Sizing Summary',
  route: SIZING_SUMMARY_ROUTE,
  testId: SIZING_SUMMARY_TEST_ID,
  domain: 'sizing',
  kind: 'summary',
  itemCount: 7,
};

export function sizingSummaryItemPath(itemId: string): string {
  return `${SIZING_SUMMARY_ROUTE}/${encodeURIComponent(itemId)}`;
}
