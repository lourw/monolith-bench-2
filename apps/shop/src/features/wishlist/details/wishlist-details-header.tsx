import { DataBadge } from '../../../components/data/badge/data-badge';
import { WISHLIST_DETAILS_FEATURE } from './wishlist-details.routes';

export interface WishlistDetailsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function WishlistDetailsHeader({
  count,
  total,
  loading,
  onRefresh,
}: WishlistDetailsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${WISHLIST_DETAILS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{WISHLIST_DETAILS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {WISHLIST_DETAILS_FEATURE.domain} · {WISHLIST_DETAILS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <DataBadge label="Items" value={count} tone="info" />
        <DataBadge label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${WISHLIST_DETAILS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
