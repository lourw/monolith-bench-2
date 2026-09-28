import { NavigationCard } from '../../../components/navigation/card/navigation-card';
import type { SupportListItem } from './support-list.model';
import { SUPPORT_LIST_FEATURE } from './support-list.routes';
import {
  formatSupportListAmount,
  supportListStatusTone,
} from './support-list.utils';

export interface SupportListTableProps {
  items: ReadonlyArray<SupportListItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function SupportListTable({
  items,
  selectedId,
  onSelect,
}: SupportListTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${SUPPORT_LIST_FEATURE.testId}-empty`}
      >
        No support list entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${SUPPORT_LIST_FEATURE.testId}-table`}
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
            data-testid={`${SUPPORT_LIST_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatSupportListAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <NavigationCard
                label={item.status}
                tone={supportListStatusTone(item.status)}
                size="sm"
                testId={`${SUPPORT_LIST_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
