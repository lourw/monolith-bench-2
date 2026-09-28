export const PROMOTIONS_HISTORY_ROUTE = '/features/promotions-history';

export const PROMOTIONS_HISTORY_TEST_ID = 'feature-promotions-history';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const PROMOTIONS_HISTORY_FEATURE: FeatureMeta = {
  id: 'promotions-history',
  title: 'Promotions History',
  route: PROMOTIONS_HISTORY_ROUTE,
  testId: PROMOTIONS_HISTORY_TEST_ID,
  domain: 'promotions',
  kind: 'history',
  itemCount: 11,
};

export function promotionsHistoryItemPath(itemId: string): string {
  return `${PROMOTIONS_HISTORY_ROUTE}/${encodeURIComponent(itemId)}`;
}
