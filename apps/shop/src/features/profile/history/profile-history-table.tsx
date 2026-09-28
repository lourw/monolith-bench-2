import { CommerceStat } from '../../../components/commerce/stat/commerce-stat';
import type { ProfileHistoryItem } from './profile-history.model';
import { PROFILE_HISTORY_FEATURE } from './profile-history.routes';
import {
  formatProfileHistoryAmount,
  profileHistoryStatusTone,
} from './profile-history.utils';

export interface ProfileHistoryTableProps {
  items: ReadonlyArray<ProfileHistoryItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ProfileHistoryTable({
  items,
  selectedId,
  onSelect,
}: ProfileHistoryTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${PROFILE_HISTORY_FEATURE.testId}-empty`}
      >
        No profile history entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${PROFILE_HISTORY_FEATURE.testId}-table`}
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
            data-testid={`${PROFILE_HISTORY_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatProfileHistoryAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <CommerceStat
                label={item.status}
                tone={profileHistoryStatusTone(item.status)}
                size="sm"
                testId={`${PROFILE_HISTORY_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
