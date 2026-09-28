import { DataChip } from '../../../components/data/chip/data-chip';
import type { FeedbackInsightsItem } from './feedback-insights.model';
import { FEEDBACK_INSIGHTS_FEATURE } from './feedback-insights.routes';
import {
  formatFeedbackInsightsAmount,
  feedbackInsightsStatusTone,
} from './feedback-insights.utils';

export interface FeedbackInsightsTableProps {
  items: ReadonlyArray<FeedbackInsightsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function FeedbackInsightsTable({
  items,
  selectedId,
  onSelect,
}: FeedbackInsightsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${FEEDBACK_INSIGHTS_FEATURE.testId}-empty`}
      >
        No feedback insights entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${FEEDBACK_INSIGHTS_FEATURE.testId}-table`}
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
            data-testid={`${FEEDBACK_INSIGHTS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatFeedbackInsightsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <DataChip
                label={item.status}
                tone={feedbackInsightsStatusTone(item.status)}
                size="sm"
                testId={`${FEEDBACK_INSIGHTS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
