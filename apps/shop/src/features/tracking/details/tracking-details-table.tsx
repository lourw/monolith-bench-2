import { FeedbackCard } from '../../../components/feedback/card/feedback-card';
import type { TrackingDetailsItem } from './tracking-details.model';
import { TRACKING_DETAILS_FEATURE } from './tracking-details.routes';
import {
  formatTrackingDetailsAmount,
  trackingDetailsStatusTone,
} from './tracking-details.utils';

export interface TrackingDetailsTableProps {
  items: ReadonlyArray<TrackingDetailsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function TrackingDetailsTable({
  items,
  selectedId,
  onSelect,
}: TrackingDetailsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${TRACKING_DETAILS_FEATURE.testId}-empty`}
      >
        No tracking details entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${TRACKING_DETAILS_FEATURE.testId}-table`}
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
            data-testid={`${TRACKING_DETAILS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatTrackingDetailsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <FeedbackCard
                label={item.status}
                tone={trackingDetailsStatusTone(item.status)}
                size="sm"
                testId={`${TRACKING_DETAILS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
