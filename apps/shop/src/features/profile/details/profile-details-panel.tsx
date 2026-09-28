import { CommerceListGroup } from '../../../components/commerce/list/commerce-list-group';
import { LayoutBanner } from '../../../components/layout/banner/layout-banner';
import type { ProfileDetailsItem } from './profile-details.model';
import { PROFILE_DETAILS_FEATURE } from './profile-details.routes';
import { describeProfileDetailsItem } from './profile-details.utils';

export interface ProfileDetailsPanelProps {
  selected: ProfileDetailsItem | null;
  onClear: () => void;
}

export function ProfileDetailsPanel({
  selected,
  onClear,
}: ProfileDetailsPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${PROFILE_DETAILS_FEATURE.testId}-panel`}
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
      data-testid={`${PROFILE_DETAILS_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${PROFILE_DETAILS_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeProfileDetailsItem(selected)}
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
        <LayoutBanner
          label="Layout Banner"
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
        data-testid={`${PROFILE_DETAILS_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
