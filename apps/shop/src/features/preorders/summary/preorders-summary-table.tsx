import { NavigationHeader } from '../../../components/navigation/header/navigation-header';
import type { PreordersSummaryItem } from './preorders-summary.model';
import { PREORDERS_SUMMARY_FEATURE } from './preorders-summary.routes';
import {
  formatPreordersSummaryAmount,
  preordersSummaryStatusTone,
} from './preorders-summary.utils';

export interface PreordersSummaryTableProps {
  items: ReadonlyArray<PreordersSummaryItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function PreordersSummaryTable({
  items,
  selectedId,
  onSelect,
}: PreordersSummaryTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${PREORDERS_SUMMARY_FEATURE.testId}-empty`}
      >
        No preorders summary entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${PREORDERS_SUMMARY_FEATURE.testId}-table`}
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
            data-testid={`${PREORDERS_SUMMARY_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatPreordersSummaryAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <NavigationHeader
                label={item.status}
                tone={preordersSummaryStatusTone(item.status)}
                size="sm"
                testId={`${PREORDERS_SUMMARY_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
