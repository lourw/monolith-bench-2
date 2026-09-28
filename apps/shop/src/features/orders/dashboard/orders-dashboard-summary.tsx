import { OverlayBadgeGroup } from '../../../components/overlay/badge/overlay-badge-group';
import { buildOrdersDashboardItems } from './orders-dashboard.model';
import { ORDERS_DASHBOARD_FEATURE } from './orders-dashboard.routes';
import {
  pickOrdersDashboardHighlights,
  totalOrdersDashboard,
} from './orders-dashboard.utils';

export interface OrdersDashboardSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function OrdersDashboardSummary({
  compact = false,
  limit = 3,
}: OrdersDashboardSummaryProps) {
  const items = buildOrdersDashboardItems();
  const totals = totalOrdersDashboard(items);
  const highlights = pickOrdersDashboardHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${ORDERS_DASHBOARD_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {ORDERS_DASHBOARD_FEATURE.title}
      </h3>
      <OverlayBadgeGroup
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
