import { NavigationChip } from '../../../components/navigation/chip/navigation-chip';
import type { TrackingHistoryItem } from './tracking-history.model';
import { TRACKING_HISTORY_FEATURE } from './tracking-history.routes';
import {
  formatTrackingHistoryAmount,
  trackingHistoryStatusTone,
} from './tracking-history.utils';

export interface TrackingHistoryTableProps {
  items: ReadonlyArray<TrackingHistoryItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function TrackingHistoryTable({
  items,
  selectedId,
  onSelect,
}: TrackingHistoryTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${TRACKING_HISTORY_FEATURE.testId}-empty`}
      >
        No tracking history entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${TRACKING_HISTORY_FEATURE.testId}-table`}
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
            data-testid={`${TRACKING_HISTORY_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatTrackingHistoryAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <NavigationChip
                label={item.status}
                tone={trackingHistoryStatusTone(item.status)}
                size="sm"
                testId={`${TRACKING_HISTORY_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
