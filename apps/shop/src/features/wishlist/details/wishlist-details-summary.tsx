import { DataBadgeGroup } from '../../../components/data/badge/data-badge-group';
import { buildWishlistDetailsItems } from './wishlist-details.model';
import { WISHLIST_DETAILS_FEATURE } from './wishlist-details.routes';
import {
  pickWishlistDetailsHighlights,
  totalWishlistDetails,
} from './wishlist-details.utils';

export interface WishlistDetailsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function WishlistDetailsSummary({
  compact = false,
  limit = 3,
}: WishlistDetailsSummaryProps) {
  const items = buildWishlistDetailsItems();
  const totals = totalWishlistDetails(items);
  const highlights = pickWishlistDetailsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${WISHLIST_DETAILS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {WISHLIST_DETAILS_FEATURE.title}
      </h3>
      <DataBadgeGroup
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
