export const SUBSCRIPTIONS_OVERVIEW_ROUTE = '/features/subscriptions-overview';

export const SUBSCRIPTIONS_OVERVIEW_TEST_ID = 'feature-subscriptions-overview';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const SUBSCRIPTIONS_OVERVIEW_FEATURE: FeatureMeta = {
  id: 'subscriptions-overview',
  title: 'Subscriptions Overview',
  route: SUBSCRIPTIONS_OVERVIEW_ROUTE,
  testId: SUBSCRIPTIONS_OVERVIEW_TEST_ID,
  domain: 'subscriptions',
  kind: 'overview',
  itemCount: 6,
};

export function subscriptionsOverviewItemPath(itemId: string): string {
  return `${SUBSCRIPTIONS_OVERVIEW_ROUTE}/${encodeURIComponent(itemId)}`;
}
