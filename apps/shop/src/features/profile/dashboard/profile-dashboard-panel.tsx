import { CommerceListGroup } from '../../../components/commerce/list/commerce-list-group';
import { NavigationBadge } from '../../../components/navigation/badge/navigation-badge';
import { OverlayBadge } from '../../../components/overlay/badge/overlay-badge';
import type { ProfileDashboardItem } from './profile-dashboard.model';
import { PROFILE_DASHBOARD_FEATURE } from './profile-dashboard.routes';
import { describeProfileDashboardItem } from './profile-dashboard.utils';

export interface ProfileDashboardPanelProps {
  selected: ProfileDashboardItem | null;
  onClear: () => void;
}

export function ProfileDashboardPanel({
  selected,
  onClear,
}: ProfileDashboardPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${PROFILE_DASHBOARD_FEATURE.testId}-panel`}
      >
        <p className="feature-panel-hint">
          Select an entry to see its details.
        </p>
      </aside>
    );
  }

  return (
    <aside
      className="feature-panel"
      data-testid={`${PROFILE_DASHBOARD_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${PROFILE_DASHBOARD_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeProfileDashboardItem(selected)}
      </p>
      <CommerceListGroup
        title="Details"
        items={[
          { id: 'amount', label: 'Amount', value: selected.amount },
          { id: 'quantity', label: 'Quantity', value: selected.quantity },
          { id: 'status', label: 'Status', value: selected.status },
          { id: 'price', label: 'Unit price', value: selected.product.price },
          { id: 'rating', label: 'Rating', value: selected.product.rating },
        ]}
      />
      <div className="feature-panel-extra">
        <NavigationBadge
          label="Navigation Badge"
          value={selected.product.rating}
          size="sm"
        />
        <OverlayBadge
          label="Overlay Badge"
          value={selected.product.rating}
          size="sm"
        />
      </div>
      <ul className="feature-tags">
        {selected.tags.map((tag) => (
          <li key={tag} className="feature-tag">
            {tag}
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="feature-button secondary"
        onClick={onClear}
        data-testid={`${PROFILE_DASHBOARD_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
