export const FEEDBACK_WIZARD_ROUTE = '/features/feedback-wizard';

export const FEEDBACK_WIZARD_TEST_ID = 'feature-feedback-wizard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const FEEDBACK_WIZARD_FEATURE: FeatureMeta = {
  id: 'feedback-wizard',
  title: 'Feedback Wizard',
  route: FEEDBACK_WIZARD_ROUTE,
  testId: FEEDBACK_WIZARD_TEST_ID,
  domain: 'feedback',
  kind: 'wizard',
  itemCount: 11,
};

export function feedbackWizardItemPath(itemId: string): string {
  return `${FEEDBACK_WIZARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
