import { FeedbackStatGroup } from '../../../components/feedback/stat/feedback-stat-group';
import { buildCartDashboardItems } from './cart-dashboard.model';
import { CART_DASHBOARD_FEATURE } from './cart-dashboard.routes';
import {
  pickCartDashboardHighlights,
  totalCartDashboard,
} from './cart-dashboard.utils';

export interface CartDashboardSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function CartDashboardSummary({
  compact = false,
  limit = 3,
}: CartDashboardSummaryProps) {
  const items = buildCartDashboardItems();
  const totals = totalCartDashboard(items);
  const highlights = pickCartDashboardHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${CART_DASHBOARD_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{CART_DASHBOARD_FEATURE.title}</h3>
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
