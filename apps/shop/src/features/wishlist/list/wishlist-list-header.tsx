import { ChartsBadge } from '../../../components/charts/badge/charts-badge';
import { WISHLIST_LIST_FEATURE } from './wishlist-list.routes';

export interface WishlistListHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function WishlistListHeader({
  count,
  total,
  loading,
  onRefresh,
}: WishlistListHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${WISHLIST_LIST_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{WISHLIST_LIST_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {WISHLIST_LIST_FEATURE.domain} · {WISHLIST_LIST_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <ChartsBadge label="Items" value={count} tone="info" />
        <ChartsBadge label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${WISHLIST_LIST_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
