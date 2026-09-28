import { DataCard } from '../../../components/data/card/data-card';
import { CART_INSIGHTS_FEATURE } from './cart-insights.routes';

export interface CartInsightsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function CartInsightsHeader({
  count,
  total,
  loading,
  onRefresh,
}: CartInsightsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${CART_INSIGHTS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{CART_INSIGHTS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {CART_INSIGHTS_FEATURE.domain} · {CART_INSIGHTS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <DataCard label="Items" value={count} tone="info" />
        <DataCard label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${CART_INSIGHTS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
