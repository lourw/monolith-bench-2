import { ChartsHeaderGroup } from '../../../components/charts/header/charts-header-group';
import { buildCheckoutDetailsItems } from './checkout-details.model';
import { CHECKOUT_DETAILS_FEATURE } from './checkout-details.routes';
import {
  pickCheckoutDetailsHighlights,
  totalCheckoutDetails,
} from './checkout-details.utils';

export interface CheckoutDetailsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function CheckoutDetailsSummary({
  compact = false,
  limit = 3,
}: CheckoutDetailsSummaryProps) {
  const items = buildCheckoutDetailsItems();
  const totals = totalCheckoutDetails(items);
  const highlights = pickCheckoutDetailsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${CHECKOUT_DETAILS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {CHECKOUT_DETAILS_FEATURE.title}
      </h3>
      <ChartsHeaderGroup
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
