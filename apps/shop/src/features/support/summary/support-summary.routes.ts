export const SUPPORT_SUMMARY_ROUTE = '/features/support-summary';

export const SUPPORT_SUMMARY_TEST_ID = 'feature-support-summary';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const SUPPORT_SUMMARY_FEATURE: FeatureMeta = {
  id: 'support-summary',
  title: 'Support Summary',
  route: SUPPORT_SUMMARY_ROUTE,
  testId: SUPPORT_SUMMARY_TEST_ID,
  domain: 'support',
  kind: 'summary',
  itemCount: 11,
};

export function supportSummaryItemPath(itemId: string): string {
  return `${SUPPORT_SUMMARY_ROUTE}/${encodeURIComponent(itemId)}`;
}
