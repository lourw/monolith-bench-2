import { LayoutChip } from '../../../components/layout/chip/layout-chip';
import { CART_OVERVIEW_FEATURE } from './cart-overview.routes';

export interface CartOverviewHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function CartOverviewHeader({
  count,
  total,
  loading,
  onRefresh,
}: CartOverviewHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${CART_OVERVIEW_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{CART_OVERVIEW_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {CART_OVERVIEW_FEATURE.domain} · {CART_OVERVIEW_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <LayoutChip label="Items" value={count} tone="info" />
        <LayoutChip label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${CART_OVERVIEW_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
