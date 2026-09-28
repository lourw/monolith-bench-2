import { LayoutChip } from '../../../components/layout/chip/layout-chip';
import type { ProfileInsightsItem } from './profile-insights.model';
import { PROFILE_INSIGHTS_FEATURE } from './profile-insights.routes';
import {
  formatProfileInsightsAmount,
  profileInsightsStatusTone,
} from './profile-insights.utils';

export interface ProfileInsightsTableProps {
  items: ReadonlyArray<ProfileInsightsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ProfileInsightsTable({
  items,
  selectedId,
  onSelect,
}: ProfileInsightsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${PROFILE_INSIGHTS_FEATURE.testId}-empty`}
      >
        No profile insights entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${PROFILE_INSIGHTS_FEATURE.testId}-table`}
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
            data-testid={`${PROFILE_INSIGHTS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatProfileInsightsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <LayoutChip
                label={item.status}
                tone={profileInsightsStatusTone(item.status)}
                size="sm"
                testId={`${PROFILE_INSIGHTS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
