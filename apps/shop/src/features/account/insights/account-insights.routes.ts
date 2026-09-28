export const ACCOUNT_INSIGHTS_ROUTE = '/features/account-insights';

export const ACCOUNT_INSIGHTS_TEST_ID = 'feature-account-insights';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const ACCOUNT_INSIGHTS_FEATURE: FeatureMeta = {
  id: 'account-insights',
  title: 'Account Insights',
  route: ACCOUNT_INSIGHTS_ROUTE,
  testId: ACCOUNT_INSIGHTS_TEST_ID,
  domain: 'account',
  kind: 'insights',
  itemCount: 10,
};

export function accountInsightsItemPath(itemId: string): string {
  return `${ACCOUNT_INSIGHTS_ROUTE}/${encodeURIComponent(itemId)}`;
}
