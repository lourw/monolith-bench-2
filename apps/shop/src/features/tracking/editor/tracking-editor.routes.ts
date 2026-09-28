export const TRACKING_EDITOR_ROUTE = '/features/tracking-editor';

export const TRACKING_EDITOR_TEST_ID = 'feature-tracking-editor';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const TRACKING_EDITOR_FEATURE: FeatureMeta = {
  id: 'tracking-editor',
  title: 'Tracking Editor',
  route: TRACKING_EDITOR_ROUTE,
  testId: TRACKING_EDITOR_TEST_ID,
  domain: 'tracking',
  kind: 'editor',
  itemCount: 5,
};

export function trackingEditorItemPath(itemId: string): string {
  return `${TRACKING_EDITOR_ROUTE}/${encodeURIComponent(itemId)}`;
}
