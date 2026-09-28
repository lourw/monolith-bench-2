import { FeedbackListGroup } from '../../../components/feedback/list/feedback-list-group';
import { buildProfileDashboardItems } from './profile-dashboard.model';
import { PROFILE_DASHBOARD_FEATURE } from './profile-dashboard.routes';
import {
  pickProfileDashboardHighlights,
  totalProfileDashboard,
} from './profile-dashboard.utils';

export interface ProfileDashboardSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function ProfileDashboardSummary({
  compact = false,
  limit = 3,
}: ProfileDashboardSummaryProps) {
  const items = buildProfileDashboardItems();
  const totals = totalProfileDashboard(items);
  const highlights = pickProfileDashboardHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${PROFILE_DASHBOARD_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {PROFILE_DASHBOARD_FEATURE.title}
      </h3>
      <FeedbackListGroup
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
