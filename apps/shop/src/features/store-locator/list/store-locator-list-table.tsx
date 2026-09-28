import { LayoutList } from '../../../components/layout/list/layout-list';
import type { StoreLocatorListItem } from './store-locator-list.model';
import { STORE_LOCATOR_LIST_FEATURE } from './store-locator-list.routes';
import {
  formatStoreLocatorListAmount,
  storeLocatorListStatusTone,
} from './store-locator-list.utils';

export interface StoreLocatorListTableProps {
  items: ReadonlyArray<StoreLocatorListItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function StoreLocatorListTable({
  items,
  selectedId,
  onSelect,
}: StoreLocatorListTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${STORE_LOCATOR_LIST_FEATURE.testId}-empty`}
      >
        No store locator list entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${STORE_LOCATOR_LIST_FEATURE.testId}-table`}
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
            data-testid={`${STORE_LOCATOR_LIST_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatStoreLocatorListAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <LayoutList
                label={item.status}
                tone={storeLocatorListStatusTone(item.status)}
                size="sm"
                testId={`${STORE_LOCATOR_LIST_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
