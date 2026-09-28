import { NavigationTileGroup } from '../../../components/navigation/tile/navigation-tile-group';
import { buildPaymentsHistoryItems } from './payments-history.model';
import { PAYMENTS_HISTORY_FEATURE } from './payments-history.routes';
import {
  pickPaymentsHistoryHighlights,
  totalPaymentsHistory,
} from './payments-history.utils';

export interface PaymentsHistorySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function PaymentsHistorySummary({
  compact = false,
  limit = 3,
}: PaymentsHistorySummaryProps) {
  const items = buildPaymentsHistoryItems();
  const totals = totalPaymentsHistory(items);
  const highlights = pickPaymentsHistoryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${PAYMENTS_HISTORY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {PAYMENTS_HISTORY_FEATURE.title}
      </h3>
      <NavigationTileGroup
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
