export const BUNDLES_LIST_ROUTE = '/features/bundles-list';

export const BUNDLES_LIST_TEST_ID = 'feature-bundles-list';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const BUNDLES_LIST_FEATURE: FeatureMeta = {
  id: 'bundles-list',
  title: 'Bundles List',
  route: BUNDLES_LIST_ROUTE,
  testId: BUNDLES_LIST_TEST_ID,
  domain: 'bundles',
  kind: 'list',
  itemCount: 7,
};

export function bundlesListItemPath(itemId: string): string {
  return `${BUNDLES_LIST_ROUTE}/${encodeURIComponent(itemId)}`;
}
