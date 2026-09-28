import { CoreTile } from '../../../components/core/tile/core-tile';
import { CART_WIZARD_FEATURE } from './cart-wizard.routes';

export interface CartWizardHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function CartWizardHeader({
  count,
  total,
  loading,
  onRefresh,
}: CartWizardHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${CART_WIZARD_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{CART_WIZARD_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {CART_WIZARD_FEATURE.domain} · {CART_WIZARD_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <CoreTile label="Items" value={count} tone="info" />
        <CoreTile label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${CART_WIZARD_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
