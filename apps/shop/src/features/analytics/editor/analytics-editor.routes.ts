export const ANALYTICS_EDITOR_ROUTE = '/features/analytics-editor';

export const ANALYTICS_EDITOR_TEST_ID = 'feature-analytics-editor';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const ANALYTICS_EDITOR_FEATURE: FeatureMeta = {
  id: 'analytics-editor',
  title: 'Analytics Editor',
  route: ANALYTICS_EDITOR_ROUTE,
  testId: ANALYTICS_EDITOR_TEST_ID,
  domain: 'analytics',
  kind: 'editor',
  itemCount: 10,
};

export function analyticsEditorItemPath(itemId: string): string {
  return `${ANALYTICS_EDITOR_ROUTE}/${encodeURIComponent(itemId)}`;
}
