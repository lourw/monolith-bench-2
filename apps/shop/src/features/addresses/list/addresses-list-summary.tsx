import { CoreCardGroup } from '../../../components/core/card/core-card-group';
import { buildAddressesListItems } from './addresses-list.model';
import { ADDRESSES_LIST_FEATURE } from './addresses-list.routes';
import {
  pickAddressesListHighlights,
  totalAddressesList,
} from './addresses-list.utils';

export interface AddressesListSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function AddressesListSummary({
  compact = false,
  limit = 3,
}: AddressesListSummaryProps) {
  const items = buildAddressesListItems();
  const totals = totalAddressesList(items);
  const highlights = pickAddressesListHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${ADDRESSES_LIST_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{ADDRESSES_LIST_FEATURE.title}</h3>
      <CoreCardGroup
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
