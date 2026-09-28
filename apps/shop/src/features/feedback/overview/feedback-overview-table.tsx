import { InputsStat } from '../../../components/inputs/stat/inputs-stat';
import type { FeedbackOverviewItem } from './feedback-overview.model';
import { FEEDBACK_OVERVIEW_FEATURE } from './feedback-overview.routes';
import {
  formatFeedbackOverviewAmount,
  feedbackOverviewStatusTone,
} from './feedback-overview.utils';

export interface FeedbackOverviewTableProps {
  items: ReadonlyArray<FeedbackOverviewItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function FeedbackOverviewTable({
  items,
  selectedId,
  onSelect,
}: FeedbackOverviewTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${FEEDBACK_OVERVIEW_FEATURE.testId}-empty`}
      >
        No feedback overview entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${FEEDBACK_OVERVIEW_FEATURE.testId}-table`}
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
            data-testid={`${FEEDBACK_OVERVIEW_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatFeedbackOverviewAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <InputsStat
                label={item.status}
                tone={feedbackOverviewStatusTone(item.status)}
                size="sm"
                testId={`${FEEDBACK_OVERVIEW_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
