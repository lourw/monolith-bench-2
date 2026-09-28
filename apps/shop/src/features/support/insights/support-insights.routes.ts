export const SUPPORT_INSIGHTS_ROUTE = '/features/support-insights';

export const SUPPORT_INSIGHTS_TEST_ID = 'feature-support-insights';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const SUPPORT_INSIGHTS_FEATURE: FeatureMeta = {
  id: 'support-insights',
  title: 'Support Insights',
  route: SUPPORT_INSIGHTS_ROUTE,
  testId: SUPPORT_INSIGHTS_TEST_ID,
  domain: 'support',
  kind: 'insights',
  itemCount: 6,
};

export function supportInsightsItemPath(itemId: string): string {
  return `${SUPPORT_INSIGHTS_ROUTE}/${encodeURIComponent(itemId)}`;
}
