export const TRACKING_WIZARD_ROUTE = '/features/tracking-wizard';

export const TRACKING_WIZARD_TEST_ID = 'feature-tracking-wizard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const TRACKING_WIZARD_FEATURE: FeatureMeta = {
  id: 'tracking-wizard',
  title: 'Tracking Wizard',
  route: TRACKING_WIZARD_ROUTE,
  testId: TRACKING_WIZARD_TEST_ID,
  domain: 'tracking',
  kind: 'wizard',
  itemCount: 9,
};

export function trackingWizardItemPath(itemId: string): string {
  return `${TRACKING_WIZARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
