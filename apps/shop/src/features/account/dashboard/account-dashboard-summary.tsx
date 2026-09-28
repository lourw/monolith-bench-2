import { FeedbackStatGroup } from '../../../components/feedback/stat/feedback-stat-group';
import { buildAccountDashboardItems } from './account-dashboard.model';
import { ACCOUNT_DASHBOARD_FEATURE } from './account-dashboard.routes';
import {
  pickAccountDashboardHighlights,
  totalAccountDashboard,
} from './account-dashboard.utils';

export interface AccountDashboardSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function AccountDashboardSummary({
  compact = false,
  limit = 3,
}: AccountDashboardSummaryProps) {
  const items = buildAccountDashboardItems();
  const totals = totalAccountDashboard(items);
  const highlights = pickAccountDashboardHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${ACCOUNT_DASHBOARD_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {ACCOUNT_DASHBOARD_FEATURE.title}
      </h3>
      <FeedbackStatGroup
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
