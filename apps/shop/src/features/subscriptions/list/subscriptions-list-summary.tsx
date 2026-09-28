import { FeedbackChipGroup } from '../../../components/feedback/chip/feedback-chip-group';
import { buildSubscriptionsListItems } from './subscriptions-list.model';
import { SUBSCRIPTIONS_LIST_FEATURE } from './subscriptions-list.routes';
import {
  pickSubscriptionsListHighlights,
  totalSubscriptionsList,
} from './subscriptions-list.utils';

export interface SubscriptionsListSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function SubscriptionsListSummary({
  compact = false,
  limit = 3,
}: SubscriptionsListSummaryProps) {
  const items = buildSubscriptionsListItems();
  const totals = totalSubscriptionsList(items);
  const highlights = pickSubscriptionsListHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${SUBSCRIPTIONS_LIST_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {SUBSCRIPTIONS_LIST_FEATURE.title}
      </h3>
      <FeedbackChipGroup
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
