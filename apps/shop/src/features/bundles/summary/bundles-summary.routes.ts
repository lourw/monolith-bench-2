export const BUNDLES_SUMMARY_ROUTE = '/features/bundles-summary';

export const BUNDLES_SUMMARY_TEST_ID = 'feature-bundles-summary';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const BUNDLES_SUMMARY_FEATURE: FeatureMeta = {
  id: 'bundles-summary',
  title: 'Bundles Summary',
  route: BUNDLES_SUMMARY_ROUTE,
  testId: BUNDLES_SUMMARY_TEST_ID,
  domain: 'bundles',
  kind: 'summary',
  itemCount: 11,
};

export function bundlesSummaryItemPath(itemId: string): string {
  return `${BUNDLES_SUMMARY_ROUTE}/${encodeURIComponent(itemId)}`;
}
