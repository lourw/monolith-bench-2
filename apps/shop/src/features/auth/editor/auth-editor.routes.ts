export const AUTH_EDITOR_ROUTE = '/features/auth-editor';

export const AUTH_EDITOR_TEST_ID = 'feature-auth-editor';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const AUTH_EDITOR_FEATURE: FeatureMeta = {
  id: 'auth-editor',
  title: 'Auth Editor',
  route: AUTH_EDITOR_ROUTE,
  testId: AUTH_EDITOR_TEST_ID,
  domain: 'auth',
  kind: 'editor',
  itemCount: 11,
};

export function authEditorItemPath(itemId: string): string {
  return `${AUTH_EDITOR_ROUTE}/${encodeURIComponent(itemId)}`;
}
