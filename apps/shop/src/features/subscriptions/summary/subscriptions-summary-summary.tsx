import { OverlayStatGroup } from '../../../components/overlay/stat/overlay-stat-group';
import { buildSubscriptionsSummaryItems } from './subscriptions-summary.model';
import { SUBSCRIPTIONS_SUMMARY_FEATURE } from './subscriptions-summary.routes';
import {
  pickSubscriptionsSummaryHighlights,
  totalSubscriptionsSummary,
} from './subscriptions-summary.utils';

export interface SubscriptionsSummarySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function SubscriptionsSummarySummary({
  compact = false,
  limit = 3,
}: SubscriptionsSummarySummaryProps) {
  const items = buildSubscriptionsSummaryItems();
  const totals = totalSubscriptionsSummary(items);
  const highlights = pickSubscriptionsSummaryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${SUBSCRIPTIONS_SUMMARY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {SUBSCRIPTIONS_SUMMARY_FEATURE.title}
      </h3>
      <OverlayStatGroup
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
