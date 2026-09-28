import { DataChip } from '../../../components/data/chip/data-chip';
import type { ReturnsListItem } from './returns-list.model';
import { RETURNS_LIST_FEATURE } from './returns-list.routes';
import {
  formatReturnsListAmount,
  returnsListStatusTone,
} from './returns-list.utils';

export interface ReturnsListTableProps {
  items: ReadonlyArray<ReturnsListItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ReturnsListTable({
  items,
  selectedId,
  onSelect,
}: ReturnsListTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${RETURNS_LIST_FEATURE.testId}-empty`}
      >
        No returns list entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${RETURNS_LIST_FEATURE.testId}-table`}
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
            data-testid={`${RETURNS_LIST_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatReturnsListAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <DataChip
                label={item.status}
                tone={returnsListStatusTone(item.status)}
                size="sm"
                testId={`${RETURNS_LIST_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
