import { TypographyToolbar } from '../../../components/typography/toolbar/typography-toolbar';
import { ORDERS_SETTINGS_FEATURE } from './orders-settings.routes';

export interface OrdersSettingsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function OrdersSettingsHeader({
  count,
  total,
  loading,
  onRefresh,
}: OrdersSettingsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${ORDERS_SETTINGS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{ORDERS_SETTINGS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {ORDERS_SETTINGS_FEATURE.domain} · {ORDERS_SETTINGS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <TypographyToolbar label="Items" value={count} tone="info" />
        <TypographyToolbar label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${ORDERS_SETTINGS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
