export const PROMOTIONS_SUMMARY_ROUTE = '/features/promotions-summary';

export const PROMOTIONS_SUMMARY_TEST_ID = 'feature-promotions-summary';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const PROMOTIONS_SUMMARY_FEATURE: FeatureMeta = {
  id: 'promotions-summary',
  title: 'Promotions Summary',
  route: PROMOTIONS_SUMMARY_ROUTE,
  testId: PROMOTIONS_SUMMARY_TEST_ID,
  domain: 'promotions',
  kind: 'summary',
  itemCount: 7,
};

export function promotionsSummaryItemPath(itemId: string): string {
  return `${PROMOTIONS_SUMMARY_ROUTE}/${encodeURIComponent(itemId)}`;
}
