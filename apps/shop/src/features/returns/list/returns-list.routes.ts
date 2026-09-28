export const RETURNS_LIST_ROUTE = '/features/returns-list';

export const RETURNS_LIST_TEST_ID = 'feature-returns-list';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const RETURNS_LIST_FEATURE: FeatureMeta = {
  id: 'returns-list',
  title: 'Returns List',
  route: RETURNS_LIST_ROUTE,
  testId: RETURNS_LIST_TEST_ID,
  domain: 'returns',
  kind: 'list',
  itemCount: 11,
};

export function returnsListItemPath(itemId: string): string {
  return `${RETURNS_LIST_ROUTE}/${encodeURIComponent(itemId)}`;
}
