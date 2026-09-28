import { FeedbackTile } from '../../../components/feedback/tile/feedback-tile';
import type { ProfileDashboardItem } from './profile-dashboard.model';
import { PROFILE_DASHBOARD_FEATURE } from './profile-dashboard.routes';
import {
  formatProfileDashboardAmount,
  profileDashboardStatusTone,
} from './profile-dashboard.utils';

export interface ProfileDashboardTableProps {
  items: ReadonlyArray<ProfileDashboardItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ProfileDashboardTable({
  items,
  selectedId,
  onSelect,
}: ProfileDashboardTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${PROFILE_DASHBOARD_FEATURE.testId}-empty`}
      >
        No profile dashboard entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${PROFILE_DASHBOARD_FEATURE.testId}-table`}
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
            data-testid={`${PROFILE_DASHBOARD_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatProfileDashboardAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <FeedbackTile
                label={item.status}
                tone={profileDashboardStatusTone(item.status)}
                size="sm"
                testId={`${PROFILE_DASHBOARD_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
