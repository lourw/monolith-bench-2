export const FEEDBACK_LIST_ROUTE = '/features/feedback-list';

export const FEEDBACK_LIST_TEST_ID = 'feature-feedback-list';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const FEEDBACK_LIST_FEATURE: FeatureMeta = {
  id: 'feedback-list',
  title: 'Feedback List',
  route: FEEDBACK_LIST_ROUTE,
  testId: FEEDBACK_LIST_TEST_ID,
  domain: 'feedback',
  kind: 'list',
  itemCount: 8,
};

export function feedbackListItemPath(itemId: string): string {
  return `${FEEDBACK_LIST_ROUTE}/${encodeURIComponent(itemId)}`;
}
