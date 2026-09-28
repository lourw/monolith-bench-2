import { FeedbackHeader } from '../../../components/feedback/header/feedback-header';
import type { RecommendationsHistoryItem } from './recommendations-history.model';
import { RECOMMENDATIONS_HISTORY_FEATURE } from './recommendations-history.routes';
import {
  formatRecommendationsHistoryAmount,
  recommendationsHistoryStatusTone,
} from './recommendations-history.utils';

export interface RecommendationsHistoryTableProps {
  items: ReadonlyArray<RecommendationsHistoryItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function RecommendationsHistoryTable({
  items,
  selectedId,
  onSelect,
}: RecommendationsHistoryTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${RECOMMENDATIONS_HISTORY_FEATURE.testId}-empty`}
      >
        No recommendations history entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${RECOMMENDATIONS_HISTORY_FEATURE.testId}-table`}
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
            data-testid={`${RECOMMENDATIONS_HISTORY_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatRecommendationsHistoryAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <FeedbackHeader
                label={item.status}
                tone={recommendationsHistoryStatusTone(item.status)}
                size="sm"
                testId={`${RECOMMENDATIONS_HISTORY_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
