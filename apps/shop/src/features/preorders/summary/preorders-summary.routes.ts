export const PREORDERS_SUMMARY_ROUTE = '/features/preorders-summary';

export const PREORDERS_SUMMARY_TEST_ID = 'feature-preorders-summary';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const PREORDERS_SUMMARY_FEATURE: FeatureMeta = {
  id: 'preorders-summary',
  title: 'Preorders Summary',
  route: PREORDERS_SUMMARY_ROUTE,
  testId: PREORDERS_SUMMARY_TEST_ID,
  domain: 'preorders',
  kind: 'summary',
  itemCount: 11,
};

export function preordersSummaryItemPath(itemId: string): string {
  return `${PREORDERS_SUMMARY_ROUTE}/${encodeURIComponent(itemId)}`;
}
