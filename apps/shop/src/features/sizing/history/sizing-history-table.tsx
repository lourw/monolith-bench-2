import { MediaChip } from '../../../components/media/chip/media-chip';
import type { SizingHistoryItem } from './sizing-history.model';
import { SIZING_HISTORY_FEATURE } from './sizing-history.routes';
import {
  formatSizingHistoryAmount,
  sizingHistoryStatusTone,
} from './sizing-history.utils';

export interface SizingHistoryTableProps {
  items: ReadonlyArray<SizingHistoryItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function SizingHistoryTable({
  items,
  selectedId,
  onSelect,
}: SizingHistoryTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${SIZING_HISTORY_FEATURE.testId}-empty`}
      >
        No sizing history entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${SIZING_HISTORY_FEATURE.testId}-table`}
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
            data-testid={`${SIZING_HISTORY_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatSizingHistoryAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <MediaChip
                label={item.status}
                tone={sizingHistoryStatusTone(item.status)}
                size="sm"
                testId={`${SIZING_HISTORY_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
