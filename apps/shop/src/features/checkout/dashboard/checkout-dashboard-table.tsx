import { OverlayTile } from '../../../components/overlay/tile/overlay-tile';
import type { CheckoutDashboardItem } from './checkout-dashboard.model';
import { CHECKOUT_DASHBOARD_FEATURE } from './checkout-dashboard.routes';
import {
  formatCheckoutDashboardAmount,
  checkoutDashboardStatusTone,
} from './checkout-dashboard.utils';

export interface CheckoutDashboardTableProps {
  items: ReadonlyArray<CheckoutDashboardItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function CheckoutDashboardTable({
  items,
  selectedId,
  onSelect,
}: CheckoutDashboardTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${CHECKOUT_DASHBOARD_FEATURE.testId}-empty`}
      >
        No checkout dashboard entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${CHECKOUT_DASHBOARD_FEATURE.testId}-table`}
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
            data-testid={`${CHECKOUT_DASHBOARD_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatCheckoutDashboardAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <OverlayTile
                label={item.status}
                tone={checkoutDashboardStatusTone(item.status)}
                size="sm"
                testId={`${CHECKOUT_DASHBOARD_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
