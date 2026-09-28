export const RECOMMENDATIONS_WIZARD_ROUTE = '/features/recommendations-wizard';

export const RECOMMENDATIONS_WIZARD_TEST_ID = 'feature-recommendations-wizard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const RECOMMENDATIONS_WIZARD_FEATURE: FeatureMeta = {
  id: 'recommendations-wizard',
  title: 'Recommendations Wizard',
  route: RECOMMENDATIONS_WIZARD_ROUTE,
  testId: RECOMMENDATIONS_WIZARD_TEST_ID,
  domain: 'recommendations',
  kind: 'wizard',
  itemCount: 11,
};

export function recommendationsWizardItemPath(itemId: string): string {
  return `${RECOMMENDATIONS_WIZARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
