export const FEEDBACK_DASHBOARD_ROUTE = '/features/feedback-dashboard';

export const FEEDBACK_DASHBOARD_TEST_ID = 'feature-feedback-dashboard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const FEEDBACK_DASHBOARD_FEATURE: FeatureMeta = {
  id: 'feedback-dashboard',
  title: 'Feedback Dashboard',
  route: FEEDBACK_DASHBOARD_ROUTE,
  testId: FEEDBACK_DASHBOARD_TEST_ID,
  domain: 'feedback',
  kind: 'dashboard',
  itemCount: 10,
};

export function feedbackDashboardItemPath(itemId: string): string {
  return `${FEEDBACK_DASHBOARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
