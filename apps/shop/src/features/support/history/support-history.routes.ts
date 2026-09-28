export const SUPPORT_HISTORY_ROUTE = '/features/support-history';

export const SUPPORT_HISTORY_TEST_ID = 'feature-support-history';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const SUPPORT_HISTORY_FEATURE: FeatureMeta = {
  id: 'support-history',
  title: 'Support History',
  route: SUPPORT_HISTORY_ROUTE,
  testId: SUPPORT_HISTORY_TEST_ID,
  domain: 'support',
  kind: 'history',
  itemCount: 7,
};

export function supportHistoryItemPath(itemId: string): string {
  return `${SUPPORT_HISTORY_ROUTE}/${encodeURIComponent(itemId)}`;
}
