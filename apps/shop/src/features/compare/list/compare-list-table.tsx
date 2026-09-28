import { TypographyBanner } from '../../../components/typography/banner/typography-banner';
import type { CompareListItem } from './compare-list.model';
import { COMPARE_LIST_FEATURE } from './compare-list.routes';
import {
  formatCompareListAmount,
  compareListStatusTone,
} from './compare-list.utils';

export interface CompareListTableProps {
  items: ReadonlyArray<CompareListItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function CompareListTable({
  items,
  selectedId,
  onSelect,
}: CompareListTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${COMPARE_LIST_FEATURE.testId}-empty`}
      >
        No compare list entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${COMPARE_LIST_FEATURE.testId}-table`}
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
            data-testid={`${COMPARE_LIST_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatCompareListAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <TypographyBanner
                label={item.status}
                tone={compareListStatusTone(item.status)}
                size="sm"
                testId={`${COMPARE_LIST_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
