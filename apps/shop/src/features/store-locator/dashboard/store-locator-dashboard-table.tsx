import { FormsBanner } from '../../../components/forms/banner/forms-banner';
import type { StoreLocatorDashboardItem } from './store-locator-dashboard.model';
import { STORE_LOCATOR_DASHBOARD_FEATURE } from './store-locator-dashboard.routes';
import {
  formatStoreLocatorDashboardAmount,
  storeLocatorDashboardStatusTone,
} from './store-locator-dashboard.utils';

export interface StoreLocatorDashboardTableProps {
  items: ReadonlyArray<StoreLocatorDashboardItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function StoreLocatorDashboardTable({
  items,
  selectedId,
  onSelect,
}: StoreLocatorDashboardTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${STORE_LOCATOR_DASHBOARD_FEATURE.testId}-empty`}
      >
        No store locator dashboard entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${STORE_LOCATOR_DASHBOARD_FEATURE.testId}-table`}
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
            data-testid={`${STORE_LOCATOR_DASHBOARD_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatStoreLocatorDashboardAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <FormsBanner
                label={item.status}
                tone={storeLocatorDashboardStatusTone(item.status)}
                size="sm"
                testId={`${STORE_LOCATOR_DASHBOARD_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
