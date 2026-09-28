import { NavigationChipGroup } from '../../../components/navigation/chip/navigation-chip-group';
import { buildAddressesHistoryItems } from './addresses-history.model';
import { ADDRESSES_HISTORY_FEATURE } from './addresses-history.routes';
import {
  pickAddressesHistoryHighlights,
  totalAddressesHistory,
} from './addresses-history.utils';

export interface AddressesHistorySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function AddressesHistorySummary({
  compact = false,
  limit = 3,
}: AddressesHistorySummaryProps) {
  const items = buildAddressesHistoryItems();
  const totals = totalAddressesHistory(items);
  const highlights = pickAddressesHistoryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${ADDRESSES_HISTORY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {ADDRESSES_HISTORY_FEATURE.title}
      </h3>
      <NavigationChipGroup
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
