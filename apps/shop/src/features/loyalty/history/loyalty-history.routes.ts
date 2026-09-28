export const LOYALTY_HISTORY_ROUTE = '/features/loyalty-history';

export const LOYALTY_HISTORY_TEST_ID = 'feature-loyalty-history';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const LOYALTY_HISTORY_FEATURE: FeatureMeta = {
  id: 'loyalty-history',
  title: 'Loyalty History',
  route: LOYALTY_HISTORY_ROUTE,
  testId: LOYALTY_HISTORY_TEST_ID,
  domain: 'loyalty',
  kind: 'history',
  itemCount: 10,
};

export function loyaltyHistoryItemPath(itemId: string): string {
  return `${LOYALTY_HISTORY_ROUTE}/${encodeURIComponent(itemId)}`;
}
