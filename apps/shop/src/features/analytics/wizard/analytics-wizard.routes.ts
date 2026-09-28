export const ANALYTICS_WIZARD_ROUTE = '/features/analytics-wizard';

export const ANALYTICS_WIZARD_TEST_ID = 'feature-analytics-wizard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const ANALYTICS_WIZARD_FEATURE: FeatureMeta = {
  id: 'analytics-wizard',
  title: 'Analytics Wizard',
  route: ANALYTICS_WIZARD_ROUTE,
  testId: ANALYTICS_WIZARD_TEST_ID,
  domain: 'analytics',
  kind: 'wizard',
  itemCount: 8,
};

export function analyticsWizardItemPath(itemId: string): string {
  return `${ANALYTICS_WIZARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
