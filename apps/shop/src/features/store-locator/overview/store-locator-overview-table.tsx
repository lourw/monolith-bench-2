import { FormsPanel } from '../../../components/forms/panel/forms-panel';
import type { StoreLocatorOverviewItem } from './store-locator-overview.model';
import { STORE_LOCATOR_OVERVIEW_FEATURE } from './store-locator-overview.routes';
import {
  formatStoreLocatorOverviewAmount,
  storeLocatorOverviewStatusTone,
} from './store-locator-overview.utils';

export interface StoreLocatorOverviewTableProps {
  items: ReadonlyArray<StoreLocatorOverviewItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function StoreLocatorOverviewTable({
  items,
  selectedId,
  onSelect,
}: StoreLocatorOverviewTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${STORE_LOCATOR_OVERVIEW_FEATURE.testId}-empty`}
      >
        No store locator overview entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${STORE_LOCATOR_OVERVIEW_FEATURE.testId}-table`}
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
            data-testid={`${STORE_LOCATOR_OVERVIEW_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatStoreLocatorOverviewAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <FormsPanel
                label={item.status}
                tone={storeLocatorOverviewStatusTone(item.status)}
                size="sm"
                testId={`${STORE_LOCATOR_OVERVIEW_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
