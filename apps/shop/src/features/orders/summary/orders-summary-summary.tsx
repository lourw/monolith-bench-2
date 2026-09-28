import { ChartsStatGroup } from '../../../components/charts/stat/charts-stat-group';
import { buildOrdersSummaryItems } from './orders-summary.model';
import { ORDERS_SUMMARY_FEATURE } from './orders-summary.routes';
import {
  pickOrdersSummaryHighlights,
  totalOrdersSummary,
} from './orders-summary.utils';

export interface OrdersSummarySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function OrdersSummarySummary({
  compact = false,
  limit = 3,
}: OrdersSummarySummaryProps) {
  const items = buildOrdersSummaryItems();
  const totals = totalOrdersSummary(items);
  const highlights = pickOrdersSummaryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${ORDERS_SUMMARY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{ORDERS_SUMMARY_FEATURE.title}</h3>
      <ChartsStatGroup
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
