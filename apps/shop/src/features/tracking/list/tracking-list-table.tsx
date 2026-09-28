import { CoreList } from '../../../components/core/list/core-list';
import type { TrackingListItem } from './tracking-list.model';
import { TRACKING_LIST_FEATURE } from './tracking-list.routes';
import {
  formatTrackingListAmount,
  trackingListStatusTone,
} from './tracking-list.utils';

export interface TrackingListTableProps {
  items: ReadonlyArray<TrackingListItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function TrackingListTable({
  items,
  selectedId,
  onSelect,
}: TrackingListTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${TRACKING_LIST_FEATURE.testId}-empty`}
      >
        No tracking list entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${TRACKING_LIST_FEATURE.testId}-table`}
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
            data-testid={`${TRACKING_LIST_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatTrackingListAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <CoreList
                label={item.status}
                tone={trackingListStatusTone(item.status)}
                size="sm"
                testId={`${TRACKING_LIST_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
