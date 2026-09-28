import { FormsBanner } from '../../../components/forms/banner/forms-banner';
import { SIZING_HISTORY_FEATURE } from './sizing-history.routes';

export interface SizingHistoryHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function SizingHistoryHeader({
  count,
  total,
  loading,
  onRefresh,
}: SizingHistoryHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${SIZING_HISTORY_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{SIZING_HISTORY_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {SIZING_HISTORY_FEATURE.domain} · {SIZING_HISTORY_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <FormsBanner label="Items" value={count} tone="info" />
        <FormsBanner label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${SIZING_HISTORY_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
