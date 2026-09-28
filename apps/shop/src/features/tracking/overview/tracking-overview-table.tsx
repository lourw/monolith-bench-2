import { ChartsList } from '../../../components/charts/list/charts-list';
import type { TrackingOverviewItem } from './tracking-overview.model';
import { TRACKING_OVERVIEW_FEATURE } from './tracking-overview.routes';
import {
  formatTrackingOverviewAmount,
  trackingOverviewStatusTone,
} from './tracking-overview.utils';

export interface TrackingOverviewTableProps {
  items: ReadonlyArray<TrackingOverviewItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function TrackingOverviewTable({
  items,
  selectedId,
  onSelect,
}: TrackingOverviewTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${TRACKING_OVERVIEW_FEATURE.testId}-empty`}
      >
        No tracking overview entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${TRACKING_OVERVIEW_FEATURE.testId}-table`}
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
            data-testid={`${TRACKING_OVERVIEW_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatTrackingOverviewAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <ChartsList
                label={item.status}
                tone={trackingOverviewStatusTone(item.status)}
                size="sm"
                testId={`${TRACKING_OVERVIEW_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
