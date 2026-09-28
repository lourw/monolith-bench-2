import { LayoutStat } from '../../../components/layout/stat/layout-stat';
import { CART_HISTORY_FEATURE } from './cart-history.routes';

export interface CartHistoryHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function CartHistoryHeader({
  count,
  total,
  loading,
  onRefresh,
}: CartHistoryHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${CART_HISTORY_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{CART_HISTORY_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {CART_HISTORY_FEATURE.domain} · {CART_HISTORY_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <LayoutStat label="Items" value={count} tone="info" />
        <LayoutStat label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${CART_HISTORY_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
