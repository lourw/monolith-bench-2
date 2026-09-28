import { OverlayCard } from '../../../components/overlay/card/overlay-card';
import { SHIPPING_HISTORY_FEATURE } from './shipping-history.routes';

export interface ShippingHistoryHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function ShippingHistoryHeader({
  count,
  total,
  loading,
  onRefresh,
}: ShippingHistoryHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${SHIPPING_HISTORY_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{SHIPPING_HISTORY_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {SHIPPING_HISTORY_FEATURE.domain} · {SHIPPING_HISTORY_FEATURE.kind}
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
          data-testid={`${SHIPPING_HISTORY_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
