import { MediaBadge } from '../../../components/media/badge/media-badge';
import type { ProfileListItem } from './profile-list.model';
import { PROFILE_LIST_FEATURE } from './profile-list.routes';
import {
  formatProfileListAmount,
  profileListStatusTone,
} from './profile-list.utils';

export interface ProfileListTableProps {
  items: ReadonlyArray<ProfileListItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ProfileListTable({
  items,
  selectedId,
  onSelect,
}: ProfileListTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${PROFILE_LIST_FEATURE.testId}-empty`}
      >
        No profile list entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${PROFILE_LIST_FEATURE.testId}-table`}
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
            data-testid={`${PROFILE_LIST_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatProfileListAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <MediaBadge
                label={item.status}
                tone={profileListStatusTone(item.status)}
                size="sm"
                testId={`${PROFILE_LIST_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
