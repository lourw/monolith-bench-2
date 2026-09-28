import { LayoutToolbar } from '../../../components/layout/toolbar/layout-toolbar';
import type { ProfileOverviewItem } from './profile-overview.model';
import { PROFILE_OVERVIEW_FEATURE } from './profile-overview.routes';
import {
  formatProfileOverviewAmount,
  profileOverviewStatusTone,
} from './profile-overview.utils';

export interface ProfileOverviewTableProps {
  items: ReadonlyArray<ProfileOverviewItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ProfileOverviewTable({
  items,
  selectedId,
  onSelect,
}: ProfileOverviewTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${PROFILE_OVERVIEW_FEATURE.testId}-empty`}
      >
        No profile overview entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${PROFILE_OVERVIEW_FEATURE.testId}-table`}
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
            data-testid={`${PROFILE_OVERVIEW_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatProfileOverviewAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <LayoutToolbar
                label={item.status}
                tone={profileOverviewStatusTone(item.status)}
                size="sm"
                testId={`${PROFILE_OVERVIEW_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
