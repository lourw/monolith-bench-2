import { MediaPanel } from '../../../components/media/panel/media-panel';
import type { TrackingDashboardItem } from './tracking-dashboard.model';
import { TRACKING_DASHBOARD_FEATURE } from './tracking-dashboard.routes';
import {
  formatTrackingDashboardAmount,
  trackingDashboardStatusTone,
} from './tracking-dashboard.utils';

export interface TrackingDashboardTableProps {
  items: ReadonlyArray<TrackingDashboardItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function TrackingDashboardTable({
  items,
  selectedId,
  onSelect,
}: TrackingDashboardTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${TRACKING_DASHBOARD_FEATURE.testId}-empty`}
      >
        No tracking dashboard entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${TRACKING_DASHBOARD_FEATURE.testId}-table`}
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
            data-testid={`${TRACKING_DASHBOARD_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatTrackingDashboardAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <MediaPanel
                label={item.status}
                tone={trackingDashboardStatusTone(item.status)}
                size="sm"
                testId={`${TRACKING_DASHBOARD_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
