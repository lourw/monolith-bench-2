export const PREORDERS_OVERVIEW_ROUTE = '/features/preorders-overview';

export const PREORDERS_OVERVIEW_TEST_ID = 'feature-preorders-overview';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const PREORDERS_OVERVIEW_FEATURE: FeatureMeta = {
  id: 'preorders-overview',
  title: 'Preorders Overview',
  route: PREORDERS_OVERVIEW_ROUTE,
  testId: PREORDERS_OVERVIEW_TEST_ID,
  domain: 'preorders',
  kind: 'overview',
  itemCount: 12,
};

export function preordersOverviewItemPath(itemId: string): string {
  return `${PREORDERS_OVERVIEW_ROUTE}/${encodeURIComponent(itemId)}`;
}
