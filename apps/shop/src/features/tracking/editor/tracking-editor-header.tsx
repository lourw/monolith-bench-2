import { DataStat } from '../../../components/data/stat/data-stat';
import { TRACKING_EDITOR_FEATURE } from './tracking-editor.routes';

export interface TrackingEditorHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function TrackingEditorHeader({
  count,
  total,
  loading,
  onRefresh,
}: TrackingEditorHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${TRACKING_EDITOR_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{TRACKING_EDITOR_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {TRACKING_EDITOR_FEATURE.domain} · {TRACKING_EDITOR_FEATURE.kind}
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
          data-testid={`${TRACKING_EDITOR_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
