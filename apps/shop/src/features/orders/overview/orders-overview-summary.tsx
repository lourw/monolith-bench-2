import { TypographyToolbarGroup } from '../../../components/typography/toolbar/typography-toolbar-group';
import { buildOrdersOverviewItems } from './orders-overview.model';
import { ORDERS_OVERVIEW_FEATURE } from './orders-overview.routes';
import {
  pickOrdersOverviewHighlights,
  totalOrdersOverview,
} from './orders-overview.utils';

export interface OrdersOverviewSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function OrdersOverviewSummary({
  compact = false,
  limit = 3,
}: OrdersOverviewSummaryProps) {
  const items = buildOrdersOverviewItems();
  const totals = totalOrdersOverview(items);
  const highlights = pickOrdersOverviewHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${ORDERS_OVERVIEW_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{ORDERS_OVERVIEW_FEATURE.title}</h3>
      <TypographyToolbarGroup
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
