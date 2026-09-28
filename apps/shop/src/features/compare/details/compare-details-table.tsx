import { TypographyStat } from '../../../components/typography/stat/typography-stat';
import type { CompareDetailsItem } from './compare-details.model';
import { COMPARE_DETAILS_FEATURE } from './compare-details.routes';
import {
  formatCompareDetailsAmount,
  compareDetailsStatusTone,
} from './compare-details.utils';

export interface CompareDetailsTableProps {
  items: ReadonlyArray<CompareDetailsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function CompareDetailsTable({
  items,
  selectedId,
  onSelect,
}: CompareDetailsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${COMPARE_DETAILS_FEATURE.testId}-empty`}
      >
        No compare details entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${COMPARE_DETAILS_FEATURE.testId}-table`}
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
            data-testid={`${COMPARE_DETAILS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatCompareDetailsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <TypographyStat
                label={item.status}
                tone={compareDetailsStatusTone(item.status)}
                size="sm"
                testId={`${COMPARE_DETAILS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
