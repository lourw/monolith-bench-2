export const LOYALTY_LIST_ROUTE = '/features/loyalty-list';

export const LOYALTY_LIST_TEST_ID = 'feature-loyalty-list';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const LOYALTY_LIST_FEATURE: FeatureMeta = {
  id: 'loyalty-list',
  title: 'Loyalty List',
  route: LOYALTY_LIST_ROUTE,
  testId: LOYALTY_LIST_TEST_ID,
  domain: 'loyalty',
  kind: 'list',
  itemCount: 9,
};

export function loyaltyListItemPath(itemId: string): string {
  return `${LOYALTY_LIST_ROUTE}/${encodeURIComponent(itemId)}`;
}
