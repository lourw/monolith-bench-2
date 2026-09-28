import { OverlayCard } from '../../../components/overlay/card/overlay-card';
import type { RecommendationsSummaryItem } from './recommendations-summary.model';
import { RECOMMENDATIONS_SUMMARY_FEATURE } from './recommendations-summary.routes';
import {
  formatRecommendationsSummaryAmount,
  recommendationsSummaryStatusTone,
} from './recommendations-summary.utils';

export interface RecommendationsSummaryTableProps {
  items: ReadonlyArray<RecommendationsSummaryItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function RecommendationsSummaryTable({
  items,
  selectedId,
  onSelect,
}: RecommendationsSummaryTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${RECOMMENDATIONS_SUMMARY_FEATURE.testId}-empty`}
      >
        No recommendations summary entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${RECOMMENDATIONS_SUMMARY_FEATURE.testId}-table`}
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
            data-testid={`${RECOMMENDATIONS_SUMMARY_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatRecommendationsSummaryAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <OverlayCard
                label={item.status}
                tone={recommendationsSummaryStatusTone(item.status)}
                size="sm"
                testId={`${RECOMMENDATIONS_SUMMARY_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
