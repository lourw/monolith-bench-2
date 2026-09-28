export const AUTH_INSIGHTS_ROUTE = '/features/auth-insights';

export const AUTH_INSIGHTS_TEST_ID = 'feature-auth-insights';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const AUTH_INSIGHTS_FEATURE: FeatureMeta = {
  id: 'auth-insights',
  title: 'Auth Insights',
  route: AUTH_INSIGHTS_ROUTE,
  testId: AUTH_INSIGHTS_TEST_ID,
  domain: 'auth',
  kind: 'insights',
  itemCount: 10,
};

export function authInsightsItemPath(itemId: string): string {
  return `${AUTH_INSIGHTS_ROUTE}/${encodeURIComponent(itemId)}`;
}
