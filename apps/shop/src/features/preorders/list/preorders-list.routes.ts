export const PREORDERS_LIST_ROUTE = '/features/preorders-list';

export const PREORDERS_LIST_TEST_ID = 'feature-preorders-list';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const PREORDERS_LIST_FEATURE: FeatureMeta = {
  id: 'preorders-list',
  title: 'Preorders List',
  route: PREORDERS_LIST_ROUTE,
  testId: PREORDERS_LIST_TEST_ID,
  domain: 'preorders',
  kind: 'list',
  itemCount: 7,
};

export function preordersListItemPath(itemId: string): string {
  return `${PREORDERS_LIST_ROUTE}/${encodeURIComponent(itemId)}`;
}
