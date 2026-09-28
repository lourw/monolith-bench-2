import { TypographyTile } from '../../../components/typography/tile/typography-tile';
import type { AuthListItem } from './auth-list.model';
import { AUTH_LIST_FEATURE } from './auth-list.routes';
import { formatAuthListAmount, authListStatusTone } from './auth-list.utils';

export interface AuthListTableProps {
  items: ReadonlyArray<AuthListItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function AuthListTable({
  items,
  selectedId,
  onSelect,
}: AuthListTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${AUTH_LIST_FEATURE.testId}-empty`}
      >
        No auth list entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${AUTH_LIST_FEATURE.testId}-table`}
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
            data-testid={`${AUTH_LIST_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatAuthListAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <TypographyTile
                label={item.status}
                tone={authListStatusTone(item.status)}
                size="sm"
                testId={`${AUTH_LIST_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
