import { InputsToolbar } from '../../../components/inputs/toolbar/inputs-toolbar';
import type { AuthInsightsItem } from './auth-insights.model';
import { AUTH_INSIGHTS_FEATURE } from './auth-insights.routes';
import {
  formatAuthInsightsAmount,
  authInsightsStatusTone,
} from './auth-insights.utils';

export interface AuthInsightsTableProps {
  items: ReadonlyArray<AuthInsightsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function AuthInsightsTable({
  items,
  selectedId,
  onSelect,
}: AuthInsightsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${AUTH_INSIGHTS_FEATURE.testId}-empty`}
      >
        No auth insights entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${AUTH_INSIGHTS_FEATURE.testId}-table`}
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
            data-testid={`${AUTH_INSIGHTS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatAuthInsightsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <InputsToolbar
                label={item.status}
                tone={authInsightsStatusTone(item.status)}
                size="sm"
                testId={`${AUTH_INSIGHTS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
