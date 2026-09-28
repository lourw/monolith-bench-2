import { OverlayStat } from '../../../components/overlay/stat/overlay-stat';
import type { ShippingWizardItem } from './shipping-wizard.model';
import { SHIPPING_WIZARD_FEATURE } from './shipping-wizard.routes';
import {
  formatShippingWizardAmount,
  shippingWizardStatusTone,
} from './shipping-wizard.utils';

export interface ShippingWizardTableProps {
  items: ReadonlyArray<ShippingWizardItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ShippingWizardTable({
  items,
  selectedId,
  onSelect,
}: ShippingWizardTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${SHIPPING_WIZARD_FEATURE.testId}-empty`}
      >
        No shipping wizard entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${SHIPPING_WIZARD_FEATURE.testId}-table`}
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
            data-testid={`${SHIPPING_WIZARD_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatShippingWizardAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <OverlayStat
                label={item.status}
                tone={shippingWizardStatusTone(item.status)}
                size="sm"
                testId={`${SHIPPING_WIZARD_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
