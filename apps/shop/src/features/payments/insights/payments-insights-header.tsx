import { ChartsBanner } from '../../../components/charts/banner/charts-banner';
import { PAYMENTS_INSIGHTS_FEATURE } from './payments-insights.routes';

export interface PaymentsInsightsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function PaymentsInsightsHeader({
  count,
  total,
  loading,
  onRefresh,
}: PaymentsInsightsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${PAYMENTS_INSIGHTS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{PAYMENTS_INSIGHTS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {PAYMENTS_INSIGHTS_FEATURE.domain} · {PAYMENTS_INSIGHTS_FEATURE.kind}
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
          data-testid={`${PAYMENTS_INSIGHTS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
