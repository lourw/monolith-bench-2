export const BUNDLES_HISTORY_ROUTE = '/features/bundles-history';

export const BUNDLES_HISTORY_TEST_ID = 'feature-bundles-history';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const BUNDLES_HISTORY_FEATURE: FeatureMeta = {
  id: 'bundles-history',
  title: 'Bundles History',
  route: BUNDLES_HISTORY_ROUTE,
  testId: BUNDLES_HISTORY_TEST_ID,
  domain: 'bundles',
  kind: 'history',
  itemCount: 12,
};

export function bundlesHistoryItemPath(itemId: string): string {
  return `${BUNDLES_HISTORY_ROUTE}/${encodeURIComponent(itemId)}`;
}
