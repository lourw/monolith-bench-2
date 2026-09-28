import { CommerceStatGroup } from '../../../components/commerce/stat/commerce-stat-group';
import { buildSizingDashboardItems } from './sizing-dashboard.model';
import { SIZING_DASHBOARD_FEATURE } from './sizing-dashboard.routes';
import {
  pickSizingDashboardHighlights,
  totalSizingDashboard,
} from './sizing-dashboard.utils';

export interface SizingDashboardSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function SizingDashboardSummary({
  compact = false,
  limit = 3,
}: SizingDashboardSummaryProps) {
  const items = buildSizingDashboardItems();
  const totals = totalSizingDashboard(items);
  const highlights = pickSizingDashboardHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${SIZING_DASHBOARD_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {SIZING_DASHBOARD_FEATURE.title}
      </h3>
      <CommerceStatGroup
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
