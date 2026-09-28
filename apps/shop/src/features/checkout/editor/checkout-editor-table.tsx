import { LayoutTile } from '../../../components/layout/tile/layout-tile';
import type { CheckoutEditorItem } from './checkout-editor.model';
import { CHECKOUT_EDITOR_FEATURE } from './checkout-editor.routes';
import {
  formatCheckoutEditorAmount,
  checkoutEditorStatusTone,
} from './checkout-editor.utils';

export interface CheckoutEditorTableProps {
  items: ReadonlyArray<CheckoutEditorItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function CheckoutEditorTable({
  items,
  selectedId,
  onSelect,
}: CheckoutEditorTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${CHECKOUT_EDITOR_FEATURE.testId}-empty`}
      >
        No checkout editor entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${CHECKOUT_EDITOR_FEATURE.testId}-table`}
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
            data-testid={`${CHECKOUT_EDITOR_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatCheckoutEditorAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <LayoutTile
                label={item.status}
                tone={checkoutEditorStatusTone(item.status)}
                size="sm"
                testId={`${CHECKOUT_EDITOR_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
