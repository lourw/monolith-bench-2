export const AUTH_SUMMARY_ROUTE = '/features/auth-summary';

export const AUTH_SUMMARY_TEST_ID = 'feature-auth-summary';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const AUTH_SUMMARY_FEATURE: FeatureMeta = {
  id: 'auth-summary',
  title: 'Auth Summary',
  route: AUTH_SUMMARY_ROUTE,
  testId: AUTH_SUMMARY_TEST_ID,
  domain: 'auth',
  kind: 'summary',
  itemCount: 10,
};

export function authSummaryItemPath(itemId: string): string {
  return `${AUTH_SUMMARY_ROUTE}/${encodeURIComponent(itemId)}`;
}
