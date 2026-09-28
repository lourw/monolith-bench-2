import { DataChipGroup } from '../../../components/data/chip/data-chip-group';
import { buildWishlistSummaryItems } from './wishlist-summary.model';
import { WISHLIST_SUMMARY_FEATURE } from './wishlist-summary.routes';
import {
  pickWishlistSummaryHighlights,
  totalWishlistSummary,
} from './wishlist-summary.utils';

export interface WishlistSummarySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function WishlistSummarySummary({
  compact = false,
  limit = 3,
}: WishlistSummarySummaryProps) {
  const items = buildWishlistSummaryItems();
  const totals = totalWishlistSummary(items);
  const highlights = pickWishlistSummaryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${WISHLIST_SUMMARY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {WISHLIST_SUMMARY_FEATURE.title}
      </h3>
      <DataChipGroup
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
