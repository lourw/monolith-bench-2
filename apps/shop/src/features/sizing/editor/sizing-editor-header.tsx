import { DataStat } from '../../../components/data/stat/data-stat';
import { SIZING_EDITOR_FEATURE } from './sizing-editor.routes';

export interface SizingEditorHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function SizingEditorHeader({
  count,
  total,
  loading,
  onRefresh,
}: SizingEditorHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${SIZING_EDITOR_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{SIZING_EDITOR_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {SIZING_EDITOR_FEATURE.domain} · {SIZING_EDITOR_FEATURE.kind}
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
          data-testid={`${SIZING_EDITOR_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
