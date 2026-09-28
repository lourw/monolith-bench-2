import { DataStat } from '../../../components/data/stat/data-stat';
import { CATALOG_EDITOR_FEATURE } from './catalog-editor.routes';

export interface CatalogEditorHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function CatalogEditorHeader({
  count,
  total,
  loading,
  onRefresh,
}: CatalogEditorHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${CATALOG_EDITOR_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{CATALOG_EDITOR_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {CATALOG_EDITOR_FEATURE.domain} · {CATALOG_EDITOR_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <DataStat label="Items" value={count} tone="info" />
        <DataStat label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${CATALOG_EDITOR_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
