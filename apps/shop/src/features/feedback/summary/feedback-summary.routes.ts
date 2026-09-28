export const FEEDBACK_SUMMARY_ROUTE = '/features/feedback-summary';

export const FEEDBACK_SUMMARY_TEST_ID = 'feature-feedback-summary';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const FEEDBACK_SUMMARY_FEATURE: FeatureMeta = {
  id: 'feedback-summary',
  title: 'Feedback Summary',
  route: FEEDBACK_SUMMARY_ROUTE,
  testId: FEEDBACK_SUMMARY_TEST_ID,
  domain: 'feedback',
  kind: 'summary',
  itemCount: 11,
};

export function feedbackSummaryItemPath(itemId: string): string {
  return `${FEEDBACK_SUMMARY_ROUTE}/${encodeURIComponent(itemId)}`;
}
