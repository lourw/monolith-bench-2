import { FeedbackBanner } from '../../../components/feedback/banner/feedback-banner';
import type { CompareInsightsItem } from './compare-insights.model';
import { COMPARE_INSIGHTS_FEATURE } from './compare-insights.routes';
import {
  formatCompareInsightsAmount,
  compareInsightsStatusTone,
} from './compare-insights.utils';

export interface CompareInsightsTableProps {
  items: ReadonlyArray<CompareInsightsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function CompareInsightsTable({
  items,
  selectedId,
  onSelect,
}: CompareInsightsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${COMPARE_INSIGHTS_FEATURE.testId}-empty`}
      >
        No compare insights entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${COMPARE_INSIGHTS_FEATURE.testId}-table`}
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
            data-testid={`${COMPARE_INSIGHTS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatCompareInsightsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <FeedbackBanner
                label={item.status}
                tone={compareInsightsStatusTone(item.status)}
                size="sm"
                testId={`${COMPARE_INSIGHTS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
