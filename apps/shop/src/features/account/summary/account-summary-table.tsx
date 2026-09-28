import { LayoutPanel } from '../../../components/layout/panel/layout-panel';
import type { AccountSummaryItem } from './account-summary.model';
import { ACCOUNT_SUMMARY_FEATURE } from './account-summary.routes';
import {
  formatAccountSummaryAmount,
  accountSummaryStatusTone,
} from './account-summary.utils';

export interface AccountSummaryTableProps {
  items: ReadonlyArray<AccountSummaryItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function AccountSummaryTable({
  items,
  selectedId,
  onSelect,
}: AccountSummaryTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${ACCOUNT_SUMMARY_FEATURE.testId}-empty`}
      >
        No account summary entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${ACCOUNT_SUMMARY_FEATURE.testId}-table`}
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
            data-testid={`${ACCOUNT_SUMMARY_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatAccountSummaryAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <LayoutPanel
                label={item.status}
                tone={accountSummaryStatusTone(item.status)}
                size="sm"
                testId={`${ACCOUNT_SUMMARY_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
