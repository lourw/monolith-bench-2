export const FEEDBACK_DETAILS_ROUTE = '/features/feedback-details';

export const FEEDBACK_DETAILS_TEST_ID = 'feature-feedback-details';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const FEEDBACK_DETAILS_FEATURE: FeatureMeta = {
  id: 'feedback-details',
  title: 'Feedback Details',
  route: FEEDBACK_DETAILS_ROUTE,
  testId: FEEDBACK_DETAILS_TEST_ID,
  domain: 'feedback',
  kind: 'details',
  itemCount: 10,
};

export function feedbackDetailsItemPath(itemId: string): string {
  return `${FEEDBACK_DETAILS_ROUTE}/${encodeURIComponent(itemId)}`;
}
