import { NavigationToolbarGroup } from '../../../components/navigation/toolbar/navigation-toolbar-group';
import { buildOrdersDetailsItems } from './orders-details.model';
import { ORDERS_DETAILS_FEATURE } from './orders-details.routes';
import {
  pickOrdersDetailsHighlights,
  totalOrdersDetails,
} from './orders-details.utils';

export interface OrdersDetailsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function OrdersDetailsSummary({
  compact = false,
  limit = 3,
}: OrdersDetailsSummaryProps) {
  const items = buildOrdersDetailsItems();
  const totals = totalOrdersDetails(items);
  const highlights = pickOrdersDetailsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${ORDERS_DETAILS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{ORDERS_DETAILS_FEATURE.title}</h3>
      <NavigationToolbarGroup
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
