import { LayoutHeader } from '../../../components/layout/header/layout-header';
import { SHIPPING_OVERVIEW_FEATURE } from './shipping-overview.routes';

export interface ShippingOverviewHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function ShippingOverviewHeader({
  count,
  total,
  loading,
  onRefresh,
}: ShippingOverviewHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${SHIPPING_OVERVIEW_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{SHIPPING_OVERVIEW_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {SHIPPING_OVERVIEW_FEATURE.domain} · {SHIPPING_OVERVIEW_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <LayoutHeader label="Items" value={count} tone="info" />
        <LayoutHeader label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${SHIPPING_OVERVIEW_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
