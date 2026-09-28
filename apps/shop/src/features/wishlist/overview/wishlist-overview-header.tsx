import { MediaList } from '../../../components/media/list/media-list';
import { WISHLIST_OVERVIEW_FEATURE } from './wishlist-overview.routes';

export interface WishlistOverviewHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function WishlistOverviewHeader({
  count,
  total,
  loading,
  onRefresh,
}: WishlistOverviewHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${WISHLIST_OVERVIEW_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{WISHLIST_OVERVIEW_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {WISHLIST_OVERVIEW_FEATURE.domain} · {WISHLIST_OVERVIEW_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <MediaList label="Items" value={count} tone="info" />
        <MediaList label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${WISHLIST_OVERVIEW_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
