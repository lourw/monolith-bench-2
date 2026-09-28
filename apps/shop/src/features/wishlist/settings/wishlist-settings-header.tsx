import { CommerceStat } from '../../../components/commerce/stat/commerce-stat';
import { WISHLIST_SETTINGS_FEATURE } from './wishlist-settings.routes';

export interface WishlistSettingsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function WishlistSettingsHeader({
  count,
  total,
  loading,
  onRefresh,
}: WishlistSettingsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${WISHLIST_SETTINGS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{WISHLIST_SETTINGS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {WISHLIST_SETTINGS_FEATURE.domain} · {WISHLIST_SETTINGS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <CommerceStat label="Items" value={count} tone="info" />
        <CommerceStat label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${WISHLIST_SETTINGS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
