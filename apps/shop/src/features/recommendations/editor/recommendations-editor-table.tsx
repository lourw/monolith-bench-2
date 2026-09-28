import { NavigationBadge } from '../../../components/navigation/badge/navigation-badge';
import type { RecommendationsEditorItem } from './recommendations-editor.model';
import { RECOMMENDATIONS_EDITOR_FEATURE } from './recommendations-editor.routes';
import {
  formatRecommendationsEditorAmount,
  recommendationsEditorStatusTone,
} from './recommendations-editor.utils';

export interface RecommendationsEditorTableProps {
  items: ReadonlyArray<RecommendationsEditorItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function RecommendationsEditorTable({
  items,
  selectedId,
  onSelect,
}: RecommendationsEditorTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${RECOMMENDATIONS_EDITOR_FEATURE.testId}-empty`}
      >
        No recommendations editor entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${RECOMMENDATIONS_EDITOR_FEATURE.testId}-table`}
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
            data-testid={`${RECOMMENDATIONS_EDITOR_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatRecommendationsEditorAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <NavigationBadge
                label={item.status}
                tone={recommendationsEditorStatusTone(item.status)}
                size="sm"
                testId={`${RECOMMENDATIONS_EDITOR_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
