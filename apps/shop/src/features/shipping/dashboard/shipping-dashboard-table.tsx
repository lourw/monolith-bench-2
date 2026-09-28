import { MarketingCard } from '../../../components/marketing/card/marketing-card';
import type { ShippingDashboardItem } from './shipping-dashboard.model';
import { SHIPPING_DASHBOARD_FEATURE } from './shipping-dashboard.routes';
import {
  formatShippingDashboardAmount,
  shippingDashboardStatusTone,
} from './shipping-dashboard.utils';

export interface ShippingDashboardTableProps {
  items: ReadonlyArray<ShippingDashboardItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ShippingDashboardTable({
  items,
  selectedId,
  onSelect,
}: ShippingDashboardTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${SHIPPING_DASHBOARD_FEATURE.testId}-empty`}
      >
        No shipping dashboard entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${SHIPPING_DASHBOARD_FEATURE.testId}-table`}
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
            data-testid={`${SHIPPING_DASHBOARD_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatShippingDashboardAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <MarketingCard
                label={item.status}
                tone={shippingDashboardStatusTone(item.status)}
                size="sm"
                testId={`${SHIPPING_DASHBOARD_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
