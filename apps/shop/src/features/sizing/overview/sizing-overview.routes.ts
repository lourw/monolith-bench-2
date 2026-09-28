export const SIZING_OVERVIEW_ROUTE = '/features/sizing-overview';

export const SIZING_OVERVIEW_TEST_ID = 'feature-sizing-overview';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const SIZING_OVERVIEW_FEATURE: FeatureMeta = {
  id: 'sizing-overview',
  title: 'Sizing Overview',
  route: SIZING_OVERVIEW_ROUTE,
  testId: SIZING_OVERVIEW_TEST_ID,
  domain: 'sizing',
  kind: 'overview',
  itemCount: 10,
};

export function sizingOverviewItemPath(itemId: string): string {
  return `${SIZING_OVERVIEW_ROUTE}/${encodeURIComponent(itemId)}`;
}
