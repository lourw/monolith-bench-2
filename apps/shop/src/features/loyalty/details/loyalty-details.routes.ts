export const LOYALTY_DETAILS_ROUTE = '/features/loyalty-details';

export const LOYALTY_DETAILS_TEST_ID = 'feature-loyalty-details';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const LOYALTY_DETAILS_FEATURE: FeatureMeta = {
  id: 'loyalty-details',
  title: 'Loyalty Details',
  route: LOYALTY_DETAILS_ROUTE,
  testId: LOYALTY_DETAILS_TEST_ID,
  domain: 'loyalty',
  kind: 'details',
  itemCount: 11,
};

export function loyaltyDetailsItemPath(itemId: string): string {
  return `${LOYALTY_DETAILS_ROUTE}/${encodeURIComponent(itemId)}`;
}
