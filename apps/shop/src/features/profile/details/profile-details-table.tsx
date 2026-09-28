import { MarketingTile } from '../../../components/marketing/tile/marketing-tile';
import type { ProfileDetailsItem } from './profile-details.model';
import { PROFILE_DETAILS_FEATURE } from './profile-details.routes';
import {
  formatProfileDetailsAmount,
  profileDetailsStatusTone,
} from './profile-details.utils';

export interface ProfileDetailsTableProps {
  items: ReadonlyArray<ProfileDetailsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ProfileDetailsTable({
  items,
  selectedId,
  onSelect,
}: ProfileDetailsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${PROFILE_DETAILS_FEATURE.testId}-empty`}
      >
        No profile details entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${PROFILE_DETAILS_FEATURE.testId}-table`}
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
            data-testid={`${PROFILE_DETAILS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatProfileDetailsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <MarketingTile
                label={item.status}
                tone={profileDetailsStatusTone(item.status)}
                size="sm"
                testId={`${PROFILE_DETAILS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
