export const SUBSCRIPTIONS_DETAILS_ROUTE = '/features/subscriptions-details';

export const SUBSCRIPTIONS_DETAILS_TEST_ID = 'feature-subscriptions-details';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const SUBSCRIPTIONS_DETAILS_FEATURE: FeatureMeta = {
  id: 'subscriptions-details',
  title: 'Subscriptions Details',
  route: SUBSCRIPTIONS_DETAILS_ROUTE,
  testId: SUBSCRIPTIONS_DETAILS_TEST_ID,
  domain: 'subscriptions',
  kind: 'details',
  itemCount: 11,
};

export function subscriptionsDetailsItemPath(itemId: string): string {
  return `${SUBSCRIPTIONS_DETAILS_ROUTE}/${encodeURIComponent(itemId)}`;
}
