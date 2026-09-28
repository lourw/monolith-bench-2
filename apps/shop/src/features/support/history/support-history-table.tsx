import { CommerceChip } from '../../../components/commerce/chip/commerce-chip';
import type { SupportHistoryItem } from './support-history.model';
import { SUPPORT_HISTORY_FEATURE } from './support-history.routes';
import {
  formatSupportHistoryAmount,
  supportHistoryStatusTone,
} from './support-history.utils';

export interface SupportHistoryTableProps {
  items: ReadonlyArray<SupportHistoryItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function SupportHistoryTable({
  items,
  selectedId,
  onSelect,
}: SupportHistoryTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${SUPPORT_HISTORY_FEATURE.testId}-empty`}
      >
        No support history entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${SUPPORT_HISTORY_FEATURE.testId}-table`}
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
            data-testid={`${SUPPORT_HISTORY_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatSupportHistoryAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <CommerceChip
                label={item.status}
                tone={supportHistoryStatusTone(item.status)}
                size="sm"
                testId={`${SUPPORT_HISTORY_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
