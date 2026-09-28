import { FeedbackTile } from '../../../components/feedback/tile/feedback-tile';
import type { AnalyticsSummaryItem } from './analytics-summary.model';
import { ANALYTICS_SUMMARY_FEATURE } from './analytics-summary.routes';
import {
  formatAnalyticsSummaryAmount,
  analyticsSummaryStatusTone,
} from './analytics-summary.utils';

export interface AnalyticsSummaryTableProps {
  items: ReadonlyArray<AnalyticsSummaryItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function AnalyticsSummaryTable({
  items,
  selectedId,
  onSelect,
}: AnalyticsSummaryTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${ANALYTICS_SUMMARY_FEATURE.testId}-empty`}
      >
        No analytics summary entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${ANALYTICS_SUMMARY_FEATURE.testId}-table`}
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
            data-testid={`${ANALYTICS_SUMMARY_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatAnalyticsSummaryAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <FeedbackTile
                label={item.status}
                tone={analyticsSummaryStatusTone(item.status)}
                size="sm"
                testId={`${ANALYTICS_SUMMARY_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
