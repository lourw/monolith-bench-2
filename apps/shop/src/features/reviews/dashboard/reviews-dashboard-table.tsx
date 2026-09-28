import { FormsChip } from '../../../components/forms/chip/forms-chip';
import type { ReviewsDashboardItem } from './reviews-dashboard.model';
import { REVIEWS_DASHBOARD_FEATURE } from './reviews-dashboard.routes';
import {
  formatReviewsDashboardAmount,
  reviewsDashboardStatusTone,
} from './reviews-dashboard.utils';

export interface ReviewsDashboardTableProps {
  items: ReadonlyArray<ReviewsDashboardItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ReviewsDashboardTable({
  items,
  selectedId,
  onSelect,
}: ReviewsDashboardTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${REVIEWS_DASHBOARD_FEATURE.testId}-empty`}
      >
        No reviews dashboard entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${REVIEWS_DASHBOARD_FEATURE.testId}-table`}
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
            data-testid={`${REVIEWS_DASHBOARD_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatReviewsDashboardAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <FormsChip
                label={item.status}
                tone={reviewsDashboardStatusTone(item.status)}
                size="sm"
                testId={`${REVIEWS_DASHBOARD_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
