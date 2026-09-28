export const SUPPORT_LIST_ROUTE = '/features/support-list';

export const SUPPORT_LIST_TEST_ID = 'feature-support-list';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const SUPPORT_LIST_FEATURE: FeatureMeta = {
  id: 'support-list',
  title: 'Support List',
  route: SUPPORT_LIST_ROUTE,
  testId: SUPPORT_LIST_TEST_ID,
  domain: 'support',
  kind: 'list',
  itemCount: 11,
};

export function supportListItemPath(itemId: string): string {
  return `${SUPPORT_LIST_ROUTE}/${encodeURIComponent(itemId)}`;
}
