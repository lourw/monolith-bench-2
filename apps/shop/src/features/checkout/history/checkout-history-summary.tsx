import { MediaBadgeGroup } from '../../../components/media/badge/media-badge-group';
import { buildCheckoutHistoryItems } from './checkout-history.model';
import { CHECKOUT_HISTORY_FEATURE } from './checkout-history.routes';
import {
  pickCheckoutHistoryHighlights,
  totalCheckoutHistory,
} from './checkout-history.utils';

export interface CheckoutHistorySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function CheckoutHistorySummary({
  compact = false,
  limit = 3,
}: CheckoutHistorySummaryProps) {
  const items = buildCheckoutHistoryItems();
  const totals = totalCheckoutHistory(items);
  const highlights = pickCheckoutHistoryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${CHECKOUT_HISTORY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {CHECKOUT_HISTORY_FEATURE.title}
      </h3>
      <MediaBadgeGroup
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
