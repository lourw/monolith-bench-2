export const SUBSCRIPTIONS_LIST_ROUTE = '/features/subscriptions-list';

export const SUBSCRIPTIONS_LIST_TEST_ID = 'feature-subscriptions-list';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const SUBSCRIPTIONS_LIST_FEATURE: FeatureMeta = {
  id: 'subscriptions-list',
  title: 'Subscriptions List',
  route: SUBSCRIPTIONS_LIST_ROUTE,
  testId: SUBSCRIPTIONS_LIST_TEST_ID,
  domain: 'subscriptions',
  kind: 'list',
  itemCount: 6,
};

export function subscriptionsListItemPath(itemId: string): string {
  return `${SUBSCRIPTIONS_LIST_ROUTE}/${encodeURIComponent(itemId)}`;
}
