export const PREORDERS_HISTORY_ROUTE = '/features/preorders-history';

export const PREORDERS_HISTORY_TEST_ID = 'feature-preorders-history';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const PREORDERS_HISTORY_FEATURE: FeatureMeta = {
  id: 'preorders-history',
  title: 'Preorders History',
  route: PREORDERS_HISTORY_ROUTE,
  testId: PREORDERS_HISTORY_TEST_ID,
  domain: 'preorders',
  kind: 'history',
  itemCount: 6,
};

export function preordersHistoryItemPath(itemId: string): string {
  return `${PREORDERS_HISTORY_ROUTE}/${encodeURIComponent(itemId)}`;
}
