import { FormsBadgeGroup } from '../../../components/forms/badge/forms-badge-group';
import { buildAnalyticsDashboardItems } from './analytics-dashboard.model';
import { ANALYTICS_DASHBOARD_FEATURE } from './analytics-dashboard.routes';
import {
  pickAnalyticsDashboardHighlights,
  totalAnalyticsDashboard,
} from './analytics-dashboard.utils';

export interface AnalyticsDashboardSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function AnalyticsDashboardSummary({
  compact = false,
  limit = 3,
}: AnalyticsDashboardSummaryProps) {
  const items = buildAnalyticsDashboardItems();
  const totals = totalAnalyticsDashboard(items);
  const highlights = pickAnalyticsDashboardHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${ANALYTICS_DASHBOARD_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {ANALYTICS_DASHBOARD_FEATURE.title}
      </h3>
      <FormsBadgeGroup
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
