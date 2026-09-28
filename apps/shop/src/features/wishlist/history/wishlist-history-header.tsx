import { MarketingPanel } from '../../../components/marketing/panel/marketing-panel';
import { WISHLIST_HISTORY_FEATURE } from './wishlist-history.routes';

export interface WishlistHistoryHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function WishlistHistoryHeader({
  count,
  total,
  loading,
  onRefresh,
}: WishlistHistoryHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${WISHLIST_HISTORY_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{WISHLIST_HISTORY_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {WISHLIST_HISTORY_FEATURE.domain} · {WISHLIST_HISTORY_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <MarketingPanel label="Items" value={count} tone="info" />
        <MarketingPanel label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${WISHLIST_HISTORY_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
