import { LayoutList } from '../../../components/layout/list/layout-list';
import { SHIPPING_DETAILS_FEATURE } from './shipping-details.routes';

export interface ShippingDetailsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function ShippingDetailsHeader({
  count,
  total,
  loading,
  onRefresh,
}: ShippingDetailsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${SHIPPING_DETAILS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{SHIPPING_DETAILS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {SHIPPING_DETAILS_FEATURE.domain} · {SHIPPING_DETAILS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <LayoutList label="Items" value={count} tone="info" />
        <LayoutList label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${SHIPPING_DETAILS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
