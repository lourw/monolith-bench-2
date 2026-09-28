import { CoreStatGroup } from '../../../components/core/stat/core-stat-group';
import { buildSubscriptionsOverviewItems } from './subscriptions-overview.model';
import { SUBSCRIPTIONS_OVERVIEW_FEATURE } from './subscriptions-overview.routes';
import {
  pickSubscriptionsOverviewHighlights,
  totalSubscriptionsOverview,
} from './subscriptions-overview.utils';

export interface SubscriptionsOverviewSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function SubscriptionsOverviewSummary({
  compact = false,
  limit = 3,
}: SubscriptionsOverviewSummaryProps) {
  const items = buildSubscriptionsOverviewItems();
  const totals = totalSubscriptionsOverview(items);
  const highlights = pickSubscriptionsOverviewHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${SUBSCRIPTIONS_OVERVIEW_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {SUBSCRIPTIONS_OVERVIEW_FEATURE.title}
      </h3>
      <CoreStatGroup
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
