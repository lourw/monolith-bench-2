import { LayoutBadge } from '../../../components/layout/badge/layout-badge';
import { CHECKOUT_LIST_FEATURE } from './checkout-list.routes';

export interface CheckoutListHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function CheckoutListHeader({
  count,
  total,
  loading,
  onRefresh,
}: CheckoutListHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${CHECKOUT_LIST_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{CHECKOUT_LIST_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {CHECKOUT_LIST_FEATURE.domain} · {CHECKOUT_LIST_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <LayoutBadge label="Items" value={count} tone="info" />
        <LayoutBadge label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${CHECKOUT_LIST_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
