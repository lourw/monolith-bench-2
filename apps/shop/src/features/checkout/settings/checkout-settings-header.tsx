import { TypographyBadge } from '../../../components/typography/badge/typography-badge';
import { CHECKOUT_SETTINGS_FEATURE } from './checkout-settings.routes';

export interface CheckoutSettingsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function CheckoutSettingsHeader({
  count,
  total,
  loading,
  onRefresh,
}: CheckoutSettingsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${CHECKOUT_SETTINGS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{CHECKOUT_SETTINGS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {CHECKOUT_SETTINGS_FEATURE.domain} · {CHECKOUT_SETTINGS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <TypographyBadge label="Items" value={count} tone="info" />
        <TypographyBadge label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${CHECKOUT_SETTINGS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
