import { InputsBadge } from '../../../components/inputs/badge/inputs-badge';
import { ORDERS_LIST_FEATURE } from './orders-list.routes';

export interface OrdersListHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function OrdersListHeader({
  count,
  total,
  loading,
  onRefresh,
}: OrdersListHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${ORDERS_LIST_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{ORDERS_LIST_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {ORDERS_LIST_FEATURE.domain} · {ORDERS_LIST_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <InputsBadge label="Items" value={count} tone="info" />
        <InputsBadge label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${ORDERS_LIST_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
