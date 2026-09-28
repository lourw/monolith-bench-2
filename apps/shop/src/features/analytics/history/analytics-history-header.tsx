import { ChartsChip } from '../../../components/charts/chip/charts-chip';
import { ANALYTICS_HISTORY_FEATURE } from './analytics-history.routes';

export interface AnalyticsHistoryHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function AnalyticsHistoryHeader({
  count,
  total,
  loading,
  onRefresh,
}: AnalyticsHistoryHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${ANALYTICS_HISTORY_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{ANALYTICS_HISTORY_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {ANALYTICS_HISTORY_FEATURE.domain} · {ANALYTICS_HISTORY_FEATURE.kind}
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
          data-testid={`${ANALYTICS_HISTORY_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
