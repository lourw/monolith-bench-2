import { LayoutListGroup } from '../../../components/layout/list/layout-list-group';
import { buildShippingDetailsItems } from './shipping-details.model';
import { SHIPPING_DETAILS_FEATURE } from './shipping-details.routes';
import {
  pickShippingDetailsHighlights,
  totalShippingDetails,
} from './shipping-details.utils';

export interface ShippingDetailsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function ShippingDetailsSummary({
  compact = false,
  limit = 3,
}: ShippingDetailsSummaryProps) {
  const items = buildShippingDetailsItems();
  const totals = totalShippingDetails(items);
  const highlights = pickShippingDetailsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${SHIPPING_DETAILS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {SHIPPING_DETAILS_FEATURE.title}
      </h3>
      <LayoutListGroup
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
