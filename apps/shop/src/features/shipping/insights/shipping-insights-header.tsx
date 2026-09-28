import { ChartsBanner } from '../../../components/charts/banner/charts-banner';
import { SHIPPING_INSIGHTS_FEATURE } from './shipping-insights.routes';

export interface ShippingInsightsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function ShippingInsightsHeader({
  count,
  total,
  loading,
  onRefresh,
}: ShippingInsightsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${SHIPPING_INSIGHTS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{SHIPPING_INSIGHTS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {SHIPPING_INSIGHTS_FEATURE.domain} · {SHIPPING_INSIGHTS_FEATURE.kind}
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
          data-testid={`${SHIPPING_INSIGHTS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
