import { ChartsTile } from '../../../components/charts/tile/charts-tile';
import { ORDERS_INSIGHTS_FEATURE } from './orders-insights.routes';

export interface OrdersInsightsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function OrdersInsightsHeader({
  count,
  total,
  loading,
  onRefresh,
}: OrdersInsightsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${ORDERS_INSIGHTS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{ORDERS_INSIGHTS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {ORDERS_INSIGHTS_FEATURE.domain} · {ORDERS_INSIGHTS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <ChartsTile label="Items" value={count} tone="info" />
        <ChartsTile label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${ORDERS_INSIGHTS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
