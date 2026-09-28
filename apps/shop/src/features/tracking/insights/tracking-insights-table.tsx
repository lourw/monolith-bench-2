import { NavigationTile } from '../../../components/navigation/tile/navigation-tile';
import type { TrackingInsightsItem } from './tracking-insights.model';
import { TRACKING_INSIGHTS_FEATURE } from './tracking-insights.routes';
import {
  formatTrackingInsightsAmount,
  trackingInsightsStatusTone,
} from './tracking-insights.utils';

export interface TrackingInsightsTableProps {
  items: ReadonlyArray<TrackingInsightsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function TrackingInsightsTable({
  items,
  selectedId,
  onSelect,
}: TrackingInsightsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${TRACKING_INSIGHTS_FEATURE.testId}-empty`}
      >
        No tracking insights entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${TRACKING_INSIGHTS_FEATURE.testId}-table`}
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
            data-testid={`${TRACKING_INSIGHTS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatTrackingInsightsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <NavigationTile
                label={item.status}
                tone={trackingInsightsStatusTone(item.status)}
                size="sm"
                testId={`${TRACKING_INSIGHTS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
