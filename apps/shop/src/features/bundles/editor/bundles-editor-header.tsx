import { LayoutCard } from '../../../components/layout/card/layout-card';
import { BUNDLES_EDITOR_FEATURE } from './bundles-editor.routes';

export interface BundlesEditorHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function BundlesEditorHeader({
  count,
  total,
  loading,
  onRefresh,
}: BundlesEditorHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${BUNDLES_EDITOR_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{BUNDLES_EDITOR_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {BUNDLES_EDITOR_FEATURE.domain} · {BUNDLES_EDITOR_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <LayoutCard label="Items" value={count} tone="info" />
        <LayoutCard label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${BUNDLES_EDITOR_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
