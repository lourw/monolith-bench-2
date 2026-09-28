import { LayoutPanel } from '../../../components/layout/panel/layout-panel';
import type { StoreLocatorHistoryItem } from './store-locator-history.model';
import { STORE_LOCATOR_HISTORY_FEATURE } from './store-locator-history.routes';
import {
  formatStoreLocatorHistoryAmount,
  storeLocatorHistoryStatusTone,
} from './store-locator-history.utils';

export interface StoreLocatorHistoryTableProps {
  items: ReadonlyArray<StoreLocatorHistoryItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function StoreLocatorHistoryTable({
  items,
  selectedId,
  onSelect,
}: StoreLocatorHistoryTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${STORE_LOCATOR_HISTORY_FEATURE.testId}-empty`}
      >
        No store locator history entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${STORE_LOCATOR_HISTORY_FEATURE.testId}-table`}
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
            data-testid={`${STORE_LOCATOR_HISTORY_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatStoreLocatorHistoryAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <LayoutPanel
                label={item.status}
                tone={storeLocatorHistoryStatusTone(item.status)}
                size="sm"
                testId={`${STORE_LOCATOR_HISTORY_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
