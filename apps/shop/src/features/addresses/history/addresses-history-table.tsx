import { MarketingPanel } from '../../../components/marketing/panel/marketing-panel';
import type { AddressesHistoryItem } from './addresses-history.model';
import { ADDRESSES_HISTORY_FEATURE } from './addresses-history.routes';
import {
  formatAddressesHistoryAmount,
  addressesHistoryStatusTone,
} from './addresses-history.utils';

export interface AddressesHistoryTableProps {
  items: ReadonlyArray<AddressesHistoryItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function AddressesHistoryTable({
  items,
  selectedId,
  onSelect,
}: AddressesHistoryTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${ADDRESSES_HISTORY_FEATURE.testId}-empty`}
      >
        No addresses history entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${ADDRESSES_HISTORY_FEATURE.testId}-table`}
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
            data-testid={`${ADDRESSES_HISTORY_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatAddressesHistoryAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <MarketingPanel
                label={item.status}
                tone={addressesHistoryStatusTone(item.status)}
                size="sm"
                testId={`${ADDRESSES_HISTORY_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
