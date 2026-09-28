import { CommercePanel } from '../../../components/commerce/panel/commerce-panel';
import type { CompareHistoryItem } from './compare-history.model';
import { COMPARE_HISTORY_FEATURE } from './compare-history.routes';
import {
  formatCompareHistoryAmount,
  compareHistoryStatusTone,
} from './compare-history.utils';

export interface CompareHistoryTableProps {
  items: ReadonlyArray<CompareHistoryItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function CompareHistoryTable({
  items,
  selectedId,
  onSelect,
}: CompareHistoryTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${COMPARE_HISTORY_FEATURE.testId}-empty`}
      >
        No compare history entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${COMPARE_HISTORY_FEATURE.testId}-table`}
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
            data-testid={`${COMPARE_HISTORY_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatCompareHistoryAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <CommercePanel
                label={item.status}
                tone={compareHistoryStatusTone(item.status)}
                size="sm"
                testId={`${COMPARE_HISTORY_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
