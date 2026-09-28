import { DataTile } from '../../../components/data/tile/data-tile';
import type { LoyaltyEditorItem } from './loyalty-editor.model';
import { LOYALTY_EDITOR_FEATURE } from './loyalty-editor.routes';
import {
  formatLoyaltyEditorAmount,
  loyaltyEditorStatusTone,
} from './loyalty-editor.utils';

export interface LoyaltyEditorTableProps {
  items: ReadonlyArray<LoyaltyEditorItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function LoyaltyEditorTable({
  items,
  selectedId,
  onSelect,
}: LoyaltyEditorTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${LOYALTY_EDITOR_FEATURE.testId}-empty`}
      >
        No loyalty editor entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${LOYALTY_EDITOR_FEATURE.testId}-table`}
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
            data-testid={`${LOYALTY_EDITOR_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatLoyaltyEditorAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <DataTile
                label={item.status}
                tone={loyaltyEditorStatusTone(item.status)}
                size="sm"
                testId={`${LOYALTY_EDITOR_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
