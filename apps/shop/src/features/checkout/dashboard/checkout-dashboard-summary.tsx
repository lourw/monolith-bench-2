import { MarketingCardGroup } from '../../../components/marketing/card/marketing-card-group';
import { buildCheckoutDashboardItems } from './checkout-dashboard.model';
import { CHECKOUT_DASHBOARD_FEATURE } from './checkout-dashboard.routes';
import {
  pickCheckoutDashboardHighlights,
  totalCheckoutDashboard,
} from './checkout-dashboard.utils';

export interface CheckoutDashboardSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function CheckoutDashboardSummary({
  compact = false,
  limit = 3,
}: CheckoutDashboardSummaryProps) {
  const items = buildCheckoutDashboardItems();
  const totals = totalCheckoutDashboard(items);
  const highlights = pickCheckoutDashboardHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${CHECKOUT_DASHBOARD_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {CHECKOUT_DASHBOARD_FEATURE.title}
      </h3>
      <MarketingCardGroup
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
