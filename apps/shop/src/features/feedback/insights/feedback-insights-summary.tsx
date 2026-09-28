import { MarketingToolbarGroup } from '../../../components/marketing/toolbar/marketing-toolbar-group';
import { buildFeedbackInsightsItems } from './feedback-insights.model';
import { FEEDBACK_INSIGHTS_FEATURE } from './feedback-insights.routes';
import {
  pickFeedbackInsightsHighlights,
  totalFeedbackInsights,
} from './feedback-insights.utils';

export interface FeedbackInsightsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function FeedbackInsightsSummary({
  compact = false,
  limit = 3,
}: FeedbackInsightsSummaryProps) {
  const items = buildFeedbackInsightsItems();
  const totals = totalFeedbackInsights(items);
  const highlights = pickFeedbackInsightsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${FEEDBACK_INSIGHTS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {FEEDBACK_INSIGHTS_FEATURE.title}
      </h3>
      <MarketingToolbarGroup
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
