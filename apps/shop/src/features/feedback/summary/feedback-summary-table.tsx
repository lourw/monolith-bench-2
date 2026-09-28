import { DataTile } from '../../../components/data/tile/data-tile';
import type { FeedbackSummaryItem } from './feedback-summary.model';
import { FEEDBACK_SUMMARY_FEATURE } from './feedback-summary.routes';
import {
  formatFeedbackSummaryAmount,
  feedbackSummaryStatusTone,
} from './feedback-summary.utils';

export interface FeedbackSummaryTableProps {
  items: ReadonlyArray<FeedbackSummaryItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function FeedbackSummaryTable({
  items,
  selectedId,
  onSelect,
}: FeedbackSummaryTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${FEEDBACK_SUMMARY_FEATURE.testId}-empty`}
      >
        No feedback summary entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${FEEDBACK_SUMMARY_FEATURE.testId}-table`}
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
            data-testid={`${FEEDBACK_SUMMARY_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatFeedbackSummaryAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <DataTile
                label={item.status}
                tone={feedbackSummaryStatusTone(item.status)}
                size="sm"
                testId={`${FEEDBACK_SUMMARY_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
