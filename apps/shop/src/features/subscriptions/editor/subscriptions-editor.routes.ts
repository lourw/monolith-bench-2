export const SUBSCRIPTIONS_EDITOR_ROUTE = '/features/subscriptions-editor';

export const SUBSCRIPTIONS_EDITOR_TEST_ID = 'feature-subscriptions-editor';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const SUBSCRIPTIONS_EDITOR_FEATURE: FeatureMeta = {
  id: 'subscriptions-editor',
  title: 'Subscriptions Editor',
  route: SUBSCRIPTIONS_EDITOR_ROUTE,
  testId: SUBSCRIPTIONS_EDITOR_TEST_ID,
  domain: 'subscriptions',
  kind: 'editor',
  itemCount: 9,
};

export function subscriptionsEditorItemPath(itemId: string): string {
  return `${SUBSCRIPTIONS_EDITOR_ROUTE}/${encodeURIComponent(itemId)}`;
}
