import { DataTile } from '../../../components/data/tile/data-tile';
import type { SupportSummaryItem } from './support-summary.model';
import { SUPPORT_SUMMARY_FEATURE } from './support-summary.routes';
import {
  formatSupportSummaryAmount,
  supportSummaryStatusTone,
} from './support-summary.utils';

export interface SupportSummaryTableProps {
  items: ReadonlyArray<SupportSummaryItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function SupportSummaryTable({
  items,
  selectedId,
  onSelect,
}: SupportSummaryTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${SUPPORT_SUMMARY_FEATURE.testId}-empty`}
      >
        No support summary entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${SUPPORT_SUMMARY_FEATURE.testId}-table`}
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
            data-testid={`${SUPPORT_SUMMARY_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatSupportSummaryAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <DataTile
                label={item.status}
                tone={supportSummaryStatusTone(item.status)}
                size="sm"
                testId={`${SUPPORT_SUMMARY_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
