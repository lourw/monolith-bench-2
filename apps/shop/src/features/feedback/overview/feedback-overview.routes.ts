export const FEEDBACK_OVERVIEW_ROUTE = '/features/feedback-overview';

export const FEEDBACK_OVERVIEW_TEST_ID = 'feature-feedback-overview';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const FEEDBACK_OVERVIEW_FEATURE: FeatureMeta = {
  id: 'feedback-overview',
  title: 'Feedback Overview',
  route: FEEDBACK_OVERVIEW_ROUTE,
  testId: FEEDBACK_OVERVIEW_TEST_ID,
  domain: 'feedback',
  kind: 'overview',
  itemCount: 10,
};

export function feedbackOverviewItemPath(itemId: string): string {
  return `${FEEDBACK_OVERVIEW_ROUTE}/${encodeURIComponent(itemId)}`;
}
