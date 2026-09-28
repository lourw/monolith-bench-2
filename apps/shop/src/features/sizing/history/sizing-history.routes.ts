export const SIZING_HISTORY_ROUTE = '/features/sizing-history';

export const SIZING_HISTORY_TEST_ID = 'feature-sizing-history';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const SIZING_HISTORY_FEATURE: FeatureMeta = {
  id: 'sizing-history',
  title: 'Sizing History',
  route: SIZING_HISTORY_ROUTE,
  testId: SIZING_HISTORY_TEST_ID,
  domain: 'sizing',
  kind: 'history',
  itemCount: 11,
};

export function sizingHistoryItemPath(itemId: string): string {
  return `${SIZING_HISTORY_ROUTE}/${encodeURIComponent(itemId)}`;
}
