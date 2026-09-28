import { OverlayTile } from '../../../components/overlay/tile/overlay-tile';
import type { TrackingSummaryItem } from './tracking-summary.model';
import { TRACKING_SUMMARY_FEATURE } from './tracking-summary.routes';
import {
  formatTrackingSummaryAmount,
  trackingSummaryStatusTone,
} from './tracking-summary.utils';

export interface TrackingSummaryTableProps {
  items: ReadonlyArray<TrackingSummaryItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function TrackingSummaryTable({
  items,
  selectedId,
  onSelect,
}: TrackingSummaryTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${TRACKING_SUMMARY_FEATURE.testId}-empty`}
      >
        No tracking summary entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${TRACKING_SUMMARY_FEATURE.testId}-table`}
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
            data-testid={`${TRACKING_SUMMARY_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatTrackingSummaryAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <OverlayTile
                label={item.status}
                tone={trackingSummaryStatusTone(item.status)}
                size="sm"
                testId={`${TRACKING_SUMMARY_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
