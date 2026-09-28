import { CommerceList } from '../../../components/commerce/list/commerce-list';
import { ANALYTICS_INSIGHTS_FEATURE } from './analytics-insights.routes';

export interface AnalyticsInsightsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function AnalyticsInsightsHeader({
  count,
  total,
  loading,
  onRefresh,
}: AnalyticsInsightsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${ANALYTICS_INSIGHTS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{ANALYTICS_INSIGHTS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {ANALYTICS_INSIGHTS_FEATURE.domain} ·{' '}
          {ANALYTICS_INSIGHTS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <CommerceList label="Items" value={count} tone="info" />
        <CommerceList label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${ANALYTICS_INSIGHTS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
