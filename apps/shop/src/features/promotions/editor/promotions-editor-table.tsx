import { ChartsTile } from '../../../components/charts/tile/charts-tile';
import type { PromotionsEditorItem } from './promotions-editor.model';
import { PROMOTIONS_EDITOR_FEATURE } from './promotions-editor.routes';
import {
  formatPromotionsEditorAmount,
  promotionsEditorStatusTone,
} from './promotions-editor.utils';

export interface PromotionsEditorTableProps {
  items: ReadonlyArray<PromotionsEditorItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function PromotionsEditorTable({
  items,
  selectedId,
  onSelect,
}: PromotionsEditorTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${PROMOTIONS_EDITOR_FEATURE.testId}-empty`}
      >
        No promotions editor entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${PROMOTIONS_EDITOR_FEATURE.testId}-table`}
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
            data-testid={`${PROMOTIONS_EDITOR_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatPromotionsEditorAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <ChartsTile
                label={item.status}
                tone={promotionsEditorStatusTone(item.status)}
                size="sm"
                testId={`${PROMOTIONS_EDITOR_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
