export const SUBSCRIPTIONS_SUMMARY_ROUTE = '/features/subscriptions-summary';

export const SUBSCRIPTIONS_SUMMARY_TEST_ID = 'feature-subscriptions-summary';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const SUBSCRIPTIONS_SUMMARY_FEATURE: FeatureMeta = {
  id: 'subscriptions-summary',
  title: 'Subscriptions Summary',
  route: SUBSCRIPTIONS_SUMMARY_ROUTE,
  testId: SUBSCRIPTIONS_SUMMARY_TEST_ID,
  domain: 'subscriptions',
  kind: 'summary',
  itemCount: 12,
};

export function subscriptionsSummaryItemPath(itemId: string): string {
  return `${SUBSCRIPTIONS_SUMMARY_ROUTE}/${encodeURIComponent(itemId)}`;
}
