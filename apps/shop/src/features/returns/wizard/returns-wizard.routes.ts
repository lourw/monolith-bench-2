export const RETURNS_WIZARD_ROUTE = '/features/returns-wizard';

export const RETURNS_WIZARD_TEST_ID = 'feature-returns-wizard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const RETURNS_WIZARD_FEATURE: FeatureMeta = {
  id: 'returns-wizard',
  title: 'Returns Wizard',
  route: RETURNS_WIZARD_ROUTE,
  testId: RETURNS_WIZARD_TEST_ID,
  domain: 'returns',
  kind: 'wizard',
  itemCount: 11,
};

export function returnsWizardItemPath(itemId: string): string {
  return `${RETURNS_WIZARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
