import { MediaBanner } from '../../../components/media/banner/media-banner';
import type { OrdersWizardItem } from './orders-wizard.model';
import { ORDERS_WIZARD_FEATURE } from './orders-wizard.routes';
import {
  formatOrdersWizardAmount,
  ordersWizardStatusTone,
} from './orders-wizard.utils';

export interface OrdersWizardTableProps {
  items: ReadonlyArray<OrdersWizardItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function OrdersWizardTable({
  items,
  selectedId,
  onSelect,
}: OrdersWizardTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${ORDERS_WIZARD_FEATURE.testId}-empty`}
      >
        No orders wizard entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${ORDERS_WIZARD_FEATURE.testId}-table`}
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
            data-testid={`${ORDERS_WIZARD_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatOrdersWizardAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <MediaBanner
                label={item.status}
                tone={ordersWizardStatusTone(item.status)}
                size="sm"
                testId={`${ORDERS_WIZARD_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
