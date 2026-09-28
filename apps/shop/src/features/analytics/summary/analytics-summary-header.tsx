import { CoreCard } from '../../../components/core/card/core-card';
import { ANALYTICS_SUMMARY_FEATURE } from './analytics-summary.routes';

export interface AnalyticsSummaryHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function AnalyticsSummaryHeader({
  count,
  total,
  loading,
  onRefresh,
}: AnalyticsSummaryHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${ANALYTICS_SUMMARY_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{ANALYTICS_SUMMARY_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {ANALYTICS_SUMMARY_FEATURE.domain} · {ANALYTICS_SUMMARY_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <CoreCard label="Items" value={count} tone="info" />
        <CoreCard label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${ANALYTICS_SUMMARY_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
