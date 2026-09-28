import { DataBadgeGroup } from '../../../components/data/badge/data-badge-group';
import { buildSubscriptionsHistoryItems } from './subscriptions-history.model';
import { SUBSCRIPTIONS_HISTORY_FEATURE } from './subscriptions-history.routes';
import {
  pickSubscriptionsHistoryHighlights,
  totalSubscriptionsHistory,
} from './subscriptions-history.utils';

export interface SubscriptionsHistorySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function SubscriptionsHistorySummary({
  compact = false,
  limit = 3,
}: SubscriptionsHistorySummaryProps) {
  const items = buildSubscriptionsHistoryItems();
  const totals = totalSubscriptionsHistory(items);
  const highlights = pickSubscriptionsHistoryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${SUBSCRIPTIONS_HISTORY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {SUBSCRIPTIONS_HISTORY_FEATURE.title}
      </h3>
      <DataBadgeGroup
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
