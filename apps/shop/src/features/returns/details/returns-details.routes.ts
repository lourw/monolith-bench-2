export const RETURNS_DETAILS_ROUTE = '/features/returns-details';

export const RETURNS_DETAILS_TEST_ID = 'feature-returns-details';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const RETURNS_DETAILS_FEATURE: FeatureMeta = {
  id: 'returns-details',
  title: 'Returns Details',
  route: RETURNS_DETAILS_ROUTE,
  testId: RETURNS_DETAILS_TEST_ID,
  domain: 'returns',
  kind: 'details',
  itemCount: 5,
};

export function returnsDetailsItemPath(itemId: string): string {
  return `${RETURNS_DETAILS_ROUTE}/${encodeURIComponent(itemId)}`;
}
