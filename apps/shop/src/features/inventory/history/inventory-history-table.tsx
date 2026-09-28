import { TypographyBadge } from '../../../components/typography/badge/typography-badge';
import type { InventoryHistoryItem } from './inventory-history.model';
import { INVENTORY_HISTORY_FEATURE } from './inventory-history.routes';
import {
  formatInventoryHistoryAmount,
  inventoryHistoryStatusTone,
} from './inventory-history.utils';

export interface InventoryHistoryTableProps {
  items: ReadonlyArray<InventoryHistoryItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function InventoryHistoryTable({
  items,
  selectedId,
  onSelect,
}: InventoryHistoryTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${INVENTORY_HISTORY_FEATURE.testId}-empty`}
      >
        No inventory history entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${INVENTORY_HISTORY_FEATURE.testId}-table`}
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
            data-testid={`${INVENTORY_HISTORY_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatInventoryHistoryAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <TypographyBadge
                label={item.status}
                tone={inventoryHistoryStatusTone(item.status)}
                size="sm"
                testId={`${INVENTORY_HISTORY_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
