import { OverlayBadge } from '../../../components/overlay/badge/overlay-badge';
import type { RecommendationsDashboardItem } from './recommendations-dashboard.model';
import { RECOMMENDATIONS_DASHBOARD_FEATURE } from './recommendations-dashboard.routes';
import {
  formatRecommendationsDashboardAmount,
  recommendationsDashboardStatusTone,
} from './recommendations-dashboard.utils';

export interface RecommendationsDashboardTableProps {
  items: ReadonlyArray<RecommendationsDashboardItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function RecommendationsDashboardTable({
  items,
  selectedId,
  onSelect,
}: RecommendationsDashboardTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${RECOMMENDATIONS_DASHBOARD_FEATURE.testId}-empty`}
      >
        No recommendations dashboard entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${RECOMMENDATIONS_DASHBOARD_FEATURE.testId}-table`}
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
            data-testid={`${RECOMMENDATIONS_DASHBOARD_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatRecommendationsDashboardAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <OverlayBadge
                label={item.status}
                tone={recommendationsDashboardStatusTone(item.status)}
                size="sm"
                testId={`${RECOMMENDATIONS_DASHBOARD_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
