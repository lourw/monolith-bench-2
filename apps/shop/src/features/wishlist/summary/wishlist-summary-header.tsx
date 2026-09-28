import { DataChip } from '../../../components/data/chip/data-chip';
import { WISHLIST_SUMMARY_FEATURE } from './wishlist-summary.routes';

export interface WishlistSummaryHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function WishlistSummaryHeader({
  count,
  total,
  loading,
  onRefresh,
}: WishlistSummaryHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${WISHLIST_SUMMARY_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{WISHLIST_SUMMARY_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {WISHLIST_SUMMARY_FEATURE.domain} · {WISHLIST_SUMMARY_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <DataChip label="Items" value={count} tone="info" />
        <DataChip label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${WISHLIST_SUMMARY_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
