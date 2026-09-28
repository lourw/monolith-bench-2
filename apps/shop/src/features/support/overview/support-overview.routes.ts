export const SUPPORT_OVERVIEW_ROUTE = '/features/support-overview';

export const SUPPORT_OVERVIEW_TEST_ID = 'feature-support-overview';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const SUPPORT_OVERVIEW_FEATURE: FeatureMeta = {
  id: 'support-overview',
  title: 'Support Overview',
  route: SUPPORT_OVERVIEW_ROUTE,
  testId: SUPPORT_OVERVIEW_TEST_ID,
  domain: 'support',
  kind: 'overview',
  itemCount: 10,
};

export function supportOverviewItemPath(itemId: string): string {
  return `${SUPPORT_OVERVIEW_ROUTE}/${encodeURIComponent(itemId)}`;
}
