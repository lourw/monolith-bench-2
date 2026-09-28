import { CoreList } from '../../../components/core/list/core-list';
import type { StoreLocatorInsightsItem } from './store-locator-insights.model';
import { STORE_LOCATOR_INSIGHTS_FEATURE } from './store-locator-insights.routes';
import {
  formatStoreLocatorInsightsAmount,
  storeLocatorInsightsStatusTone,
} from './store-locator-insights.utils';

export interface StoreLocatorInsightsTableProps {
  items: ReadonlyArray<StoreLocatorInsightsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function StoreLocatorInsightsTable({
  items,
  selectedId,
  onSelect,
}: StoreLocatorInsightsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${STORE_LOCATOR_INSIGHTS_FEATURE.testId}-empty`}
      >
        No store locator insights entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${STORE_LOCATOR_INSIGHTS_FEATURE.testId}-table`}
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
            data-testid={`${STORE_LOCATOR_INSIGHTS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatStoreLocatorInsightsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <CoreList
                label={item.status}
                tone={storeLocatorInsightsStatusTone(item.status)}
                size="sm"
                testId={`${STORE_LOCATOR_INSIGHTS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
