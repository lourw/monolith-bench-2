import { LayoutTile } from '../../../components/layout/tile/layout-tile';
import { CART_LIST_FEATURE } from './cart-list.routes';

export interface CartListHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function CartListHeader({
  count,
  total,
  loading,
  onRefresh,
}: CartListHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${CART_LIST_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{CART_LIST_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {CART_LIST_FEATURE.domain} · {CART_LIST_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <LayoutTile label="Items" value={count} tone="info" />
        <LayoutTile label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${CART_LIST_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
