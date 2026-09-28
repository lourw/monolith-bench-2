import { InputsCardGroup } from '../../../components/inputs/card/inputs-card-group';
import { buildNotificationsInsightsItems } from './notifications-insights.model';
import { NOTIFICATIONS_INSIGHTS_FEATURE } from './notifications-insights.routes';
import {
  pickNotificationsInsightsHighlights,
  totalNotificationsInsights,
} from './notifications-insights.utils';

export interface NotificationsInsightsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function NotificationsInsightsSummary({
  compact = false,
  limit = 3,
}: NotificationsInsightsSummaryProps) {
  const items = buildNotificationsInsightsItems();
  const totals = totalNotificationsInsights(items);
  const highlights = pickNotificationsInsightsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${NOTIFICATIONS_INSIGHTS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {NOTIFICATIONS_INSIGHTS_FEATURE.title}
      </h3>
      <InputsCardGroup
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
