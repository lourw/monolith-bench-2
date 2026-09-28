import { LayoutBadgeGroup } from '../../../components/layout/badge/layout-badge-group';
import { buildCheckoutListItems } from './checkout-list.model';
import { CHECKOUT_LIST_FEATURE } from './checkout-list.routes';
import {
  pickCheckoutListHighlights,
  totalCheckoutList,
} from './checkout-list.utils';

export interface CheckoutListSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function CheckoutListSummary({
  compact = false,
  limit = 3,
}: CheckoutListSummaryProps) {
  const items = buildCheckoutListItems();
  const totals = totalCheckoutList(items);
  const highlights = pickCheckoutListHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${CHECKOUT_LIST_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{CHECKOUT_LIST_FEATURE.title}</h3>
      <LayoutBadgeGroup
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
