export const COMPARE_LIST_ROUTE = '/features/compare-list';

export const COMPARE_LIST_TEST_ID = 'feature-compare-list';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const COMPARE_LIST_FEATURE: FeatureMeta = {
  id: 'compare-list',
  title: 'Compare List',
  route: COMPARE_LIST_ROUTE,
  testId: COMPARE_LIST_TEST_ID,
  domain: 'compare',
  kind: 'list',
  itemCount: 5,
};

export function compareListItemPath(itemId: string): string {
  return `${COMPARE_LIST_ROUTE}/${encodeURIComponent(itemId)}`;
}
