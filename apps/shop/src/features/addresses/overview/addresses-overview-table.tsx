import { CoreChip } from '../../../components/core/chip/core-chip';
import type { AddressesOverviewItem } from './addresses-overview.model';
import { ADDRESSES_OVERVIEW_FEATURE } from './addresses-overview.routes';
import {
  formatAddressesOverviewAmount,
  addressesOverviewStatusTone,
} from './addresses-overview.utils';

export interface AddressesOverviewTableProps {
  items: ReadonlyArray<AddressesOverviewItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function AddressesOverviewTable({
  items,
  selectedId,
  onSelect,
}: AddressesOverviewTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${ADDRESSES_OVERVIEW_FEATURE.testId}-empty`}
      >
        No addresses overview entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${ADDRESSES_OVERVIEW_FEATURE.testId}-table`}
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Amount</th>
          <th>Qty</th>
          <th>Status</th>
          <th>Tags</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr
            key={item.id}
            className={
              item.id === selectedId ? 'feature-row selected' : 'feature-row'
            }
            data-testid={`${ADDRESSES_OVERVIEW_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatAddressesOverviewAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <CoreChip
                label={item.status}
                tone={addressesOverviewStatusTone(item.status)}
                size="sm"
                testId={`${ADDRESSES_OVERVIEW_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
