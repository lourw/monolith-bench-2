import { LayoutPanel } from '../../../components/layout/panel/layout-panel';
import type { CartEditorItem } from './cart-editor.model';
import { CART_EDITOR_FEATURE } from './cart-editor.routes';
import {
  formatCartEditorAmount,
  cartEditorStatusTone,
} from './cart-editor.utils';

export interface CartEditorTableProps {
  items: ReadonlyArray<CartEditorItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function CartEditorTable({
  items,
  selectedId,
  onSelect,
}: CartEditorTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${CART_EDITOR_FEATURE.testId}-empty`}
      >
        No cart editor entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${CART_EDITOR_FEATURE.testId}-table`}
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
            data-testid={`${CART_EDITOR_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatCartEditorAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <LayoutPanel
                label={item.status}
                tone={cartEditorStatusTone(item.status)}
                size="sm"
                testId={`${CART_EDITOR_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
