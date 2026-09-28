import { MarketingPanel } from '../../../components/marketing/panel/marketing-panel';
import { RECOMMENDATIONS_DASHBOARD_FEATURE } from './recommendations-dashboard.routes';

export interface RecommendationsDashboardHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function RecommendationsDashboardHeader({
  count,
  total,
  loading,
  onRefresh,
}: RecommendationsDashboardHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${RECOMMENDATIONS_DASHBOARD_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">
          {RECOMMENDATIONS_DASHBOARD_FEATURE.title}
        </h1>
        <p className="feature-subtitle">
          {RECOMMENDATIONS_DASHBOARD_FEATURE.domain} ·{' '}
          {RECOMMENDATIONS_DASHBOARD_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <MarketingPanel label="Items" value={count} tone="info" />
        <MarketingPanel label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${RECOMMENDATIONS_DASHBOARD_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
