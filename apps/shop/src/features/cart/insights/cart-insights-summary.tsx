import { DataCardGroup } from '../../../components/data/card/data-card-group';
import { buildCartInsightsItems } from './cart-insights.model';
import { CART_INSIGHTS_FEATURE } from './cart-insights.routes';
import {
  pickCartInsightsHighlights,
  totalCartInsights,
} from './cart-insights.utils';

export interface CartInsightsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function CartInsightsSummary({
  compact = false,
  limit = 3,
}: CartInsightsSummaryProps) {
  const items = buildCartInsightsItems();
  const totals = totalCartInsights(items);
  const highlights = pickCartInsightsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${CART_INSIGHTS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{CART_INSIGHTS_FEATURE.title}</h3>
      <DataCardGroup
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
