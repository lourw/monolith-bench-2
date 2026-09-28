import { ChartsListGroup } from '../../../components/charts/list/charts-list-group';
import { buildCheckoutOverviewItems } from './checkout-overview.model';
import { CHECKOUT_OVERVIEW_FEATURE } from './checkout-overview.routes';
import {
  pickCheckoutOverviewHighlights,
  totalCheckoutOverview,
} from './checkout-overview.utils';

export interface CheckoutOverviewSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function CheckoutOverviewSummary({
  compact = false,
  limit = 3,
}: CheckoutOverviewSummaryProps) {
  const items = buildCheckoutOverviewItems();
  const totals = totalCheckoutOverview(items);
  const highlights = pickCheckoutOverviewHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${CHECKOUT_OVERVIEW_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {CHECKOUT_OVERVIEW_FEATURE.title}
      </h3>
      <ChartsListGroup
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
