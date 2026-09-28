import { OverlayBadge } from '../../../components/overlay/badge/overlay-badge';
import type { RecommendationsOverviewItem } from './recommendations-overview.model';
import { RECOMMENDATIONS_OVERVIEW_FEATURE } from './recommendations-overview.routes';
import {
  formatRecommendationsOverviewAmount,
  recommendationsOverviewStatusTone,
} from './recommendations-overview.utils';

export interface RecommendationsOverviewTableProps {
  items: ReadonlyArray<RecommendationsOverviewItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function RecommendationsOverviewTable({
  items,
  selectedId,
  onSelect,
}: RecommendationsOverviewTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${RECOMMENDATIONS_OVERVIEW_FEATURE.testId}-empty`}
      >
        No recommendations overview entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${RECOMMENDATIONS_OVERVIEW_FEATURE.testId}-table`}
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
            data-testid={`${RECOMMENDATIONS_OVERVIEW_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatRecommendationsOverviewAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <OverlayBadge
                label={item.status}
                tone={recommendationsOverviewStatusTone(item.status)}
                size="sm"
                testId={`${RECOMMENDATIONS_OVERVIEW_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
