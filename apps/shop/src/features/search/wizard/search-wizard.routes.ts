export const SEARCH_WIZARD_ROUTE = '/features/search-wizard';

export const SEARCH_WIZARD_TEST_ID = 'feature-search-wizard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const SEARCH_WIZARD_FEATURE: FeatureMeta = {
  id: 'search-wizard',
  title: 'Search Wizard',
  route: SEARCH_WIZARD_ROUTE,
  testId: SEARCH_WIZARD_TEST_ID,
  domain: 'search',
  kind: 'wizard',
  itemCount: 5,
};

export function searchWizardItemPath(itemId: string): string {
  return `${SEARCH_WIZARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
