import { CoreBadge } from '../../../components/core/badge/core-badge';
import { ANALYTICS_DETAILS_FEATURE } from './analytics-details.routes';

export interface AnalyticsDetailsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function AnalyticsDetailsHeader({
  count,
  total,
  loading,
  onRefresh,
}: AnalyticsDetailsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${ANALYTICS_DETAILS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{ANALYTICS_DETAILS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {ANALYTICS_DETAILS_FEATURE.domain} · {ANALYTICS_DETAILS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <CoreBadge label="Items" value={count} tone="info" />
        <CoreBadge label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${ANALYTICS_DETAILS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
