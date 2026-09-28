export const FEEDBACK_HISTORY_ROUTE = '/features/feedback-history';

export const FEEDBACK_HISTORY_TEST_ID = 'feature-feedback-history';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const FEEDBACK_HISTORY_FEATURE: FeatureMeta = {
  id: 'feedback-history',
  title: 'Feedback History',
  route: FEEDBACK_HISTORY_ROUTE,
  testId: FEEDBACK_HISTORY_TEST_ID,
  domain: 'feedback',
  kind: 'history',
  itemCount: 11,
};

export function feedbackHistoryItemPath(itemId: string): string {
  return `${FEEDBACK_HISTORY_ROUTE}/${encodeURIComponent(itemId)}`;
}
