import { NavigationStat } from '../../../components/navigation/stat/navigation-stat';
import type { SupportOverviewItem } from './support-overview.model';
import { SUPPORT_OVERVIEW_FEATURE } from './support-overview.routes';
import {
  formatSupportOverviewAmount,
  supportOverviewStatusTone,
} from './support-overview.utils';

export interface SupportOverviewTableProps {
  items: ReadonlyArray<SupportOverviewItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function SupportOverviewTable({
  items,
  selectedId,
  onSelect,
}: SupportOverviewTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${SUPPORT_OVERVIEW_FEATURE.testId}-empty`}
      >
        No support overview entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${SUPPORT_OVERVIEW_FEATURE.testId}-table`}
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
            data-testid={`${SUPPORT_OVERVIEW_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatSupportOverviewAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <NavigationStat
                label={item.status}
                tone={supportOverviewStatusTone(item.status)}
                size="sm"
                testId={`${SUPPORT_OVERVIEW_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
