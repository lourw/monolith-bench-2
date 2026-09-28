export const FEEDBACK_INSIGHTS_ROUTE = '/features/feedback-insights';

export const FEEDBACK_INSIGHTS_TEST_ID = 'feature-feedback-insights';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const FEEDBACK_INSIGHTS_FEATURE: FeatureMeta = {
  id: 'feedback-insights',
  title: 'Feedback Insights',
  route: FEEDBACK_INSIGHTS_ROUTE,
  testId: FEEDBACK_INSIGHTS_TEST_ID,
  domain: 'feedback',
  kind: 'insights',
  itemCount: 9,
};

export function feedbackInsightsItemPath(itemId: string): string {
  return `${FEEDBACK_INSIGHTS_ROUTE}/${encodeURIComponent(itemId)}`;
}
