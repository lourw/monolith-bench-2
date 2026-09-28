import { DataToolbar } from '../../../components/data/toolbar/data-toolbar';
import type { CheckoutWizardItem } from './checkout-wizard.model';
import { CHECKOUT_WIZARD_FEATURE } from './checkout-wizard.routes';
import {
  formatCheckoutWizardAmount,
  checkoutWizardStatusTone,
} from './checkout-wizard.utils';

export interface CheckoutWizardTableProps {
  items: ReadonlyArray<CheckoutWizardItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function CheckoutWizardTable({
  items,
  selectedId,
  onSelect,
}: CheckoutWizardTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${CHECKOUT_WIZARD_FEATURE.testId}-empty`}
      >
        No checkout wizard entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${CHECKOUT_WIZARD_FEATURE.testId}-table`}
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
            data-testid={`${CHECKOUT_WIZARD_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatCheckoutWizardAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <DataToolbar
                label={item.status}
                tone={checkoutWizardStatusTone(item.status)}
                size="sm"
                testId={`${CHECKOUT_WIZARD_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
