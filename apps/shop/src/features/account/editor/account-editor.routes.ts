export const ACCOUNT_EDITOR_ROUTE = '/features/account-editor';

export const ACCOUNT_EDITOR_TEST_ID = 'feature-account-editor';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const ACCOUNT_EDITOR_FEATURE: FeatureMeta = {
  id: 'account-editor',
  title: 'Account Editor',
  route: ACCOUNT_EDITOR_ROUTE,
  testId: ACCOUNT_EDITOR_TEST_ID,
  domain: 'account',
  kind: 'editor',
  itemCount: 6,
};

export function accountEditorItemPath(itemId: string): string {
  return `${ACCOUNT_EDITOR_ROUTE}/${encodeURIComponent(itemId)}`;
}
