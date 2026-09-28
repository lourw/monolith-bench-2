import { MarketingChip } from '../../../components/marketing/chip/marketing-chip';
import type { ShippingEditorItem } from './shipping-editor.model';
import { SHIPPING_EDITOR_FEATURE } from './shipping-editor.routes';
import {
  formatShippingEditorAmount,
  shippingEditorStatusTone,
} from './shipping-editor.utils';

export interface ShippingEditorTableProps {
  items: ReadonlyArray<ShippingEditorItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ShippingEditorTable({
  items,
  selectedId,
  onSelect,
}: ShippingEditorTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${SHIPPING_EDITOR_FEATURE.testId}-empty`}
      >
        No shipping editor entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${SHIPPING_EDITOR_FEATURE.testId}-table`}
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
            data-testid={`${SHIPPING_EDITOR_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatShippingEditorAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <MarketingChip
                label={item.status}
                tone={shippingEditorStatusTone(item.status)}
                size="sm"
                testId={`${SHIPPING_EDITOR_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
