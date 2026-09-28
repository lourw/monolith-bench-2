export const SUBSCRIPTIONS_HISTORY_ROUTE = '/features/subscriptions-history';

export const SUBSCRIPTIONS_HISTORY_TEST_ID = 'feature-subscriptions-history';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const SUBSCRIPTIONS_HISTORY_FEATURE: FeatureMeta = {
  id: 'subscriptions-history',
  title: 'Subscriptions History',
  route: SUBSCRIPTIONS_HISTORY_ROUTE,
  testId: SUBSCRIPTIONS_HISTORY_TEST_ID,
  domain: 'subscriptions',
  kind: 'history',
  itemCount: 5,
};

export function subscriptionsHistoryItemPath(itemId: string): string {
  return `${SUBSCRIPTIONS_HISTORY_ROUTE}/${encodeURIComponent(itemId)}`;
}
