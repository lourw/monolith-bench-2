import { InputsBadgeGroup } from '../../../components/inputs/badge/inputs-badge-group';
import { buildOrdersListItems } from './orders-list.model';
import { ORDERS_LIST_FEATURE } from './orders-list.routes';
import { pickOrdersListHighlights, totalOrdersList } from './orders-list.utils';

export interface OrdersListSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function OrdersListSummary({
  compact = false,
  limit = 3,
}: OrdersListSummaryProps) {
  const items = buildOrdersListItems();
  const totals = totalOrdersList(items);
  const highlights = pickOrdersListHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${ORDERS_LIST_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{ORDERS_LIST_FEATURE.title}</h3>
      <InputsBadgeGroup
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
