export const REVIEWS_WIZARD_ROUTE = '/features/reviews-wizard';

export const REVIEWS_WIZARD_TEST_ID = 'feature-reviews-wizard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const REVIEWS_WIZARD_FEATURE: FeatureMeta = {
  id: 'reviews-wizard',
  title: 'Reviews Wizard',
  route: REVIEWS_WIZARD_ROUTE,
  testId: REVIEWS_WIZARD_TEST_ID,
  domain: 'reviews',
  kind: 'wizard',
  itemCount: 10,
};

export function reviewsWizardItemPath(itemId: string): string {
  return `${REVIEWS_WIZARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
