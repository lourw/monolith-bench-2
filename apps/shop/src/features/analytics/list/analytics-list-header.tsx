import { CoreChip } from '../../../components/core/chip/core-chip';
import { ANALYTICS_LIST_FEATURE } from './analytics-list.routes';

export interface AnalyticsListHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function AnalyticsListHeader({
  count,
  total,
  loading,
  onRefresh,
}: AnalyticsListHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${ANALYTICS_LIST_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{ANALYTICS_LIST_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {ANALYTICS_LIST_FEATURE.domain} · {ANALYTICS_LIST_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <CoreChip label="Items" value={count} tone="info" />
        <CoreChip label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${ANALYTICS_LIST_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
