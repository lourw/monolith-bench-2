import { DataCardGroup } from '../../../components/data/card/data-card-group';
import { buildAuthDashboardItems } from './auth-dashboard.model';
import { AUTH_DASHBOARD_FEATURE } from './auth-dashboard.routes';
import {
  pickAuthDashboardHighlights,
  totalAuthDashboard,
} from './auth-dashboard.utils';

export interface AuthDashboardSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function AuthDashboardSummary({
  compact = false,
  limit = 3,
}: AuthDashboardSummaryProps) {
  const items = buildAuthDashboardItems();
  const totals = totalAuthDashboard(items);
  const highlights = pickAuthDashboardHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${AUTH_DASHBOARD_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{AUTH_DASHBOARD_FEATURE.title}</h3>
      <DataCardGroup
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
