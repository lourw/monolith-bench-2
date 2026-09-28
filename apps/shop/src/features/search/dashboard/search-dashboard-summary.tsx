import { CoreHeaderGroup } from '../../../components/core/header/core-header-group';
import { buildSearchDashboardItems } from './search-dashboard.model';
import { SEARCH_DASHBOARD_FEATURE } from './search-dashboard.routes';
import {
  pickSearchDashboardHighlights,
  totalSearchDashboard,
} from './search-dashboard.utils';

export interface SearchDashboardSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function SearchDashboardSummary({
  compact = false,
  limit = 3,
}: SearchDashboardSummaryProps) {
  const items = buildSearchDashboardItems();
  const totals = totalSearchDashboard(items);
  const highlights = pickSearchDashboardHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${SEARCH_DASHBOARD_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {SEARCH_DASHBOARD_FEATURE.title}
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
