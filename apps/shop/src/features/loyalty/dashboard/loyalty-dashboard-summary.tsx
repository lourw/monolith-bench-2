import { NavigationPanelGroup } from '../../../components/navigation/panel/navigation-panel-group';
import { buildLoyaltyDashboardItems } from './loyalty-dashboard.model';
import { LOYALTY_DASHBOARD_FEATURE } from './loyalty-dashboard.routes';
import {
  pickLoyaltyDashboardHighlights,
  totalLoyaltyDashboard,
} from './loyalty-dashboard.utils';

export interface LoyaltyDashboardSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function LoyaltyDashboardSummary({
  compact = false,
  limit = 3,
}: LoyaltyDashboardSummaryProps) {
  const items = buildLoyaltyDashboardItems();
  const totals = totalLoyaltyDashboard(items);
  const highlights = pickLoyaltyDashboardHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${LOYALTY_DASHBOARD_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {LOYALTY_DASHBOARD_FEATURE.title}
      </h3>
      <NavigationPanelGroup
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
