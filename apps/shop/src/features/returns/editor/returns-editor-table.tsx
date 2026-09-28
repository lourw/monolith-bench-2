import { MarketingCard } from '../../../components/marketing/card/marketing-card';
import type { ReturnsEditorItem } from './returns-editor.model';
import { RETURNS_EDITOR_FEATURE } from './returns-editor.routes';
import {
  formatReturnsEditorAmount,
  returnsEditorStatusTone,
} from './returns-editor.utils';

export interface ReturnsEditorTableProps {
  items: ReadonlyArray<ReturnsEditorItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ReturnsEditorTable({
  items,
  selectedId,
  onSelect,
}: ReturnsEditorTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${RETURNS_EDITOR_FEATURE.testId}-empty`}
      >
        No returns editor entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${RETURNS_EDITOR_FEATURE.testId}-table`}
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
            data-testid={`${RETURNS_EDITOR_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatReturnsEditorAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <MarketingCard
                label={item.status}
                tone={returnsEditorStatusTone(item.status)}
                size="sm"
                testId={`${RETURNS_EDITOR_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
