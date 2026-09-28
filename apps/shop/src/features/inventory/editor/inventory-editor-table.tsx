import { TypographyPanel } from '../../../components/typography/panel/typography-panel';
import type { InventoryEditorItem } from './inventory-editor.model';
import { INVENTORY_EDITOR_FEATURE } from './inventory-editor.routes';
import {
  formatInventoryEditorAmount,
  inventoryEditorStatusTone,
} from './inventory-editor.utils';

export interface InventoryEditorTableProps {
  items: ReadonlyArray<InventoryEditorItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function InventoryEditorTable({
  items,
  selectedId,
  onSelect,
}: InventoryEditorTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${INVENTORY_EDITOR_FEATURE.testId}-empty`}
      >
        No inventory editor entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${INVENTORY_EDITOR_FEATURE.testId}-table`}
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
            data-testid={`${INVENTORY_EDITOR_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatInventoryEditorAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <TypographyPanel
                label={item.status}
                tone={inventoryEditorStatusTone(item.status)}
                size="sm"
                testId={`${INVENTORY_EDITOR_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
