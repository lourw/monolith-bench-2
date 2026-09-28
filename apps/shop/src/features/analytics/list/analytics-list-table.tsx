import { OverlayChip } from '../../../components/overlay/chip/overlay-chip';
import type { AnalyticsListItem } from './analytics-list.model';
import { ANALYTICS_LIST_FEATURE } from './analytics-list.routes';
import {
  formatAnalyticsListAmount,
  analyticsListStatusTone,
} from './analytics-list.utils';

export interface AnalyticsListTableProps {
  items: ReadonlyArray<AnalyticsListItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function AnalyticsListTable({
  items,
  selectedId,
  onSelect,
}: AnalyticsListTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${ANALYTICS_LIST_FEATURE.testId}-empty`}
      >
        No analytics list entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${ANALYTICS_LIST_FEATURE.testId}-table`}
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
            data-testid={`${ANALYTICS_LIST_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatAnalyticsListAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <OverlayChip
                label={item.status}
                tone={analyticsListStatusTone(item.status)}
                size="sm"
                testId={`${ANALYTICS_LIST_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
