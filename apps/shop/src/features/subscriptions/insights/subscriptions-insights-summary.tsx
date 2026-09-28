import { MediaListGroup } from '../../../components/media/list/media-list-group';
import { buildSubscriptionsInsightsItems } from './subscriptions-insights.model';
import { SUBSCRIPTIONS_INSIGHTS_FEATURE } from './subscriptions-insights.routes';
import {
  pickSubscriptionsInsightsHighlights,
  totalSubscriptionsInsights,
} from './subscriptions-insights.utils';

export interface SubscriptionsInsightsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function SubscriptionsInsightsSummary({
  compact = false,
  limit = 3,
}: SubscriptionsInsightsSummaryProps) {
  const items = buildSubscriptionsInsightsItems();
  const totals = totalSubscriptionsInsights(items);
  const highlights = pickSubscriptionsInsightsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${SUBSCRIPTIONS_INSIGHTS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {SUBSCRIPTIONS_INSIGHTS_FEATURE.title}
      </h3>
      <MediaListGroup
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
