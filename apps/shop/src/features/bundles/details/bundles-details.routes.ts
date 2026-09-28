export const BUNDLES_DETAILS_ROUTE = '/features/bundles-details';

export const BUNDLES_DETAILS_TEST_ID = 'feature-bundles-details';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const BUNDLES_DETAILS_FEATURE: FeatureMeta = {
  id: 'bundles-details',
  title: 'Bundles Details',
  route: BUNDLES_DETAILS_ROUTE,
  testId: BUNDLES_DETAILS_TEST_ID,
  domain: 'bundles',
  kind: 'details',
  itemCount: 7,
};

export function bundlesDetailsItemPath(itemId: string): string {
  return `${BUNDLES_DETAILS_ROUTE}/${encodeURIComponent(itemId)}`;
}
