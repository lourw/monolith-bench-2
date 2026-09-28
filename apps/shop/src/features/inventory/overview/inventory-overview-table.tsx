import { FormsHeader } from '../../../components/forms/header/forms-header';
import type { InventoryOverviewItem } from './inventory-overview.model';
import { INVENTORY_OVERVIEW_FEATURE } from './inventory-overview.routes';
import {
  formatInventoryOverviewAmount,
  inventoryOverviewStatusTone,
} from './inventory-overview.utils';

export interface InventoryOverviewTableProps {
  items: ReadonlyArray<InventoryOverviewItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function InventoryOverviewTable({
  items,
  selectedId,
  onSelect,
}: InventoryOverviewTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${INVENTORY_OVERVIEW_FEATURE.testId}-empty`}
      >
        No inventory overview entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${INVENTORY_OVERVIEW_FEATURE.testId}-table`}
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
            data-testid={`${INVENTORY_OVERVIEW_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatInventoryOverviewAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <FormsHeader
                label={item.status}
                tone={inventoryOverviewStatusTone(item.status)}
                size="sm"
                testId={`${INVENTORY_OVERVIEW_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
