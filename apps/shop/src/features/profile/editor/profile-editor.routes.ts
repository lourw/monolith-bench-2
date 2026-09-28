export const PROFILE_EDITOR_ROUTE = '/features/profile-editor';

export const PROFILE_EDITOR_TEST_ID = 'feature-profile-editor';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const PROFILE_EDITOR_FEATURE: FeatureMeta = {
  id: 'profile-editor',
  title: 'Profile Editor',
  route: PROFILE_EDITOR_ROUTE,
  testId: PROFILE_EDITOR_TEST_ID,
  domain: 'profile',
  kind: 'editor',
  itemCount: 10,
};

export function profileEditorItemPath(itemId: string): string {
  return `${PROFILE_EDITOR_ROUTE}/${encodeURIComponent(itemId)}`;
}
