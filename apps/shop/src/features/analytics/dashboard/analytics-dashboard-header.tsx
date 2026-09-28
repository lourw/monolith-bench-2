import { FormsBadge } from '../../../components/forms/badge/forms-badge';
import { ANALYTICS_DASHBOARD_FEATURE } from './analytics-dashboard.routes';

export interface AnalyticsDashboardHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function AnalyticsDashboardHeader({
  count,
  total,
  loading,
  onRefresh,
}: AnalyticsDashboardHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${ANALYTICS_DASHBOARD_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{ANALYTICS_DASHBOARD_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {ANALYTICS_DASHBOARD_FEATURE.domain} ·{' '}
          {ANALYTICS_DASHBOARD_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <FormsBadge label="Items" value={count} tone="info" />
        <FormsBadge label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${ANALYTICS_DASHBOARD_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
