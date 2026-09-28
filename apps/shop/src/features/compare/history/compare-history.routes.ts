export const COMPARE_HISTORY_ROUTE = '/features/compare-history';

export const COMPARE_HISTORY_TEST_ID = 'feature-compare-history';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const COMPARE_HISTORY_FEATURE: FeatureMeta = {
  id: 'compare-history',
  title: 'Compare History',
  route: COMPARE_HISTORY_ROUTE,
  testId: COMPARE_HISTORY_TEST_ID,
  domain: 'compare',
  kind: 'history',
  itemCount: 8,
};

export function compareHistoryItemPath(itemId: string): string {
  return `${COMPARE_HISTORY_ROUTE}/${encodeURIComponent(itemId)}`;
}
