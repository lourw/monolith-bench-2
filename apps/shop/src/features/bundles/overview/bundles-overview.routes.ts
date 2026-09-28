export const BUNDLES_OVERVIEW_ROUTE = '/features/bundles-overview';

export const BUNDLES_OVERVIEW_TEST_ID = 'feature-bundles-overview';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const BUNDLES_OVERVIEW_FEATURE: FeatureMeta = {
  id: 'bundles-overview',
  title: 'Bundles Overview',
  route: BUNDLES_OVERVIEW_ROUTE,
  testId: BUNDLES_OVERVIEW_TEST_ID,
  domain: 'bundles',
  kind: 'overview',
  itemCount: 6,
};

export function bundlesOverviewItemPath(itemId: string): string {
  return `${BUNDLES_OVERVIEW_ROUTE}/${encodeURIComponent(itemId)}`;
}
