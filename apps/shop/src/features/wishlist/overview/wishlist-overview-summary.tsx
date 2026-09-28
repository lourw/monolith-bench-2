import { MediaListGroup } from '../../../components/media/list/media-list-group';
import { buildWishlistOverviewItems } from './wishlist-overview.model';
import { WISHLIST_OVERVIEW_FEATURE } from './wishlist-overview.routes';
import {
  pickWishlistOverviewHighlights,
  totalWishlistOverview,
} from './wishlist-overview.utils';

export interface WishlistOverviewSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function WishlistOverviewSummary({
  compact = false,
  limit = 3,
}: WishlistOverviewSummaryProps) {
  const items = buildWishlistOverviewItems();
  const totals = totalWishlistOverview(items);
  const highlights = pickWishlistOverviewHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${WISHLIST_OVERVIEW_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {WISHLIST_OVERVIEW_FEATURE.title}
      </h3>
      <MediaListGroup
        size="sm"
        items={[
          { id: 'items', label: 'Items', value: items.length },
          { id: 'amount', label: 'Amount', value: totals.amount },
          { id: 'active', label: 'Active', value: totals.active },
          { id: 'pending', label: 'Pending', value: totals.pending },
        ]}
      />
      {!compact ? (
        <ol className="feature-summary-highlights">
          {highlights.map((item) => (
            <li key={item.id}>
              {item.name} — {item.amount}
            </li>
          ))}
        </ol>
      ) : null}
    </section>
  );
}
