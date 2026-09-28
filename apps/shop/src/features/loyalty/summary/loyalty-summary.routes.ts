export const LOYALTY_SUMMARY_ROUTE = '/features/loyalty-summary';

export const LOYALTY_SUMMARY_TEST_ID = 'feature-loyalty-summary';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const LOYALTY_SUMMARY_FEATURE: FeatureMeta = {
  id: 'loyalty-summary',
  title: 'Loyalty Summary',
  route: LOYALTY_SUMMARY_ROUTE,
  testId: LOYALTY_SUMMARY_TEST_ID,
  domain: 'loyalty',
  kind: 'summary',
  itemCount: 10,
};

export function loyaltySummaryItemPath(itemId: string): string {
  return `${LOYALTY_SUMMARY_ROUTE}/${encodeURIComponent(itemId)}`;
}
