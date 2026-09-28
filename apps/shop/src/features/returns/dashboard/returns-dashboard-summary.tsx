import { FeedbackStatGroup } from '../../../components/feedback/stat/feedback-stat-group';
import { buildReturnsDashboardItems } from './returns-dashboard.model';
import { RETURNS_DASHBOARD_FEATURE } from './returns-dashboard.routes';
import {
  pickReturnsDashboardHighlights,
  totalReturnsDashboard,
} from './returns-dashboard.utils';

export interface ReturnsDashboardSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function ReturnsDashboardSummary({
  compact = false,
  limit = 3,
}: ReturnsDashboardSummaryProps) {
  const items = buildReturnsDashboardItems();
  const totals = totalReturnsDashboard(items);
  const highlights = pickReturnsDashboardHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${RETURNS_DASHBOARD_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {RETURNS_DASHBOARD_FEATURE.title}
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
