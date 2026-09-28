import { ChartsBannerGroup } from '../../../components/charts/banner/charts-banner-group';
import { buildShippingInsightsItems } from './shipping-insights.model';
import { SHIPPING_INSIGHTS_FEATURE } from './shipping-insights.routes';
import {
  pickShippingInsightsHighlights,
  totalShippingInsights,
} from './shipping-insights.utils';

export interface ShippingInsightsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function ShippingInsightsSummary({
  compact = false,
  limit = 3,
}: ShippingInsightsSummaryProps) {
  const items = buildShippingInsightsItems();
  const totals = totalShippingInsights(items);
  const highlights = pickShippingInsightsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${SHIPPING_INSIGHTS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {SHIPPING_INSIGHTS_FEATURE.title}
      </h3>
      <ChartsBannerGroup
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
