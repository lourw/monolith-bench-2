import { CorePanel } from '../../../components/core/panel/core-panel';
import { SHIPPING_SUMMARY_FEATURE } from './shipping-summary.routes';

export interface ShippingSummaryHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function ShippingSummaryHeader({
  count,
  total,
  loading,
  onRefresh,
}: ShippingSummaryHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${SHIPPING_SUMMARY_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{SHIPPING_SUMMARY_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {SHIPPING_SUMMARY_FEATURE.domain} · {SHIPPING_SUMMARY_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <CorePanel label="Items" value={count} tone="info" />
        <CorePanel label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${SHIPPING_SUMMARY_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
