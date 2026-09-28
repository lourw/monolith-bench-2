import { OverlayHeader } from '../../../components/overlay/header/overlay-header';
import type { InventoryDashboardItem } from './inventory-dashboard.model';
import { INVENTORY_DASHBOARD_FEATURE } from './inventory-dashboard.routes';
import {
  formatInventoryDashboardAmount,
  inventoryDashboardStatusTone,
} from './inventory-dashboard.utils';

export interface InventoryDashboardTableProps {
  items: ReadonlyArray<InventoryDashboardItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function InventoryDashboardTable({
  items,
  selectedId,
  onSelect,
}: InventoryDashboardTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${INVENTORY_DASHBOARD_FEATURE.testId}-empty`}
      >
        No inventory dashboard entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${INVENTORY_DASHBOARD_FEATURE.testId}-table`}
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
            data-testid={`${INVENTORY_DASHBOARD_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatInventoryDashboardAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <OverlayHeader
                label={item.status}
                tone={inventoryDashboardStatusTone(item.status)}
                size="sm"
                testId={`${INVENTORY_DASHBOARD_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
