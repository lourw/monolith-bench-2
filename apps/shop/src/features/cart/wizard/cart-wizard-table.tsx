import { LayoutTile } from '../../../components/layout/tile/layout-tile';
import type { CartWizardItem } from './cart-wizard.model';
import { CART_WIZARD_FEATURE } from './cart-wizard.routes';
import {
  formatCartWizardAmount,
  cartWizardStatusTone,
} from './cart-wizard.utils';

export interface CartWizardTableProps {
  items: ReadonlyArray<CartWizardItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function CartWizardTable({
  items,
  selectedId,
  onSelect,
}: CartWizardTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${CART_WIZARD_FEATURE.testId}-empty`}
      >
        No cart wizard entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${CART_WIZARD_FEATURE.testId}-table`}
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
            data-testid={`${CART_WIZARD_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatCartWizardAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <LayoutTile
                label={item.status}
                tone={cartWizardStatusTone(item.status)}
                size="sm"
                testId={`${CART_WIZARD_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
