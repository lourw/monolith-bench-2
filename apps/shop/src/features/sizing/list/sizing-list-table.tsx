import { NavigationBanner } from '../../../components/navigation/banner/navigation-banner';
import type { SizingListItem } from './sizing-list.model';
import { SIZING_LIST_FEATURE } from './sizing-list.routes';
import {
  formatSizingListAmount,
  sizingListStatusTone,
} from './sizing-list.utils';

export interface SizingListTableProps {
  items: ReadonlyArray<SizingListItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function SizingListTable({
  items,
  selectedId,
  onSelect,
}: SizingListTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${SIZING_LIST_FEATURE.testId}-empty`}
      >
        No sizing list entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${SIZING_LIST_FEATURE.testId}-table`}
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
            data-testid={`${SIZING_LIST_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatSizingListAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <NavigationBanner
                label={item.status}
                tone={sizingListStatusTone(item.status)}
                size="sm"
                testId={`${SIZING_LIST_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
