import { MarketingBadge } from '../../../components/marketing/badge/marketing-badge';
import type { FeedbackHistoryItem } from './feedback-history.model';
import { FEEDBACK_HISTORY_FEATURE } from './feedback-history.routes';
import {
  formatFeedbackHistoryAmount,
  feedbackHistoryStatusTone,
} from './feedback-history.utils';

export interface FeedbackHistoryTableProps {
  items: ReadonlyArray<FeedbackHistoryItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function FeedbackHistoryTable({
  items,
  selectedId,
  onSelect,
}: FeedbackHistoryTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${FEEDBACK_HISTORY_FEATURE.testId}-empty`}
      >
        No feedback history entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${FEEDBACK_HISTORY_FEATURE.testId}-table`}
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
            data-testid={`${FEEDBACK_HISTORY_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatFeedbackHistoryAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <MarketingBadge
                label={item.status}
                tone={feedbackHistoryStatusTone(item.status)}
                size="sm"
                testId={`${FEEDBACK_HISTORY_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
