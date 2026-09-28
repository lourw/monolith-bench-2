import { MediaListGroup } from '../../../components/media/list/media-list-group';
import { buildOrdersHistoryItems } from './orders-history.model';
import { ORDERS_HISTORY_FEATURE } from './orders-history.routes';
import {
  pickOrdersHistoryHighlights,
  totalOrdersHistory,
} from './orders-history.utils';

export interface OrdersHistorySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function OrdersHistorySummary({
  compact = false,
  limit = 3,
}: OrdersHistorySummaryProps) {
  const items = buildOrdersHistoryItems();
  const totals = totalOrdersHistory(items);
  const highlights = pickOrdersHistoryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${ORDERS_HISTORY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{ORDERS_HISTORY_FEATURE.title}</h3>
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
