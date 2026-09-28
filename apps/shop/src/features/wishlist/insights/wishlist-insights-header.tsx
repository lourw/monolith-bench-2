import { DataBanner } from '../../../components/data/banner/data-banner';
import { WISHLIST_INSIGHTS_FEATURE } from './wishlist-insights.routes';

export interface WishlistInsightsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function WishlistInsightsHeader({
  count,
  total,
  loading,
  onRefresh,
}: WishlistInsightsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${WISHLIST_INSIGHTS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{WISHLIST_INSIGHTS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {WISHLIST_INSIGHTS_FEATURE.domain} · {WISHLIST_INSIGHTS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <DataBanner label="Items" value={count} tone="info" />
        <DataBanner label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${WISHLIST_INSIGHTS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
