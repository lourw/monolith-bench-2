export const LOYALTY_OVERVIEW_ROUTE = '/features/loyalty-overview';

export const LOYALTY_OVERVIEW_TEST_ID = 'feature-loyalty-overview';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const LOYALTY_OVERVIEW_FEATURE: FeatureMeta = {
  id: 'loyalty-overview',
  title: 'Loyalty Overview',
  route: LOYALTY_OVERVIEW_ROUTE,
  testId: LOYALTY_OVERVIEW_TEST_ID,
  domain: 'loyalty',
  kind: 'overview',
  itemCount: 5,
};

export function loyaltyOverviewItemPath(itemId: string): string {
  return `${LOYALTY_OVERVIEW_ROUTE}/${encodeURIComponent(itemId)}`;
}
