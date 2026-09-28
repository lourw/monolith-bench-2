import { InputsTile } from '../../../components/inputs/tile/inputs-tile';
import type { AuthOverviewItem } from './auth-overview.model';
import { AUTH_OVERVIEW_FEATURE } from './auth-overview.routes';
import {
  formatAuthOverviewAmount,
  authOverviewStatusTone,
} from './auth-overview.utils';

export interface AuthOverviewTableProps {
  items: ReadonlyArray<AuthOverviewItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function AuthOverviewTable({
  items,
  selectedId,
  onSelect,
}: AuthOverviewTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${AUTH_OVERVIEW_FEATURE.testId}-empty`}
      >
        No auth overview entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${AUTH_OVERVIEW_FEATURE.testId}-table`}
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
            data-testid={`${AUTH_OVERVIEW_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatAuthOverviewAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <InputsTile
                label={item.status}
                tone={authOverviewStatusTone(item.status)}
                size="sm"
                testId={`${AUTH_OVERVIEW_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
