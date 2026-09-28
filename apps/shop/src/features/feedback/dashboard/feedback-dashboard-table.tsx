import { MarketingToolbar } from '../../../components/marketing/toolbar/marketing-toolbar';
import type { FeedbackDashboardItem } from './feedback-dashboard.model';
import { FEEDBACK_DASHBOARD_FEATURE } from './feedback-dashboard.routes';
import {
  formatFeedbackDashboardAmount,
  feedbackDashboardStatusTone,
} from './feedback-dashboard.utils';

export interface FeedbackDashboardTableProps {
  items: ReadonlyArray<FeedbackDashboardItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function FeedbackDashboardTable({
  items,
  selectedId,
  onSelect,
}: FeedbackDashboardTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${FEEDBACK_DASHBOARD_FEATURE.testId}-empty`}
      >
        No feedback dashboard entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${FEEDBACK_DASHBOARD_FEATURE.testId}-table`}
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
            data-testid={`${FEEDBACK_DASHBOARD_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatFeedbackDashboardAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <MarketingToolbar
                label={item.status}
                tone={feedbackDashboardStatusTone(item.status)}
                size="sm"
                testId={`${FEEDBACK_DASHBOARD_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
