import { OverlayCard } from '../../../components/overlay/card/overlay-card';
import type { PreordersListItem } from './preorders-list.model';
import { PREORDERS_LIST_FEATURE } from './preorders-list.routes';
import {
  formatPreordersListAmount,
  preordersListStatusTone,
} from './preorders-list.utils';

export interface PreordersListTableProps {
  items: ReadonlyArray<PreordersListItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function PreordersListTable({
  items,
  selectedId,
  onSelect,
}: PreordersListTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${PREORDERS_LIST_FEATURE.testId}-empty`}
      >
        No preorders list entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${PREORDERS_LIST_FEATURE.testId}-table`}
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
            data-testid={`${PREORDERS_LIST_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatPreordersListAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <OverlayCard
                label={item.status}
                tone={preordersListStatusTone(item.status)}
                size="sm"
                testId={`${PREORDERS_LIST_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
