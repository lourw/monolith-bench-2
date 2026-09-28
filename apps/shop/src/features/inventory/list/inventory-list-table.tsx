import { CoreHeader } from '../../../components/core/header/core-header';
import type { InventoryListItem } from './inventory-list.model';
import { INVENTORY_LIST_FEATURE } from './inventory-list.routes';
import {
  formatInventoryListAmount,
  inventoryListStatusTone,
} from './inventory-list.utils';

export interface InventoryListTableProps {
  items: ReadonlyArray<InventoryListItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function InventoryListTable({
  items,
  selectedId,
  onSelect,
}: InventoryListTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${INVENTORY_LIST_FEATURE.testId}-empty`}
      >
        No inventory list entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${INVENTORY_LIST_FEATURE.testId}-table`}
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
            data-testid={`${INVENTORY_LIST_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatInventoryListAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <CoreHeader
                label={item.status}
                tone={inventoryListStatusTone(item.status)}
                size="sm"
                testId={`${INVENTORY_LIST_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
