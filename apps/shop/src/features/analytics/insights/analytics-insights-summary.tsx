import { CommerceListGroup } from '../../../components/commerce/list/commerce-list-group';
import { buildAnalyticsInsightsItems } from './analytics-insights.model';
import { ANALYTICS_INSIGHTS_FEATURE } from './analytics-insights.routes';
import {
  pickAnalyticsInsightsHighlights,
  totalAnalyticsInsights,
} from './analytics-insights.utils';

export interface AnalyticsInsightsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function AnalyticsInsightsSummary({
  compact = false,
  limit = 3,
}: AnalyticsInsightsSummaryProps) {
  const items = buildAnalyticsInsightsItems();
  const totals = totalAnalyticsInsights(items);
  const highlights = pickAnalyticsInsightsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${ANALYTICS_INSIGHTS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {ANALYTICS_INSIGHTS_FEATURE.title}
      </h3>
      <CommerceListGroup
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
