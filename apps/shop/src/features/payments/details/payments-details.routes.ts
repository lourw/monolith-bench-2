export const PAYMENTS_DETAILS_ROUTE = '/features/payments-details';

export const PAYMENTS_DETAILS_TEST_ID = 'feature-payments-details';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const PAYMENTS_DETAILS_FEATURE: FeatureMeta = {
  id: 'payments-details',
  title: 'Payments Details',
  route: PAYMENTS_DETAILS_ROUTE,
  testId: PAYMENTS_DETAILS_TEST_ID,
  domain: 'payments',
  kind: 'details',
  itemCount: 7,
};

export function paymentsDetailsItemPath(itemId: string): string {
  return `${PAYMENTS_DETAILS_ROUTE}/${encodeURIComponent(itemId)}`;
}
