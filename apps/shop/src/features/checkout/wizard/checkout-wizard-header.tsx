import { CommerceToolbar } from '../../../components/commerce/toolbar/commerce-toolbar';
import { CHECKOUT_WIZARD_FEATURE } from './checkout-wizard.routes';

export interface CheckoutWizardHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function CheckoutWizardHeader({
  count,
  total,
  loading,
  onRefresh,
}: CheckoutWizardHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${CHECKOUT_WIZARD_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{CHECKOUT_WIZARD_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {CHECKOUT_WIZARD_FEATURE.domain} · {CHECKOUT_WIZARD_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <CommerceToolbar label="Items" value={count} tone="info" />
        <CommerceToolbar label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${CHECKOUT_WIZARD_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
