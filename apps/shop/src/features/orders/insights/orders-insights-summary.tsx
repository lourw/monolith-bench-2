import { ChartsTileGroup } from '../../../components/charts/tile/charts-tile-group';
import { buildOrdersInsightsItems } from './orders-insights.model';
import { ORDERS_INSIGHTS_FEATURE } from './orders-insights.routes';
import {
  pickOrdersInsightsHighlights,
  totalOrdersInsights,
} from './orders-insights.utils';

export interface OrdersInsightsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function OrdersInsightsSummary({
  compact = false,
  limit = 3,
}: OrdersInsightsSummaryProps) {
  const items = buildOrdersInsightsItems();
  const totals = totalOrdersInsights(items);
  const highlights = pickOrdersInsightsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${ORDERS_INSIGHTS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{ORDERS_INSIGHTS_FEATURE.title}</h3>
      <ChartsTileGroup
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
