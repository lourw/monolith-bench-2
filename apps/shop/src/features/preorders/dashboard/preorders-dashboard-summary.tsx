import { CoreHeaderGroup } from '../../../components/core/header/core-header-group';
import { buildPreordersDashboardItems } from './preorders-dashboard.model';
import { PREORDERS_DASHBOARD_FEATURE } from './preorders-dashboard.routes';
import {
  pickPreordersDashboardHighlights,
  totalPreordersDashboard,
} from './preorders-dashboard.utils';

export interface PreordersDashboardSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function PreordersDashboardSummary({
  compact = false,
  limit = 3,
}: PreordersDashboardSummaryProps) {
  const items = buildPreordersDashboardItems();
  const totals = totalPreordersDashboard(items);
  const highlights = pickPreordersDashboardHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${PREORDERS_DASHBOARD_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {PREORDERS_DASHBOARD_FEATURE.title}
      </h3>
      <CoreHeaderGroup
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
