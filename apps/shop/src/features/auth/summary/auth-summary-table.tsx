import { LayoutChip } from '../../../components/layout/chip/layout-chip';
import type { AuthSummaryItem } from './auth-summary.model';
import { AUTH_SUMMARY_FEATURE } from './auth-summary.routes';
import {
  formatAuthSummaryAmount,
  authSummaryStatusTone,
} from './auth-summary.utils';

export interface AuthSummaryTableProps {
  items: ReadonlyArray<AuthSummaryItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function AuthSummaryTable({
  items,
  selectedId,
  onSelect,
}: AuthSummaryTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${AUTH_SUMMARY_FEATURE.testId}-empty`}
      >
        No auth summary entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${AUTH_SUMMARY_FEATURE.testId}-table`}
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
            data-testid={`${AUTH_SUMMARY_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatAuthSummaryAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <LayoutChip
                label={item.status}
                tone={authSummaryStatusTone(item.status)}
                size="sm"
                testId={`${AUTH_SUMMARY_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
