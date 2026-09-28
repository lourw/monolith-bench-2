import { ChartsBadgeGroup } from '../../../components/charts/badge/charts-badge-group';
import { buildWishlistListItems } from './wishlist-list.model';
import { WISHLIST_LIST_FEATURE } from './wishlist-list.routes';
import {
  pickWishlistListHighlights,
  totalWishlistList,
} from './wishlist-list.utils';

export interface WishlistListSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function WishlistListSummary({
  compact = false,
  limit = 3,
}: WishlistListSummaryProps) {
  const items = buildWishlistListItems();
  const totals = totalWishlistList(items);
  const highlights = pickWishlistListHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${WISHLIST_LIST_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{WISHLIST_LIST_FEATURE.title}</h3>
      <ChartsBadgeGroup
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
