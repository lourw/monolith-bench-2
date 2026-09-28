export const PROMOTIONS_LIST_ROUTE = '/features/promotions-list';

export const PROMOTIONS_LIST_TEST_ID = 'feature-promotions-list';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const PROMOTIONS_LIST_FEATURE: FeatureMeta = {
  id: 'promotions-list',
  title: 'Promotions List',
  route: PROMOTIONS_LIST_ROUTE,
  testId: PROMOTIONS_LIST_TEST_ID,
  domain: 'promotions',
  kind: 'list',
  itemCount: 8,
};

export function promotionsListItemPath(itemId: string): string {
  return `${PROMOTIONS_LIST_ROUTE}/${encodeURIComponent(itemId)}`;
}
