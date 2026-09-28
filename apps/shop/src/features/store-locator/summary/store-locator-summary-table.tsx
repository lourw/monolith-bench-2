import { OverlayBadge } from '../../../components/overlay/badge/overlay-badge';
import type { StoreLocatorSummaryItem } from './store-locator-summary.model';
import { STORE_LOCATOR_SUMMARY_FEATURE } from './store-locator-summary.routes';
import {
  formatStoreLocatorSummaryAmount,
  storeLocatorSummaryStatusTone,
} from './store-locator-summary.utils';

export interface StoreLocatorSummaryTableProps {
  items: ReadonlyArray<StoreLocatorSummaryItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function StoreLocatorSummaryTable({
  items,
  selectedId,
  onSelect,
}: StoreLocatorSummaryTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${STORE_LOCATOR_SUMMARY_FEATURE.testId}-empty`}
      >
        No store locator summary entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${STORE_LOCATOR_SUMMARY_FEATURE.testId}-table`}
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
            data-testid={`${STORE_LOCATOR_SUMMARY_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatStoreLocatorSummaryAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <OverlayBadge
                label={item.status}
                tone={storeLocatorSummaryStatusTone(item.status)}
                size="sm"
                testId={`${STORE_LOCATOR_SUMMARY_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
