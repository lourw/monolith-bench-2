export const FEEDBACK_EDITOR_ROUTE = '/features/feedback-editor';

export const FEEDBACK_EDITOR_TEST_ID = 'feature-feedback-editor';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const FEEDBACK_EDITOR_FEATURE: FeatureMeta = {
  id: 'feedback-editor',
  title: 'Feedback Editor',
  route: FEEDBACK_EDITOR_ROUTE,
  testId: FEEDBACK_EDITOR_TEST_ID,
  domain: 'feedback',
  kind: 'editor',
  itemCount: 11,
};

export function feedbackEditorItemPath(itemId: string): string {
  return `${FEEDBACK_EDITOR_ROUTE}/${encodeURIComponent(itemId)}`;
}
