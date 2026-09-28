export const RETURNS_OVERVIEW_ROUTE = '/features/returns-overview';

export const RETURNS_OVERVIEW_TEST_ID = 'feature-returns-overview';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const RETURNS_OVERVIEW_FEATURE: FeatureMeta = {
  id: 'returns-overview',
  title: 'Returns Overview',
  route: RETURNS_OVERVIEW_ROUTE,
  testId: RETURNS_OVERVIEW_TEST_ID,
  domain: 'returns',
  kind: 'overview',
  itemCount: 12,
};

export function returnsOverviewItemPath(itemId: string): string {
  return `${RETURNS_OVERVIEW_ROUTE}/${encodeURIComponent(itemId)}`;
}
