export const RETURNS_HISTORY_ROUTE = '/features/returns-history';

export const RETURNS_HISTORY_TEST_ID = 'feature-returns-history';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const RETURNS_HISTORY_FEATURE: FeatureMeta = {
  id: 'returns-history',
  title: 'Returns History',
  route: RETURNS_HISTORY_ROUTE,
  testId: RETURNS_HISTORY_TEST_ID,
  domain: 'returns',
  kind: 'history',
  itemCount: 8,
};

export function returnsHistoryItemPath(itemId: string): string {
  return `${RETURNS_HISTORY_ROUTE}/${encodeURIComponent(itemId)}`;
}
