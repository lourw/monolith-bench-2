import { MarketingBanner } from '../../../components/marketing/banner/marketing-banner';
import { SHIPPING_WIZARD_FEATURE } from './shipping-wizard.routes';

export interface ShippingWizardHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function ShippingWizardHeader({
  count,
  total,
  loading,
  onRefresh,
}: ShippingWizardHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${SHIPPING_WIZARD_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{SHIPPING_WIZARD_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {SHIPPING_WIZARD_FEATURE.domain} · {SHIPPING_WIZARD_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <MarketingBanner label="Items" value={count} tone="info" />
        <MarketingBanner label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${SHIPPING_WIZARD_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
