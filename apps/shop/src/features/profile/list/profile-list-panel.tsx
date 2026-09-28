import { MarketingTileGroup } from '../../../components/marketing/tile/marketing-tile-group';
import { FormsList } from '../../../components/forms/list/forms-list';
import { FeedbackBadge } from '../../../components/feedback/badge/feedback-badge';
import type { ProfileListItem } from './profile-list.model';
import { PROFILE_LIST_FEATURE } from './profile-list.routes';
import { describeProfileListItem } from './profile-list.utils';

export interface ProfileListPanelProps {
  selected: ProfileListItem | null;
  onClear: () => void;
}

export function ProfileListPanel({ selected, onClear }: ProfileListPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${PROFILE_LIST_FEATURE.testId}-panel`}
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
      data-testid={`${PROFILE_LIST_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${PROFILE_LIST_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeProfileListItem(selected)}
      </p>
      <MarketingTileGroup
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
        <FormsList
          label="Forms List"
          value={selected.product.rating}
          size="sm"
        />
        <FeedbackBadge
          label="Feedback Badge"
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
        data-testid={`${PROFILE_LIST_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
