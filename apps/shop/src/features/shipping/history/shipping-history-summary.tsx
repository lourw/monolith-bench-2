import { OverlayCardGroup } from '../../../components/overlay/card/overlay-card-group';
import { buildShippingHistoryItems } from './shipping-history.model';
import { SHIPPING_HISTORY_FEATURE } from './shipping-history.routes';
import {
  pickShippingHistoryHighlights,
  totalShippingHistory,
} from './shipping-history.utils';

export interface ShippingHistorySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function ShippingHistorySummary({
  compact = false,
  limit = 3,
}: ShippingHistorySummaryProps) {
  const items = buildShippingHistoryItems();
  const totals = totalShippingHistory(items);
  const highlights = pickShippingHistoryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${SHIPPING_HISTORY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {SHIPPING_HISTORY_FEATURE.title}
      </h3>
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
