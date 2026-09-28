export const PROMOTIONS_DETAILS_ROUTE = '/features/promotions-details';

export const PROMOTIONS_DETAILS_TEST_ID = 'feature-promotions-details';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const PROMOTIONS_DETAILS_FEATURE: FeatureMeta = {
  id: 'promotions-details',
  title: 'Promotions Details',
  route: PROMOTIONS_DETAILS_ROUTE,
  testId: PROMOTIONS_DETAILS_TEST_ID,
  domain: 'promotions',
  kind: 'details',
  itemCount: 9,
};

export function promotionsDetailsItemPath(itemId: string): string {
  return `${PROMOTIONS_DETAILS_ROUTE}/${encodeURIComponent(itemId)}`;
}
