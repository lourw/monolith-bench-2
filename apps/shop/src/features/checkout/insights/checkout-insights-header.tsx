import { ChartsToolbar } from '../../../components/charts/toolbar/charts-toolbar';
import { CHECKOUT_INSIGHTS_FEATURE } from './checkout-insights.routes';

export interface CheckoutInsightsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function CheckoutInsightsHeader({
  count,
  total,
  loading,
  onRefresh,
}: CheckoutInsightsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${CHECKOUT_INSIGHTS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{CHECKOUT_INSIGHTS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {CHECKOUT_INSIGHTS_FEATURE.domain} · {CHECKOUT_INSIGHTS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <ChartsToolbar label="Items" value={count} tone="info" />
        <ChartsToolbar label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${CHECKOUT_INSIGHTS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
