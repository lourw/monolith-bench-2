import { ChartsToolbarGroup } from '../../../components/charts/toolbar/charts-toolbar-group';
import { buildCheckoutInsightsItems } from './checkout-insights.model';
import { CHECKOUT_INSIGHTS_FEATURE } from './checkout-insights.routes';
import {
  pickCheckoutInsightsHighlights,
  totalCheckoutInsights,
} from './checkout-insights.utils';

export interface CheckoutInsightsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function CheckoutInsightsSummary({
  compact = false,
  limit = 3,
}: CheckoutInsightsSummaryProps) {
  const items = buildCheckoutInsightsItems();
  const totals = totalCheckoutInsights(items);
  const highlights = pickCheckoutInsightsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${CHECKOUT_INSIGHTS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {CHECKOUT_INSIGHTS_FEATURE.title}
      </h3>
      <ChartsToolbarGroup
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
