import { MediaHeaderGroup } from '../../../components/media/header/media-header-group';
import { TypographyPanel } from '../../../components/typography/panel/typography-panel';
import { InputsChip } from '../../../components/inputs/chip/inputs-chip';
import type { NotificationsWizardItem } from './notifications-wizard.model';
import { NOTIFICATIONS_WIZARD_FEATURE } from './notifications-wizard.routes';
import { describeNotificationsWizardItem } from './notifications-wizard.utils';

export interface NotificationsWizardPanelProps {
  selected: NotificationsWizardItem | null;
  onClear: () => void;
}

export function NotificationsWizardPanel({
  selected,
  onClear,
}: NotificationsWizardPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${NOTIFICATIONS_WIZARD_FEATURE.testId}-panel`}
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
      data-testid={`${NOTIFICATIONS_WIZARD_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${NOTIFICATIONS_WIZARD_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeNotificationsWizardItem(selected)}
      </p>
      <MediaHeaderGroup
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
        <TypographyPanel
          label="Typography Panel"
          value={selected.product.rating}
          size="sm"
        />
        <InputsChip
          label="Inputs Chip"
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
        data-testid={`${NOTIFICATIONS_WIZARD_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
