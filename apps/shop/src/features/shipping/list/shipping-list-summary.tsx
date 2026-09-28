import { OverlayCardGroup } from '../../../components/overlay/card/overlay-card-group';
import { buildShippingListItems } from './shipping-list.model';
import { SHIPPING_LIST_FEATURE } from './shipping-list.routes';
import {
  pickShippingListHighlights,
  totalShippingList,
} from './shipping-list.utils';

export interface ShippingListSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function ShippingListSummary({
  compact = false,
  limit = 3,
}: ShippingListSummaryProps) {
  const items = buildShippingListItems();
  const totals = totalShippingList(items);
  const highlights = pickShippingListHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${SHIPPING_LIST_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{SHIPPING_LIST_FEATURE.title}</h3>
      <OverlayCardGroup
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
