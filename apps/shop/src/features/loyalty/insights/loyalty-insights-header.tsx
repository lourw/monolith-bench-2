import { ChartsBanner } from '../../../components/charts/banner/charts-banner';
import { LOYALTY_INSIGHTS_FEATURE } from './loyalty-insights.routes';

export interface LoyaltyInsightsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function LoyaltyInsightsHeader({
  count,
  total,
  loading,
  onRefresh,
}: LoyaltyInsightsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${LOYALTY_INSIGHTS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{LOYALTY_INSIGHTS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {LOYALTY_INSIGHTS_FEATURE.domain} · {LOYALTY_INSIGHTS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <ChartsBanner label="Items" value={count} tone="info" />
        <ChartsBanner label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${LOYALTY_INSIGHTS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
