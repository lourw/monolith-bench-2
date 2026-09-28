export const RECOMMENDATIONS_EDITOR_ROUTE = '/features/recommendations-editor';

export const RECOMMENDATIONS_EDITOR_TEST_ID = 'feature-recommendations-editor';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const RECOMMENDATIONS_EDITOR_FEATURE: FeatureMeta = {
  id: 'recommendations-editor',
  title: 'Recommendations Editor',
  route: RECOMMENDATIONS_EDITOR_ROUTE,
  testId: RECOMMENDATIONS_EDITOR_TEST_ID,
  domain: 'recommendations',
  kind: 'editor',
  itemCount: 11,
};

export function recommendationsEditorItemPath(itemId: string): string {
  return `${RECOMMENDATIONS_EDITOR_ROUTE}/${encodeURIComponent(itemId)}`;
}
