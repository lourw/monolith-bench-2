import { LayoutTileGroup } from '../../../components/layout/tile/layout-tile-group';
import { buildPaymentsDetailsItems } from './payments-details.model';
import { PAYMENTS_DETAILS_FEATURE } from './payments-details.routes';
import {
  pickPaymentsDetailsHighlights,
  totalPaymentsDetails,
} from './payments-details.utils';

export interface PaymentsDetailsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function PaymentsDetailsSummary({
  compact = false,
  limit = 3,
}: PaymentsDetailsSummaryProps) {
  const items = buildPaymentsDetailsItems();
  const totals = totalPaymentsDetails(items);
  const highlights = pickPaymentsDetailsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${PAYMENTS_DETAILS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {PAYMENTS_DETAILS_FEATURE.title}
      </h3>
      <LayoutTileGroup
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
