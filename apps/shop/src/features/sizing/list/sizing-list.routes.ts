export const SIZING_LIST_ROUTE = '/features/sizing-list';

export const SIZING_LIST_TEST_ID = 'feature-sizing-list';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const SIZING_LIST_FEATURE: FeatureMeta = {
  id: 'sizing-list',
  title: 'Sizing List',
  route: SIZING_LIST_ROUTE,
  testId: SIZING_LIST_TEST_ID,
  domain: 'sizing',
  kind: 'list',
  itemCount: 10,
};

export function sizingListItemPath(itemId: string): string {
  return `${SIZING_LIST_ROUTE}/${encodeURIComponent(itemId)}`;
}
