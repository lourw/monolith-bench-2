import { FormsTile } from '../../../components/forms/tile/forms-tile';
import type { ReturnsHistoryItem } from './returns-history.model';
import { RETURNS_HISTORY_FEATURE } from './returns-history.routes';
import {
  formatReturnsHistoryAmount,
  returnsHistoryStatusTone,
} from './returns-history.utils';

export interface ReturnsHistoryTableProps {
  items: ReadonlyArray<ReturnsHistoryItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ReturnsHistoryTable({
  items,
  selectedId,
  onSelect,
}: ReturnsHistoryTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${RETURNS_HISTORY_FEATURE.testId}-empty`}
      >
        No returns history entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${RETURNS_HISTORY_FEATURE.testId}-table`}
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
            data-testid={`${RETURNS_HISTORY_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatReturnsHistoryAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <FormsTile
                label={item.status}
                tone={returnsHistoryStatusTone(item.status)}
                size="sm"
                testId={`${RETURNS_HISTORY_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
