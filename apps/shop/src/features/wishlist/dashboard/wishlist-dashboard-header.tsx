import { TypographyTile } from '../../../components/typography/tile/typography-tile';
import { WISHLIST_DASHBOARD_FEATURE } from './wishlist-dashboard.routes';

export interface WishlistDashboardHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function WishlistDashboardHeader({
  count,
  total,
  loading,
  onRefresh,
}: WishlistDashboardHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${WISHLIST_DASHBOARD_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{WISHLIST_DASHBOARD_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {WISHLIST_DASHBOARD_FEATURE.domain} ·{' '}
          {WISHLIST_DASHBOARD_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <TypographyTile label="Items" value={count} tone="info" />
        <TypographyTile label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${WISHLIST_DASHBOARD_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
