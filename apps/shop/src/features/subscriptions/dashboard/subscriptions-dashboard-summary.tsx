import { DataStatGroup } from '../../../components/data/stat/data-stat-group';
import { buildSubscriptionsDashboardItems } from './subscriptions-dashboard.model';
import { SUBSCRIPTIONS_DASHBOARD_FEATURE } from './subscriptions-dashboard.routes';
import {
  pickSubscriptionsDashboardHighlights,
  totalSubscriptionsDashboard,
} from './subscriptions-dashboard.utils';

export interface SubscriptionsDashboardSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function SubscriptionsDashboardSummary({
  compact = false,
  limit = 3,
}: SubscriptionsDashboardSummaryProps) {
  const items = buildSubscriptionsDashboardItems();
  const totals = totalSubscriptionsDashboard(items);
  const highlights = pickSubscriptionsDashboardHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${SUBSCRIPTIONS_DASHBOARD_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {SUBSCRIPTIONS_DASHBOARD_FEATURE.title}
      </h3>
      <DataStatGroup
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
