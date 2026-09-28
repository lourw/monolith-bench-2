import { MediaBadge } from '../../../components/media/badge/media-badge';
import type { AnalyticsDashboardItem } from './analytics-dashboard.model';
import { ANALYTICS_DASHBOARD_FEATURE } from './analytics-dashboard.routes';
import {
  formatAnalyticsDashboardAmount,
  analyticsDashboardStatusTone,
} from './analytics-dashboard.utils';

export interface AnalyticsDashboardTableProps {
  items: ReadonlyArray<AnalyticsDashboardItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function AnalyticsDashboardTable({
  items,
  selectedId,
  onSelect,
}: AnalyticsDashboardTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${ANALYTICS_DASHBOARD_FEATURE.testId}-empty`}
      >
        No analytics dashboard entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${ANALYTICS_DASHBOARD_FEATURE.testId}-table`}
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
            data-testid={`${ANALYTICS_DASHBOARD_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatAnalyticsDashboardAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <MediaBadge
                label={item.status}
                tone={analyticsDashboardStatusTone(item.status)}
                size="sm"
                testId={`${ANALYTICS_DASHBOARD_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
