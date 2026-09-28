import { DataTile } from '../../../components/data/tile/data-tile';
import type { AccountInsightsItem } from './account-insights.model';
import { ACCOUNT_INSIGHTS_FEATURE } from './account-insights.routes';
import {
  formatAccountInsightsAmount,
  accountInsightsStatusTone,
} from './account-insights.utils';

export interface AccountInsightsTableProps {
  items: ReadonlyArray<AccountInsightsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function AccountInsightsTable({
  items,
  selectedId,
  onSelect,
}: AccountInsightsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${ACCOUNT_INSIGHTS_FEATURE.testId}-empty`}
      >
        No account insights entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${ACCOUNT_INSIGHTS_FEATURE.testId}-table`}
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
            data-testid={`${ACCOUNT_INSIGHTS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatAccountInsightsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <DataTile
                label={item.status}
                tone={accountInsightsStatusTone(item.status)}
                size="sm"
                testId={`${ACCOUNT_INSIGHTS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
