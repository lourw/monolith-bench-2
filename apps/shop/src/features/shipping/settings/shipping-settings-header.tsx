import { LayoutCard } from '../../../components/layout/card/layout-card';
import { SHIPPING_SETTINGS_FEATURE } from './shipping-settings.routes';

export interface ShippingSettingsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function ShippingSettingsHeader({
  count,
  total,
  loading,
  onRefresh,
}: ShippingSettingsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${SHIPPING_SETTINGS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{SHIPPING_SETTINGS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {SHIPPING_SETTINGS_FEATURE.domain} · {SHIPPING_SETTINGS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <LayoutCard label="Items" value={count} tone="info" />
        <LayoutCard label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${SHIPPING_SETTINGS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
