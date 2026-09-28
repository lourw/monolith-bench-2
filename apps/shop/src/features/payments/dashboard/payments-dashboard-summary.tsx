import { ChartsTileGroup } from '../../../components/charts/tile/charts-tile-group';
import { buildPaymentsDashboardItems } from './payments-dashboard.model';
import { PAYMENTS_DASHBOARD_FEATURE } from './payments-dashboard.routes';
import {
  pickPaymentsDashboardHighlights,
  totalPaymentsDashboard,
} from './payments-dashboard.utils';

export interface PaymentsDashboardSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function PaymentsDashboardSummary({
  compact = false,
  limit = 3,
}: PaymentsDashboardSummaryProps) {
  const items = buildPaymentsDashboardItems();
  const totals = totalPaymentsDashboard(items);
  const highlights = pickPaymentsDashboardHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${PAYMENTS_DASHBOARD_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {PAYMENTS_DASHBOARD_FEATURE.title}
      </h3>
      <ChartsTileGroup
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
