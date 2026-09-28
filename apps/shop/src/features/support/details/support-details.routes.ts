export const SUPPORT_DETAILS_ROUTE = '/features/support-details';

export const SUPPORT_DETAILS_TEST_ID = 'feature-support-details';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const SUPPORT_DETAILS_FEATURE: FeatureMeta = {
  id: 'support-details',
  title: 'Support Details',
  route: SUPPORT_DETAILS_ROUTE,
  testId: SUPPORT_DETAILS_TEST_ID,
  domain: 'support',
  kind: 'details',
  itemCount: 6,
};

export function supportDetailsItemPath(itemId: string): string {
  return `${SUPPORT_DETAILS_ROUTE}/${encodeURIComponent(itemId)}`;
}
