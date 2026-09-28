import { ChartsBannerGroup } from '../../../components/charts/banner/charts-banner-group';
import { buildLoyaltyInsightsItems } from './loyalty-insights.model';
import { LOYALTY_INSIGHTS_FEATURE } from './loyalty-insights.routes';
import {
  pickLoyaltyInsightsHighlights,
  totalLoyaltyInsights,
} from './loyalty-insights.utils';

export interface LoyaltyInsightsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function LoyaltyInsightsSummary({
  compact = false,
  limit = 3,
}: LoyaltyInsightsSummaryProps) {
  const items = buildLoyaltyInsightsItems();
  const totals = totalLoyaltyInsights(items);
  const highlights = pickLoyaltyInsightsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${LOYALTY_INSIGHTS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {LOYALTY_INSIGHTS_FEATURE.title}
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
