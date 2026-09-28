import { CorePanelGroup } from '../../../components/core/panel/core-panel-group';
import { buildShippingSummaryItems } from './shipping-summary.model';
import { SHIPPING_SUMMARY_FEATURE } from './shipping-summary.routes';
import {
  pickShippingSummaryHighlights,
  totalShippingSummary,
} from './shipping-summary.utils';

export interface ShippingSummarySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function ShippingSummarySummary({
  compact = false,
  limit = 3,
}: ShippingSummarySummaryProps) {
  const items = buildShippingSummaryItems();
  const totals = totalShippingSummary(items);
  const highlights = pickShippingSummaryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${SHIPPING_SUMMARY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {SHIPPING_SUMMARY_FEATURE.title}
      </h3>
      <CorePanelGroup
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
