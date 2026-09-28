import { ChartsTile } from '../../../components/charts/tile/charts-tile';
import type { ProfileSummaryItem } from './profile-summary.model';
import { PROFILE_SUMMARY_FEATURE } from './profile-summary.routes';
import {
  formatProfileSummaryAmount,
  profileSummaryStatusTone,
} from './profile-summary.utils';

export interface ProfileSummaryTableProps {
  items: ReadonlyArray<ProfileSummaryItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ProfileSummaryTable({
  items,
  selectedId,
  onSelect,
}: ProfileSummaryTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${PROFILE_SUMMARY_FEATURE.testId}-empty`}
      >
        No profile summary entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${PROFILE_SUMMARY_FEATURE.testId}-table`}
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
            data-testid={`${PROFILE_SUMMARY_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatProfileSummaryAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <ChartsTile
                label={item.status}
                tone={profileSummaryStatusTone(item.status)}
                size="sm"
                testId={`${PROFILE_SUMMARY_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
