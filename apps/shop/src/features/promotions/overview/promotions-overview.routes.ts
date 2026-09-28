export const PROMOTIONS_OVERVIEW_ROUTE = '/features/promotions-overview';

export const PROMOTIONS_OVERVIEW_TEST_ID = 'feature-promotions-overview';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const PROMOTIONS_OVERVIEW_FEATURE: FeatureMeta = {
  id: 'promotions-overview',
  title: 'Promotions Overview',
  route: PROMOTIONS_OVERVIEW_ROUTE,
  testId: PROMOTIONS_OVERVIEW_TEST_ID,
  domain: 'promotions',
  kind: 'overview',
  itemCount: 9,
};

export function promotionsOverviewItemPath(itemId: string): string {
  return `${PROMOTIONS_OVERVIEW_ROUTE}/${encodeURIComponent(itemId)}`;
}
