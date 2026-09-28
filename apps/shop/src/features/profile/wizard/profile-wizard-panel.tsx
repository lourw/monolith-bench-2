import { DataBannerGroup } from '../../../components/data/banner/data-banner-group';
import { FormsToolbar } from '../../../components/forms/toolbar/forms-toolbar';
import type { ProfileWizardItem } from './profile-wizard.model';
import { PROFILE_WIZARD_FEATURE } from './profile-wizard.routes';
import { describeProfileWizardItem } from './profile-wizard.utils';

export interface ProfileWizardPanelProps {
  selected: ProfileWizardItem | null;
  onClear: () => void;
}

export function ProfileWizardPanel({
  selected,
  onClear,
}: ProfileWizardPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${PROFILE_WIZARD_FEATURE.testId}-panel`}
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
      data-testid={`${PROFILE_WIZARD_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${PROFILE_WIZARD_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeProfileWizardItem(selected)}
      </p>
      <DataBannerGroup
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
        <FormsToolbar
          label="Forms Toolbar"
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
        data-testid={`${PROFILE_WIZARD_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
