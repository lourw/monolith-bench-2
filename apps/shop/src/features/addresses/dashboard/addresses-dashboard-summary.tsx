import { FeedbackListGroup } from '../../../components/feedback/list/feedback-list-group';
import { buildAddressesDashboardItems } from './addresses-dashboard.model';
import { ADDRESSES_DASHBOARD_FEATURE } from './addresses-dashboard.routes';
import {
  pickAddressesDashboardHighlights,
  totalAddressesDashboard,
} from './addresses-dashboard.utils';

export interface AddressesDashboardSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function AddressesDashboardSummary({
  compact = false,
  limit = 3,
}: AddressesDashboardSummaryProps) {
  const items = buildAddressesDashboardItems();
  const totals = totalAddressesDashboard(items);
  const highlights = pickAddressesDashboardHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${ADDRESSES_DASHBOARD_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {ADDRESSES_DASHBOARD_FEATURE.title}
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
