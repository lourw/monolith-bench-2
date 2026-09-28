import { LayoutStatGroup } from '../../../components/layout/stat/layout-stat-group';
import { buildCartHistoryItems } from './cart-history.model';
import { CART_HISTORY_FEATURE } from './cart-history.routes';
import {
  pickCartHistoryHighlights,
  totalCartHistory,
} from './cart-history.utils';

export interface CartHistorySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function CartHistorySummary({
  compact = false,
  limit = 3,
}: CartHistorySummaryProps) {
  const items = buildCartHistoryItems();
  const totals = totalCartHistory(items);
  const highlights = pickCartHistoryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${CART_HISTORY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{CART_HISTORY_FEATURE.title}</h3>
      <LayoutStatGroup
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
