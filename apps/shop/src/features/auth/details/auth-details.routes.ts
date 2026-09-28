export const AUTH_DETAILS_ROUTE = '/features/auth-details';

export const AUTH_DETAILS_TEST_ID = 'feature-auth-details';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const AUTH_DETAILS_FEATURE: FeatureMeta = {
  id: 'auth-details',
  title: 'Auth Details',
  route: AUTH_DETAILS_ROUTE,
  testId: AUTH_DETAILS_TEST_ID,
  domain: 'auth',
  kind: 'details',
  itemCount: 9,
};

export function authDetailsItemPath(itemId: string): string {
  return `${AUTH_DETAILS_ROUTE}/${encodeURIComponent(itemId)}`;
}
