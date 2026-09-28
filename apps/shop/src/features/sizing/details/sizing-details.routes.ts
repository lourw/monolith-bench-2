export const SIZING_DETAILS_ROUTE = '/features/sizing-details';

export const SIZING_DETAILS_TEST_ID = 'feature-sizing-details';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const SIZING_DETAILS_FEATURE: FeatureMeta = {
  id: 'sizing-details',
  title: 'Sizing Details',
  route: SIZING_DETAILS_ROUTE,
  testId: SIZING_DETAILS_TEST_ID,
  domain: 'sizing',
  kind: 'details',
  itemCount: 10,
};

export function sizingDetailsItemPath(itemId: string): string {
  return `${SIZING_DETAILS_ROUTE}/${encodeURIComponent(itemId)}`;
}
