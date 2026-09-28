import { MarketingPanelGroup } from '../../../components/marketing/panel/marketing-panel-group';
import { buildWishlistHistoryItems } from './wishlist-history.model';
import { WISHLIST_HISTORY_FEATURE } from './wishlist-history.routes';
import {
  pickWishlistHistoryHighlights,
  totalWishlistHistory,
} from './wishlist-history.utils';

export interface WishlistHistorySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function WishlistHistorySummary({
  compact = false,
  limit = 3,
}: WishlistHistorySummaryProps) {
  const items = buildWishlistHistoryItems();
  const totals = totalWishlistHistory(items);
  const highlights = pickWishlistHistoryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${WISHLIST_HISTORY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {WISHLIST_HISTORY_FEATURE.title}
      </h3>
      <MarketingPanelGroup
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
