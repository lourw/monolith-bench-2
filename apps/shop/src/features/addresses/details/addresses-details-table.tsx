import { InputsTile } from '../../../components/inputs/tile/inputs-tile';
import type { AddressesDetailsItem } from './addresses-details.model';
import { ADDRESSES_DETAILS_FEATURE } from './addresses-details.routes';
import {
  formatAddressesDetailsAmount,
  addressesDetailsStatusTone,
} from './addresses-details.utils';

export interface AddressesDetailsTableProps {
  items: ReadonlyArray<AddressesDetailsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function AddressesDetailsTable({
  items,
  selectedId,
  onSelect,
}: AddressesDetailsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${ADDRESSES_DETAILS_FEATURE.testId}-empty`}
      >
        No addresses details entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${ADDRESSES_DETAILS_FEATURE.testId}-table`}
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
            data-testid={`${ADDRESSES_DETAILS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatAddressesDetailsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <InputsTile
                label={item.status}
                tone={addressesDetailsStatusTone(item.status)}
                size="sm"
                testId={`${ADDRESSES_DETAILS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
