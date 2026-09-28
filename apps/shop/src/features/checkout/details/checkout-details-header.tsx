import { ChartsHeader } from '../../../components/charts/header/charts-header';
import { CHECKOUT_DETAILS_FEATURE } from './checkout-details.routes';

export interface CheckoutDetailsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function CheckoutDetailsHeader({
  count,
  total,
  loading,
  onRefresh,
}: CheckoutDetailsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${CHECKOUT_DETAILS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{CHECKOUT_DETAILS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {CHECKOUT_DETAILS_FEATURE.domain} · {CHECKOUT_DETAILS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <ChartsHeader label="Items" value={count} tone="info" />
        <ChartsHeader label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${CHECKOUT_DETAILS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
