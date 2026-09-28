import { NavigationStatGroup } from '../../../components/navigation/stat/navigation-stat-group';
import { buildRecommendationsInsightsItems } from './recommendations-insights.model';
import { RECOMMENDATIONS_INSIGHTS_FEATURE } from './recommendations-insights.routes';
import {
  pickRecommendationsInsightsHighlights,
  totalRecommendationsInsights,
} from './recommendations-insights.utils';

export interface RecommendationsInsightsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function RecommendationsInsightsSummary({
  compact = false,
  limit = 3,
}: RecommendationsInsightsSummaryProps) {
  const items = buildRecommendationsInsightsItems();
  const totals = totalRecommendationsInsights(items);
  const highlights = pickRecommendationsInsightsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${RECOMMENDATIONS_INSIGHTS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {RECOMMENDATIONS_INSIGHTS_FEATURE.title}
      </h3>
      <NavigationStatGroup
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
