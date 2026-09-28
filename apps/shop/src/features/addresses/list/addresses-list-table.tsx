import { LayoutList } from '../../../components/layout/list/layout-list';
import type { AddressesListItem } from './addresses-list.model';
import { ADDRESSES_LIST_FEATURE } from './addresses-list.routes';
import {
  formatAddressesListAmount,
  addressesListStatusTone,
} from './addresses-list.utils';

export interface AddressesListTableProps {
  items: ReadonlyArray<AddressesListItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function AddressesListTable({
  items,
  selectedId,
  onSelect,
}: AddressesListTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${ADDRESSES_LIST_FEATURE.testId}-empty`}
      >
        No addresses list entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${ADDRESSES_LIST_FEATURE.testId}-table`}
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
            data-testid={`${ADDRESSES_LIST_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatAddressesListAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <LayoutList
                label={item.status}
                tone={addressesListStatusTone(item.status)}
                size="sm"
                testId={`${ADDRESSES_LIST_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
