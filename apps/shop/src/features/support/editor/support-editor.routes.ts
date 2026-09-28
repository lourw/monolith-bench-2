export const SUPPORT_EDITOR_ROUTE = '/features/support-editor';

export const SUPPORT_EDITOR_TEST_ID = 'feature-support-editor';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const SUPPORT_EDITOR_FEATURE: FeatureMeta = {
  id: 'support-editor',
  title: 'Support Editor',
  route: SUPPORT_EDITOR_ROUTE,
  testId: SUPPORT_EDITOR_TEST_ID,
  domain: 'support',
  kind: 'editor',
  itemCount: 6,
};

export function supportEditorItemPath(itemId: string): string {
  return `${SUPPORT_EDITOR_ROUTE}/${encodeURIComponent(itemId)}`;
}
