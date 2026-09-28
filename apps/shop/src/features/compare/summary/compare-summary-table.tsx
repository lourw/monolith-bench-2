import { FormsBadge } from '../../../components/forms/badge/forms-badge';
import type { CompareSummaryItem } from './compare-summary.model';
import { COMPARE_SUMMARY_FEATURE } from './compare-summary.routes';
import {
  formatCompareSummaryAmount,
  compareSummaryStatusTone,
} from './compare-summary.utils';

export interface CompareSummaryTableProps {
  items: ReadonlyArray<CompareSummaryItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function CompareSummaryTable({
  items,
  selectedId,
  onSelect,
}: CompareSummaryTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${COMPARE_SUMMARY_FEATURE.testId}-empty`}
      >
        No compare summary entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${COMPARE_SUMMARY_FEATURE.testId}-table`}
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
            data-testid={`${COMPARE_SUMMARY_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatCompareSummaryAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <FormsBadge
                label={item.status}
                tone={compareSummaryStatusTone(item.status)}
                size="sm"
                testId={`${COMPARE_SUMMARY_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
