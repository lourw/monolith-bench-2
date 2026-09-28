import { ChartsBannerGroup } from '../../../components/charts/banner/charts-banner-group';
import { buildPaymentsInsightsItems } from './payments-insights.model';
import { PAYMENTS_INSIGHTS_FEATURE } from './payments-insights.routes';
import {
  pickPaymentsInsightsHighlights,
  totalPaymentsInsights,
} from './payments-insights.utils';

export interface PaymentsInsightsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function PaymentsInsightsSummary({
  compact = false,
  limit = 3,
}: PaymentsInsightsSummaryProps) {
  const items = buildPaymentsInsightsItems();
  const totals = totalPaymentsInsights(items);
  const highlights = pickPaymentsInsightsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${PAYMENTS_INSIGHTS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {PAYMENTS_INSIGHTS_FEATURE.title}
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
