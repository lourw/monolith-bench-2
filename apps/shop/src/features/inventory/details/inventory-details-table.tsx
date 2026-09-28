import { FormsBadge } from '../../../components/forms/badge/forms-badge';
import type { InventoryDetailsItem } from './inventory-details.model';
import { INVENTORY_DETAILS_FEATURE } from './inventory-details.routes';
import {
  formatInventoryDetailsAmount,
  inventoryDetailsStatusTone,
} from './inventory-details.utils';

export interface InventoryDetailsTableProps {
  items: ReadonlyArray<InventoryDetailsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function InventoryDetailsTable({
  items,
  selectedId,
  onSelect,
}: InventoryDetailsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${INVENTORY_DETAILS_FEATURE.testId}-empty`}
      >
        No inventory details entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${INVENTORY_DETAILS_FEATURE.testId}-table`}
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
            data-testid={`${INVENTORY_DETAILS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatInventoryDetailsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <FormsBadge
                label={item.status}
                tone={inventoryDetailsStatusTone(item.status)}
                size="sm"
                testId={`${INVENTORY_DETAILS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
