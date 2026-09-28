import { ChartsChip } from '../../../components/charts/chip/charts-chip';
import { STORE_LOCATOR_EDITOR_FEATURE } from './store-locator-editor.routes';

export interface StoreLocatorEditorHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function StoreLocatorEditorHeader({
  count,
  total,
  loading,
  onRefresh,
}: StoreLocatorEditorHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${STORE_LOCATOR_EDITOR_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{STORE_LOCATOR_EDITOR_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {STORE_LOCATOR_EDITOR_FEATURE.domain} ·{' '}
          {STORE_LOCATOR_EDITOR_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <ChartsChip label="Items" value={count} tone="info" />
        <ChartsChip label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${STORE_LOCATOR_EDITOR_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
