import { FeedbackBadgeGroup } from '../../../components/feedback/badge/feedback-badge-group';
import { buildShippingDashboardItems } from './shipping-dashboard.model';
import { SHIPPING_DASHBOARD_FEATURE } from './shipping-dashboard.routes';
import {
  pickShippingDashboardHighlights,
  totalShippingDashboard,
} from './shipping-dashboard.utils';

export interface ShippingDashboardSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function ShippingDashboardSummary({
  compact = false,
  limit = 3,
}: ShippingDashboardSummaryProps) {
  const items = buildShippingDashboardItems();
  const totals = totalShippingDashboard(items);
  const highlights = pickShippingDashboardHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${SHIPPING_DASHBOARD_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {SHIPPING_DASHBOARD_FEATURE.title}
      </h3>
      <FeedbackBadgeGroup
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
