import { OverlayChip } from '../../../components/overlay/chip/overlay-chip';
import type { AnalyticsOverviewItem } from './analytics-overview.model';
import { ANALYTICS_OVERVIEW_FEATURE } from './analytics-overview.routes';
import {
  formatAnalyticsOverviewAmount,
  analyticsOverviewStatusTone,
} from './analytics-overview.utils';

export interface AnalyticsOverviewTableProps {
  items: ReadonlyArray<AnalyticsOverviewItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function AnalyticsOverviewTable({
  items,
  selectedId,
  onSelect,
}: AnalyticsOverviewTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${ANALYTICS_OVERVIEW_FEATURE.testId}-empty`}
      >
        No analytics overview entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${ANALYTICS_OVERVIEW_FEATURE.testId}-table`}
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
            data-testid={`${ANALYTICS_OVERVIEW_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatAnalyticsOverviewAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <OverlayChip
                label={item.status}
                tone={analyticsOverviewStatusTone(item.status)}
                size="sm"
                testId={`${ANALYTICS_OVERVIEW_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
