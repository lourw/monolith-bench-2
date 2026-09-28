import { LayoutPanel } from '../../../components/layout/panel/layout-panel';
import type { RecommendationsListItem } from './recommendations-list.model';
import { RECOMMENDATIONS_LIST_FEATURE } from './recommendations-list.routes';
import {
  formatRecommendationsListAmount,
  recommendationsListStatusTone,
} from './recommendations-list.utils';

export interface RecommendationsListTableProps {
  items: ReadonlyArray<RecommendationsListItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function RecommendationsListTable({
  items,
  selectedId,
  onSelect,
}: RecommendationsListTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${RECOMMENDATIONS_LIST_FEATURE.testId}-empty`}
      >
        No recommendations list entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${RECOMMENDATIONS_LIST_FEATURE.testId}-table`}
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
            data-testid={`${RECOMMENDATIONS_LIST_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatRecommendationsListAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <LayoutPanel
                label={item.status}
                tone={recommendationsListStatusTone(item.status)}
                size="sm"
                testId={`${RECOMMENDATIONS_LIST_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
