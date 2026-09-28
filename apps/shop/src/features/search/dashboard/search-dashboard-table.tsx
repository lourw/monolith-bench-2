import { CommerceBadge } from '../../../components/commerce/badge/commerce-badge';
import type { SearchDashboardItem } from './search-dashboard.model';
import { SEARCH_DASHBOARD_FEATURE } from './search-dashboard.routes';
import {
  formatSearchDashboardAmount,
  searchDashboardStatusTone,
} from './search-dashboard.utils';

export interface SearchDashboardTableProps {
  items: ReadonlyArray<SearchDashboardItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function SearchDashboardTable({
  items,
  selectedId,
  onSelect,
}: SearchDashboardTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${SEARCH_DASHBOARD_FEATURE.testId}-empty`}
      >
        No search dashboard entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${SEARCH_DASHBOARD_FEATURE.testId}-table`}
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
            data-testid={`${SEARCH_DASHBOARD_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatSearchDashboardAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <CommerceBadge
                label={item.status}
                tone={searchDashboardStatusTone(item.status)}
                size="sm"
                testId={`${SEARCH_DASHBOARD_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
