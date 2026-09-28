import { OverlayCard } from '../../../components/overlay/card/overlay-card';
import { SHIPPING_LIST_FEATURE } from './shipping-list.routes';

export interface ShippingListHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function ShippingListHeader({
  count,
  total,
  loading,
  onRefresh,
}: ShippingListHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${SHIPPING_LIST_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{SHIPPING_LIST_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {SHIPPING_LIST_FEATURE.domain} · {SHIPPING_LIST_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <OverlayCard label="Items" value={count} tone="info" />
        <OverlayCard label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${SHIPPING_LIST_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
