import { TypographyTile } from '../../../components/typography/tile/typography-tile';
import type { PreordersHistoryItem } from './preorders-history.model';
import { PREORDERS_HISTORY_FEATURE } from './preorders-history.routes';
import {
  formatPreordersHistoryAmount,
  preordersHistoryStatusTone,
} from './preorders-history.utils';

export interface PreordersHistoryTableProps {
  items: ReadonlyArray<PreordersHistoryItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function PreordersHistoryTable({
  items,
  selectedId,
  onSelect,
}: PreordersHistoryTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${PREORDERS_HISTORY_FEATURE.testId}-empty`}
      >
        No preorders history entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${PREORDERS_HISTORY_FEATURE.testId}-table`}
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
            data-testid={`${PREORDERS_HISTORY_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatPreordersHistoryAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <TypographyTile
                label={item.status}
                tone={preordersHistoryStatusTone(item.status)}
                size="sm"
                testId={`${PREORDERS_HISTORY_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
