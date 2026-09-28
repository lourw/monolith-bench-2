import { CommerceBadge } from '../../../components/commerce/badge/commerce-badge';
import { ORDERS_WIZARD_FEATURE } from './orders-wizard.routes';

export interface OrdersWizardHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function OrdersWizardHeader({
  count,
  total,
  loading,
  onRefresh,
}: OrdersWizardHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${ORDERS_WIZARD_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{ORDERS_WIZARD_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {ORDERS_WIZARD_FEATURE.domain} · {ORDERS_WIZARD_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <CommerceBadge label="Items" value={count} tone="info" />
        <CommerceBadge label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${ORDERS_WIZARD_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
