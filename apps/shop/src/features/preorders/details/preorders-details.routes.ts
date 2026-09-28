export const PREORDERS_DETAILS_ROUTE = '/features/preorders-details';

export const PREORDERS_DETAILS_TEST_ID = 'feature-preorders-details';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const PREORDERS_DETAILS_FEATURE: FeatureMeta = {
  id: 'preorders-details',
  title: 'Preorders Details',
  route: PREORDERS_DETAILS_ROUTE,
  testId: PREORDERS_DETAILS_TEST_ID,
  domain: 'preorders',
  kind: 'details',
  itemCount: 10,
};

export function preordersDetailsItemPath(itemId: string): string {
  return `${PREORDERS_DETAILS_ROUTE}/${encodeURIComponent(itemId)}`;
}
